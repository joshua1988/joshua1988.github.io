---
layout: article
title: "성능덕후를 위한 자바스크립트 코딩 패턴(중급)"
date: 2016-11-26 17:26:13 +0900
categories: web_dev
image:
  teaser: posts/web/javascript/javascript_path.png
  credit: CodeSchool #name of the person or site you want to credit
  creditlink: https://kr.pinterest.com/codeschool/code-school-javascript/ #url to their site or licensing
locale: "ko"
# 리플 옵션
comments: true
tags:
- 자바스크립트 패턴
- 자바스크립트 디자인 패턴
- 자바스크립트 코딩 기법
- 자바스크립트 패턴 책
- 자바스크립트
- 프론트엔드 개발
- javascript pattern
- 자바스크립트 성능
- 자바스크립트 개발
- 자바스크립트 중급
- 자바스크립트 고급
---
{% include toc.html %}

> 이 글은 CodeSchool 의 Javascript Best Practices 를 듣고, 주요 내용을 정리한 글입니다.

## Ternary Conditional (삼항 연산자)
- 다음과 같은 예문이 있다.

  ``` javascript
  var isArthur = true;
  var weapon;

  if(isArthur) {
    weapon = "Excalibur";
  } else {
    weapon = "Longsword";
  }
  ```

- 삼항연산자를 이용하면 위의 if else 문을 아래와 같이 바꿀수 있다.

  ``` javascript
  var weapon = isArthur ? "Excalibur" : "Longsword";
  ```

- 또한 삼항 연산자를 다음과 같은 형태로도 사용이 가능하다.

  ``` javascript
  // 두개 이상의 변수를 이용하여 값을 받는 경우
  isArthur && isKing ? (weapon = "Ex", helmet = "Goose")
                       :
                       (weapon = "ln", helmet = "Iron")

  // 즉시 실행함수로 값을 받는 경우
  isArthur && isKing ? function () {
                          // ...
                       }();
                       :
                       function () {
                          // ...
                       }();
  ```

## Logical Assignment 1 (OR)
- OR 연산자 : "falsy" 하지 않은 가장 첫번째 마주친 값을 갖는다.
- 아래의 삼항 연산자를 OR 연산자를 이용하여 다음과 같이 줄일 수 있다.

  ``` javascript
  // 삼항연산자 사용
  function addSword(sword) {
    this.swords = this.swords ? this.swords : [ ];
    this.swords = push.(sword);
  }

  // OR 연산자 사용
  function addSword(sword) {
    this.swords = this.swords || [ ];
    this.swords = push.(sword);
  }

  // OR 연산자 잘못 사용한 예
  function addSword(sword) {
    this.swords = [ ] || this.swords;
    this.swords = push.(sword);
  }
  // 위의 경우 계속 new array 를 할당함.
  ```

- OR 연산자의 잘못된 사용 예를 더 본다.

  ``` javascript
  // 잘못된 OR 연산자 사용 예
  var result1 = 42 || undefined; // undefined 를 절대로 마주치지 않는다.
  var result2 = ["Sweet", "array"] || 0; // 0을 절대로 마주치지 않는다.
  var result3 = {type: "ring", stone: "diamond"} || ""; // "" 를 절대로 맞추지지 않는다.

  // 위를 고쳐보면,
  var result1 = undefined || 42;
  var result2 = 0 || ["Sweet", "array"]; // 0을 절대로 마주치지 않는다.
  var result3 = "" || {type: "ring", stone: "diamond"}; // "" 를 절대로 맞추지지 않는다.
  ```

## Logical Assignment 2 (And)
- OR 연산자와는 다르게 두개의 "truthy" 값이 있으면, 마지막으로 확인한 truthy 값이 리턴된다.
- "falsy" 값의 경우에는 OR 연산자와 동일하게 동작한다.

  ``` javascript
  var result1 = "King" && "Arthur";
  console.log(result1); //Arthur
  var result2 = "Arthur" && "King";
  console.log(result2); // King
  ```

## Switch Blocks
- 반복되는 `if else` 문과 `switch` 문의 차이점은, 순차적으로 모든 if 문을 도느냐. 아니면 해당하는 case 로 바로 가서 불필요한 연산을 줄이느냐의 차이이다.

  ``` javascript
  var regimnet = 3;

  if (regiment == 1) {
    ...
  } else if (regiment == 2) {
    ...
  } else if (regiment == 3) { // 앞 1,2 를 거쳐 3으로 온다.
    ...
  }

  switch (regiment) {
    case 1:
      ...
    case 2:
      ...
    case 3: // 3으로 바로 온다.
      ...
  }
  ```

- break 문을 사용하지 않고, 공통된 property 를 상위 case 에서 부터 순차적으로 접근하여 추가하는 방법도 있다.

## Loop Optimization
- 컴퓨터 메모리 관점에서 일반적인 for 문의 연산 순서를 보자.

  ``` javascript
  treasureChest = {
    necklaces: ["A", "B", "C", "D"];
  };

  for (var i = 0; i < treasureChest.necklaces.length; i++) {
    console.log(treasureChest.necklaces[i]);
  }
  ```

- 위 for 문에서 메모리 연산이 필요한 부분은 다음과 같다.

  1. i 값 탐색
  2. treasureChest 객체 탐색
  3. necklaces 속성 탐색
  4. necklaces 속성의 배열 인덱스 탐색
  5. length 프로퍼티 검색

> 위의 연산을 최적화 해보자 : Cache the necessary values in the local variables

  ``` javascript
  // 1. length property 를 한번만 접근 (기존 for 문은 반복시 마다 접근)
  var x = treasureChest.necklaces.length;
  for (var i = 0; i < x; i++) {
    console.log(treasureChest.necklaces[i]);
  }
  ```

- 위의 리팩토링으로 연산 수가 다음과 같이 줄어들었다.
  - TBC

- 위 코드는 더 개선할 수 있다.

  ``` javascript
  // 2. for 문의 초기 선언문 쪽에서 x 값을 선언하면, 전역 변수로 var x 를 선언하지 않아도 되어 메모리가 더 효율적이게 된다.
  for (var i = 0, x = treasureChest.necklaces.length; i < x; i++) {
    console.log(treasureChest.necklaces[i]);
  }
  ```

  - **주의할 점 : 자바스크립트는 {} 로 스코핑이 되어 있지 않기 때문에, 위의 for 반복문이 끝나면 x 값은 최종 값으로 할당되어 있다는 사실**

- 또 다른 개선 포인트

  ``` javascript
  // 3. 각 반복 싸이클마다 treasureChest 객체의 속성에 접근을 할 필요가 없다.
  var list = treasureChest.necklaces;
  for (var i = 0, x = treasureChest.necklaces.length; i < x; i++) {
    console.log(list[i]);
  }
  ```

> 모든 인덱스를 접근할 때에는 `for loop` 문이 좋고, 때로는 `for in` 보다 성능이 나은 경우가 있다. `for in` 은 prototype 에 접근하여 기존의 기 정의된 메서드까지 포함하여 출력하므로 비효율적

## Performance (Script Loading)
- Work Intensive javascript 는 body 마지막 태그 맨 위나 async 속성 이용하여 페이지 첫 로딩을 빠르게 한다.

## Performance (Inheritance)
- 자바스크립트에서 상속은 prototype 을 이용
- 공통으로 쓰는 메서드는 모두 prototype 에 집어 넣는다.

  ``` javascript
  function SignalFire(id, logs) {
    this.id = id;
    this.logs = logs;

    this.functionality1: function() {

    },
    this.functionality2: function() {

    },
    this.functionality3: function() {

    },
  }
  ```

  - 위 함수의 경우 매번 객체를 생성할 때 마다 사용하지 않는 메서드들을 메모리에서 사용하는 낭비가 발생한다.
  - 따라서, 매번 객체 생성시 필요한 속성이나 메서드만 가져가도록 하고, 공통 메서드는 다음과 같이 prototype 으로 뺀다.

  ``` javascript
  SignalFire.prototype = {
    functionality1: function() {

    },
    functionality2: function() {

    },
    functionality3: function() {

    },
  }
  ```

## Performance (Indivdual DOM)
- list 를 배열로 갖는 DOM 요소에 `append` 메서드를 이용하여 DOM 을 추가하면 전체 리스트가 `reflow` 된다. 이는 성능에 악영향을 준다.
- 성능 향상을 위한 해결법은 **Fragment** 를 사용한다.

  ``` javascript
  var fragment = document.createDocumentFragment();
  fragment.appendChild(element);
  list.appendChild(fragment);
  ```

## Performance (Get rid of var redundancy)
- var 지정어를 사용할 떄, 다음과 같이 코드량을 줄일 수 있다.

  ``` javascript
  var a = 1;
  var b = "hello";
  var c = ["a","b","c"];

  var a = 1,
      b = "hello",
      c = ["a","b","c"];

  // 코드의 가독성이 높아지고, 간결하다.
  ```

## Performance (String Concatenation)
- 문자열의 길이에 따라 `+=` 연산자와 `join()` 메서드의 성능차이가 발생한다.

  - 문자열이 짧을 떄 : `+=` 연산자가 성능이 더 빠르다.
  - 문자열이 길고, 문자열이 배열안에 리스트 형태로 저장되어 있을 때 : `join("\n")` 메서드가 성능이 우월하다.

  ``` javascript
  var page = "";
  for (var i = 0, x =  newPageBuild.length ; i < x ; i++) {
    page += newPageBuild[i];
  }

  // join() 메서드 활용
  page = newPageBuild.join("\n");
  ```

## Namespacing
- 팀 프로젝트 시 많은 양의 자바스크립트 코드를 작성할 때, 타 팀원이 작성한 전역변수가 overwrite 되는 경우가 발생한다.
- 이를 막기 위해 namespacing 을 활용한다.

  ``` javascript
  var a = ["Apple", "Banana", "Coil"];
  var c = function () {
    console.log("this is not what I want.");
  };

  var nameSpace = {
    a : "1",
    b : 23,
    c : function() {
      // ...
    }
  };

  // HTML Element click event
  onClick=nameSpace.c();
  ```
