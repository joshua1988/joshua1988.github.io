---
layout: article
title: "자바스크립트 간단한 테스팅 함수 만들어보기"
date: 2019-01-16 01:45:13 +0900
categories: [web-development, javascript]
excerpt: "(중급) 자바스크립트 테스트를 위한 간단한 함수를 만들어보자"
image:
  teaser: posts/web/javascript/js.png
  credit: Frank Liu #name of the person or site you want to credit
  creditlink: http://geekologist.co/tag/javascript/
  #url to their site or licensing
locale: "ko"
# 리플 옵션
comments: true
tags:
- 자바스크립트
- 자바스크립트 기초
- 자바스크립트 기초 예제
- 자바스크립트 기본
- 자바스크립트 강좌
- 자바스크립트 문법
- 자바스크립트 테스트
- js test
- 자바스크립트 테스트 케이스
- 테스트 케이스
- test case
- 자바스크립트 입문
- 자바스크립트 초급
- 자바스크립트 시작하기
- 자바스크립트 코딩 면접
- javascript 코딩 면접
- 자바스크립트 입문 책
- 자바스크립트 서적
- 캡틴판교
- 장기효
- 인프런
- 패스트 캠퍼스
---

{% include toc.html %}

<!-- ## 테스팅이란? -->

<!-- ## 자바스크립트에서 테스트가 필요한 이유? -->

## 들어가며

이번 글에서는 자바스크립트로 간단하게 테스트 함수를 만들어보겠습니다. 평소와는 다르게 좀 더 간결하고 짧은 호흡으로 글과 코드를 작성해봤습니다. 한번 빠르게 쭉 훑어보세요! :)

## 간단한 자바스크립트 테스트 코드 만들어보기

아래와 같이 간단한 코드의 결과를 확인하는 테스트 코드를 짜봅시다.

```js
function sum(a, b) {
	return a + b;
}
```

테스트 코드에서 함수의 결과 값을 result라 하고, 기대 값을 expected라고 하겠습니다.

```js
var result = sum(1, 2);
var expected = 5;

if (result !== expected) {
	throw new Error(result + ' is not equal to ' + expected);
}
```

두 개의 합을 더한 결과(result)는 3이고 기대 값(expected)는 5이기 때문에 아래와 같은 오류가 발생합니다.

![error]({{ site.url }}/images/posts/web/javascript/js-testing/error1.png)

## 간단한 테스트 함수 만들어보기

앞의 코드를 API 형태로 제공하는 함수로 변환해보겠습니다. API는 다음과 같이 일반적인 테스트 라이브러리에서 찾아볼 수 있는 형태로 하겠습니다.

```js
expect(result).toBe(expected)
```

코드는 다음과 같습니다.

```js
function sum(a, b) {
	return a + b;
}

function expect(result) {
  return {
    toBe: function(expected) {
      if (result !== expected) {
      	throw new Error(result + ' is not equal to ' + expected);
      }
    }
  }
}
```

위의 함수를 아래와 같이 실행하면 아까와 같이 동일한 에러가 발생합니다.

```js
expect(sum(1,2)).toBe(5);
```

![error]({{ site.url }}/images/posts/web/javascript/js-testing/error1.png)

## 그럴싸한 테스트 함수 만들어보기

앞에서 작성한 테스트 함수는 몇 번째 줄에서 오류가 났는지 추적하기가 어렵다는 단점이 있습니다.
또한, 각 테스트 함수의 역할이 구분되지 않죠. 이번엔 좀 더 의미 있는 테스트 함수를 작성해보겠습니다.

```js
function test(title, testCode) {
  try {
    testCode();
  } catch (error) {
    console.error(error);
  }
}

function expect(result) {
  return {
    toBe: function(expected) {
      if (result !== expected) {
      	throw new Error(result + ' is not equal to ' + expected);
      }
    }
  }
}
```

위 코드의 모양은 전형적인 테스트 라이브러리의 API 형태와 비슷합니다.
위 함수를 이용하면 다음과 같이 테스트를 할 수 있습니다.

```js
test('sum(1, 2) is not equal 5', function() {
  expect(sum(1, 2)).toBe(5);
});
```

앞의 예제와 마찬가지로 동일한 오류를 발생시키지만 이번엔 좀 더 추적하기가 쉽습니다.

![error2]({{ site.url }}/images/posts/web/javascript/js-testing/error2.png)

## 마무리

이처럼 자바스크립트 테스트 코드는 쉽게 작성할 수 있습니다. 다음 글에서는 실제 테스팅 라이브러리를 이용해 Unit 테스트를 작성하는 방법을 다뤄볼게요.
그럼 즐 코딩! :)
