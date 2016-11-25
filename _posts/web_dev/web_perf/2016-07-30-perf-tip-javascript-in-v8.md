---
layout: article
title: "Chrome V8 엔진에서 자바스크립트 성능 향상 방법"
date: 2016-07-30 18:51:13 +0900
categories: web_dev
image:
  teaser: posts/web/chrome-v8.png
  feature: posts/web/chrome-v8.png
  credit: Modus Create #name of the person or site you want to credit
  creditlink: http://moduscreate.com/dynamic-memory-and-v8-with-javascript/ #url to their site or licensing
locale: "kr"
# 리플 옵션
comments: true
---
{% include toc.html %}


## 개요
- 웹 어플리케이션 성능 튜닝을 위한 기본적인 절차

  1. 문제가 발생하기 전에 준비
  2. 문제 발생시 식별하고 이해
  3. 문제를 해결

- *V8 엔진이 어떻게 JS를 최적화하는지 이해하는 것이 가장 중요하다.*

## Hidden Classes
- Javascript는 컴파일시에 사용하는 타입정보에 대해 제한적이다.
- Javascript는 런타임시에 데이터 타입을 변경할 수 있다.
- V8은 런타임시에 객체 처리를 위해 내부적으로 hidden class를 만들어서 사용한다.

``` javascript
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  var p1 = new Point(11, 22);
  var p2 = new Point(33, 44);
  // 여기에서 p1과 p2는 hidden class를 공유합니다.
  p2.z = 55;
  // 경고! p1과 p2는 이제 다른 hidden class를 갖습니다.
```

- p2에서 z속성을 추가하기 전까지는 같은 hidden class 를 갖지만, z가 추가되고 나면 다른 hidden class를 갖기 때문에 성능에 악영향을 미친다.
> **[결론]**
  - **모든 객체 멤버를 생성자 함수 안에서 초기화 (나중에 멤버 타입이 변하지 않음)**
  - **항상 같은 순서로 멤버를 초기화**

## Numbers
- V8은 데이터 타입 변환시 값을 효율적으로 나타내는 태그 사용
- 사용자가 사용하는 값을 통해서 number타입 추론
- 데이터 타입은 동적으로 변할 수 있기 때문에, 효율적으로 값을 나타내는 태그 사용
- number타입을 지속적으로 쓰는 것이 중요

```javascript
  var i = 42;  // 31비트 부호있는 정수입니다.
  var j = 4.2;  // 이 값은 double 타입의 부동 소수점 숫자 데이터입니다.
```

> **[결론]**
  - **31비트 부호있는 정수를 사용**

## Normal Arrays
- 큰 배열 처리를 위해 두가지 유형의 내부 배열 저장소가 존재한다.
  - Fast Elements : 키 값이 순서대로 채워진 경우 사용되는 선형 저장소
  - Dictionary Elements : 위 경우가 아닐 때 사용하는 해쉬 테이블 저장소
- 배열 저장소가 한 유형에서 다른 유형으로 변경되지 않는것이 중요
> **[결론]**
  - **인덱스 0부터 시작하는 연속키 사용**
  - **배열 선언시 최대사이즈를 할당하지 말고 ( > 64K 원소), 사용하면서 크기를 늘려간다**
  - **숫자 배열의 요소를 삭제하지 않는다**
  - **초기화 안한 요소는 호출하지 않는다 (아래 코드 참조)**

```javascript
  a = new Array();
  for (var b = 0; b < 10; b++) {
    a[0] |= b;  // 안 좋아요!
  }
  //vs.
  a = new Array();
  a[0] = 0;
  for (var b = 0; b < 10; b++) {
    a[0] |= b;  // 훨씬 좋습니다. 2배 더 빨라요.
  }
```

## Double Arrays
- double 타입 배열이 일반 배열보다 빠른 이유 : 배열의 hidden class는 일반적으로 요소의 타입을 검사하여 hidden class를 변경하는 작업이 있으나 double의 경우 여기서 제외된다.
- 아래와 같이 부주의한 배열요소 변경은 할당과 변환이라는 추가 작업들을 만든다.

``` javascript
  // 비효율적인 코드
  var a = new Array();
  a[0] = 77;    // 할당
  a[1] = 88;
  a[2] = 0.5;   // 할당, 배열 타입 변환 (일반배열 -> double 배열)
  a[3] = true;  // 할당, 배열 타입 변환 (double 배열 -> 일반배열)

  // 효율적인 코드
  var a = [77, 88, 0.5, true];
```

- 일반 배열 선언후 `a[2]` 요소에 double 형태를 할당하면, 일반 배열에서 double 배열 형태의 배열 형태가 바뀐다.
- 그리고 나서 `a[3]` 요소에 다시 일반 배열을 할당하면, double 배열에서 일반배열로 다시 전환된다.
- 이런 추가 작업들이 결국 성능에 영향을 미치게 되기 때문에 `var a = [77, 88, 0.5, true];` 형태로 한번에 선언하면 컴파일러가 요소의 타입을 모두 알고 hidden class를 미리 결정할 수 있다.
- 따라서 중간에 배열의 타입을 바꾸는데 생기는 불필요한 전환 작업들을 줄일 수 있다.
> **[결론]**
  - **초기화시 배열 리터럴을 이용하여 배열 크기를 작게 고정**
  - **사용하기 전 크기에 맞게 배열 사이즈를 할당 - 배열의 크기가 작으면 작은 크기의 배열에 (<64K) 에 할당**
  - **숫자 배열에 비숫자 값 사용 자제**
  - **리터럴 사용하지 않고 배열 초기화 할 때 작은 배열의 재변환 되지 않도록 주의**

## Javascript 컴파일
- Javascript 는 동적인 언어이고 원래는 인터프리터 방식으로 구현
- 최근 Javascript 런타임 엔진은 컴파일을 이용
- V8 (Chrome browser's Javascript Engine) 에는 두가지 Just-In-Time(JIT) 컴파일러가 있다.

  - Full Compiler : 일반적인 Javascript를 좋은 코드로 변환
  - Optimizing Compiler : 대부분의 Javascript들을 뛰어난 코드로 변환하지만 시간 더 오래걸린다

## The Full Compiler
- 모든 코드에서 동작하고, 최대한 빨리 코드를 실행시키지만 뛰어난 코드보다는 일반적으로 좋은 코드들을 만든다.
- 컴파일 시점에서 데이터 타입에 대한 가정을 하지 않는다 (변수의 데이터 타입이 런타임시에 변경된다고 간주)
- Full Compiler 가 생성한 코드는 인라인 캐시 (ICs)를 사용하여 프로그램 실행시에 타입에 대한 정보를 구체화한다.
- 인라인 캐시는 타입 의존적인 코드들을 캐싱하여 타입을 효과적으로 처리한다.
- 코드가 실행시에, 타입 추정이 유효한지 확인한다. 그 후 인라인 캐시를 이용하여 동작을 단순화 한다.
- 여러 데이터 타입 처리시에는 성능이 떨어질 수 있음.
> **[결론]**
  - **다형적(polymorphic)연산 보다는 단형적(monomorphic)연산을 사용한다.**
  - **단형적 연산 : hidden class 가 항상 같다.**
  - **다형적 연산 : 그렇지 않고 값이 변한다.**


- 아래 예제를 확인해보자

```javascript
  function add(x, y) {
    return x + y;
  }

  add(1, 2);      // add 함수의 더하기는 단형적 연산입니다.
  add("a", "b");  // add 함수의 더하기는 다형적 연산이 됩니다.
```

- 위의 x, y를 보면 첫번째 `add(1,2);`기본 number 타입에서 두번째 `add("a","b");`에서 일반 object 타입으로 변한다.
- 이 경우 같은 함수에 대한 두번의 호출이 동일한 hidden class를 쓰는 것이 아니고, 달라지기 때문에 이건 다형적 연산이 된다.

## The Optimizing Compiler
- Full Compiler와는 병렬로 처리된다.
- V8 엔진이 hot function(자주 실행되는 함수)을 Optimizing Compiler로 재컴파일 한다.
- 타입 피드백을 이용하여 컴파일된 코드를 빠르게 한다. (인라인캐쉬 (ICs)에서 얻은 타입을 사용한다.)
- 컴파일러 연산은 추론을 통해서 인라인 된다. (호출된 곳에 코드 위치)
- 이렇게 해서 실행속도를 빠르게 하고 다른 최적화도 가능하다.
- 단형적 함수와 생성자들은 완전히 인라인 될 수 있다 (단형적 연산이 V8에서 좋은 이유)
- 최적화 컴파일러는 현재 `try {} catch {}` 구문을 처리하지 않는다.
- 최적화 코드 로그 보려면 V8 엔진에서 `d8 --trace-opt primes.js` 플래그 사용
> **[결론]**
  - **try {} catch {} 사용시 성능에 민감한 코드는 아래 예제처럼 내장함수에 적용한다.**

```javascript
  function perf_sensitive() {
    // Do performance-sensitive work here
  }

  try {
    perf_sensitive()
  } catch (e) {
    // Handle exceptions here
  }
```

## De-optimization
- 이 컴파일러는 추론을 이용하여 최적화를 한다.
- 최적화된 코드를 버리고, Full Compiler 코드의 맞는 위치에서 실행을 재개
- 최적화된 코드의 hidden class 를 변경시에 역최적화가 일어난다.
- 역최적화 코드 보려면 V8에서 `d8 --trace-deopt primes.js` 플래그 사용
> **[결론]**
  - **함수가 최적화 된 이후에 hidden class 변경을 자제한다**
