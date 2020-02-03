---
layout: article
title: "자바스크립트 비동기 처리와 콜백 함수"
date: 2018-02-06 17:54:13 +0900
categories: [web-development, javascript]
excerpt: "(중급) 중급 자바스크립트 개발자가 되기 위한 자바스크립트 비동기 처리와 콜백 함수 이해하기. 콜백 지옥과 해결 방법 등"
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
- 자바스크립트 문법
- 자바스크립트 문법 정리
- 자바스크립트 예제
- 자바스크립트 함수
- 자바스크립트란
- 자바스크립트 기본
- 자바스크립트 강좌
- 자바스크립트 비동기
- 자바스크립트 비동기 프로그래밍
- 자바스크립트 비동기 함수
- 콜백 함수
- 자바스크립트 콜백 함수
- 콜백 지옥
- 자바스크립트 콜백 지옥
- 자바스크립트 콜백함수 원리
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

## 들어가며
얼마 전 수강생 한 분에게 Promise에 대해서 잘 설명된 글이나 예제 코드를 공유해달라고 요청받았습니다.
영어로는 잘 정리된 글이 많은데 한글로 쉽게 설명된 글을 찾아드리려고 하니 생각보다 자료가 많지 않더라구요.
그래서 Promise를 정리하기 위해 글을 쓰기 시작했습니다.

*'Promise는 자바스크립트 비동기 처리에 사용되는 객체'* 라는 첫 소개 문구를 쓰고 보니
비동기 처리가 뭔지 궁금해하시는 분들이 많을 것 같았습니다. 그래서 이번 글은 자바스크립트 비동기 처리에 대해서 적어봤습니다.
자바스크립트가 비동기 처리를 하는 이유, 비동기 처리를 유연하게 하기 위한 콜백 함수, 콜백 함수 지옥 등
이번 글에서 Promise를 왜 사용해야 되는지에 대해 감을 잡고 나면 [다음 편으로 연재할 Promise 글](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)을 재밌게 읽으실 수 있을거에요 :)

그럼 오늘도 Happy Coding!

## 비동기 처리? 그게 뭔가요?
자바스크립트의 비동기 처리란 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고
다음 코드를 먼저 실행하는 자바스크립트의 특성을 의미합니다.

## 비동기 처리의 첫 번째 사례
비동기 처리의 가장 흔한 사례는 제이쿼리의 ajax입니다.
제이쿼리로 실제 웹 서비스를 개발할 때 ajax 통신을 빼놓을 수가 없습니다.
보통 화면에 표시할 이미지나 데이터를 서버에서 불러와 표시해야 하는데 이때
ajax 통신으로 해당 데이터를 서버로부터 가져올 수 있기 때문입니다.

그럼 ajax 코드를 잠깐 살펴보겠습니다.

```js
function getData() {
	var tableData;
	$.get('https://domain.com/products/1', function(response) {
		tableData = response;
	});
	return tableData;
}

console.log(getData()); // undefined
```

여기서 `$.get()`이 ajax 통신을 하는 부분입니다. `https://domain.com` 에다가 HTTP GET 요청을 날려
1번 상품(product) 정보를 요청하는 코드죠. 좀 더 쉽게 말하면 지정된 URL에
'데이터를 하나 보내주세요' 라는 요청을 날리는 것과 같습니다.

그렇게 서버에서 받아온 데이터는 `response` 인자에 담깁니다. 그리고 `tableData = response;` 코드로
받아온 데이터를 `tableData`라는 변수에 저장합니다. 그럼 이제 이 getData()를 호출하면 어떻게 될까요?
받아온 데이터가 뭐든 일단 뭔가 찍혀야겠죠. 근데 결과는 맨 아래에서 보시는 것처럼 undefined입니다.
왜 그럴까요?

그 이유는 `$.get()`로 데이터를 요청하고 받아올 때까지 기다려주지 않고
다음 코드인 `return tableData;`를 실행했기 때문입니다. 따라서, getData()의 결과 값은
초기 값을 설정하지 않은 tableData의 값 undefined를 출력합니다.

**이렇게 특정 로직의 실행이 끝날 때까지 기다려주지 않고 나머지 코드를 먼저 실행하는 것이 비동기 처리입니다.**
자바스크립트에서 비동기 처리가 필요한 이유를 생각해보면, 화면에서 서버로 데이터를 요청했을 때 서버가 언제
그 요청에 대한 응답을 줄지도 모르는데 마냥 다른 코드를 실행 안 하고 기다릴 순 없기 때문입니다.
위에선 간단한 요청 1개만 보냈는데 만약 100개 보낸다고 생각해보세요. 비동기 처리가 아니고 동기 처리라면
코드 실행하고 기다리고, 실행하고 기다리고.. 아마 웹 애플리케이션을 실행하는데 수십 분은 걸릴 겁니다.

## 비동기 처리의 두 번째 사례
또 다른 비동기 처리 사례는 setTimeout()입니다. setTimeout()은 Web API의 한 종류입니다.
코드를 바로 실행하지 않고 지정한 시간만큼 기다렸다가 로직을 실행합니다. 아래 코드를 보겠습니다.

```js
// #1
console.log('Hello');
// #2
setTimeout(function() {
	console.log('Bye');
}, 3000);
// #3
console.log('Hello Again');
```

비동기 처리에 대한 이해가 없는 상태에서 위 코드를 보면 아마 다음과 같은 결과값이 나올 거라고 생각할 겁니다.
- 'Hello' 출력
- 3초 있다가 'Bye' 출력
- 'Hello Again' 출력

그런데 실제 결과 값은 아래와 같이 나오죠.
- 'Hello' 출력
- 'Hello Again' 출력
- 3초 있다가 'Bye' 출력

setTimeout() 역시 비동기 방식으로 실행되기 때문에 3초를 기다렸다가 다음 코드를 수행하는 것이 아니라
일단 setTimeout()을 실행하고 나서 바로 다음 코드인 `console.log('Hello Again');`으로 넘어갔습니다.
따라서, 'Hello', 'Hello Again'를 먼저 출력하고 3초가 지나면 'Bye'가 출력됩니다.

## 콜백 함수로 비동기 처리 방식의 문제점 해결하기
앞에서 자바스크립트 비동기 처리 방식에 의해 야기될 수 있는 문제들을 살펴봤습니다.
이러한 문제들은 어떻게 해결할 수 있을까요? 바로 콜백(callback) 함수를 이용하는 것입니다.
앞에서 살펴본 ajax 통신 코드를 콜백 함수로 개선해보겠습니다.

```js
function getData(callbackFunc) {
	$.get('https://domain.com/products/1', function(response) {
		callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
	});
}

getData(function(tableData) {
	console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
});
```

이렇게 콜백 함수를 사용하면 특정 로직이 끝났을 때 원하는 동작을 실행시킬 수 있습니다.

## 비유로 이해하는 콜백 함수 동작 방식
콜백 함수의 동작 방식은 일종의 식당 자리 예약과 같습니다. 일반적으로 맛집을 가면 사람이 많아 자리가 없습니다.
그래서 대기자 명단에 이름을 쓴 다음에 자리가 날 때까지 주변 식당을 돌아다니죠.
만약 식당에서 자리가 생기면 전화로 자리가 났다고 연락이 옵니다. 그 전화를 받는 시점이
여기서의 콜백 함수가 호출되는 시점과 같습니다. 손님 입장에서는 자리가 날 때까지 식당에서
기다리지 않고 근처 가게에서 잠깐 쇼핑을 할 수도 있고 아니면 다른 식당 자리를 알아볼 수도 있습니다.

자리가 났을 때만 연락이 오기 때문에 미리 가서 기다릴 필요도 없고, 직접 식당 안에 들어가서
자리가 비어 있는지 확인할 필요도 없습니다. 자리가 준비된 시점, 즉 데이터가 준비된 시점에서만
저희가 원하는 동작(자리에 앉는다, 특정 값을 출력한다 등)을 수행할 수 있습니다.

## 콜백 지옥 (Callback hell)
콜백 지옥은 비동기 처리 로직을 위해 콜백 함수를 연속해서 사용할 때 발생하는 문제입니다.
아마 아래와 같은 코드를 본 적이 있을 겁니다.

```js
$.get('url', function(response) {
	parseValue(response, function(id) {
		auth(id, function(result) {
			display(result, function(text) {
				console.log(text);
			});
		});
	});
});
```

웹 서비스를 개발하다 보면 서버에서 데이터를 받아와 화면에 표시하기까지
인코딩, 사용자 인증 등을 처리해야 하는 경우가 있습니다.
만약 이 모든 과정을 비동기로 처리해야 한다고 하면 위와 같이 콜백 안에 콜백을 계속 무는 형식으로
코딩을 하게 됩니다. 이러한 코드 구조는 가독성도 떨어지고 로직을 변경하기도 어렵습니다.
이와 같은 코드 구조를 콜백 지옥이라고 합니다.

## 콜백 지옥을 해결하는 방법
일반적으로 콜백 지옥을 해결하는 방법에는 Promise나 Async를 사용하는 방법이 있습니다.
만약 코딩 패턴으로만 콜백 지옥을 해결하려면 아래와 같이 각 콜백 함수를 분리해주면 됩니다.

```js
function parseValueDone(id) {
	auth(id, authDone);
}
function authDone(result) {
	display(result, displayDone);
}
function displayDone(text) {
	console.log(text);
}
$.get('url', function(response) {
	parseValue(response, parseValueDone);
});
```

위 코드는 앞의 콜백 지옥 예시를 개선한 코드입니다. 중첩해서 선언했던 콜백 익명 함수를 각각의 함수로 구분하였습니다.
정리된 코드를 간단하게 살펴보겠습니다. 먼저 ajax 통신으로 받은 데이터를 parseValue() 메서드로 파싱 합니다.
parseValueDone()에 파싱 한 결과값인 id가 전달되고 auth() 메서드가 실행됩니다.
auth() 메서드로 인증을 거치고 나면 콜백 함수 authDone()이 실행됩니다. 인증 결과 값인 result로 display()를 호출하면
마지막으로 displayDone() 메서드가 수행되면서 text가 콘솔에 출력됩니다.

## 마무리

위와 같은 코딩 패턴으로도 콜백 지옥을 해결할 수 있지만 Promise나 Async를 이용하면
더 편하게 구현할 수 있습니다. 다음 글에서는 Promise에 대해서 알아보겠습니다.

#### 다음 시리즈물 확인하기

- [2탄 - 자바스크립트 Promise 쉽게 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)
- [3탄 - 자바스크립트 async와 await](https://joshua1988.github.io/web-development/javascript/js-async-await/)

## 글보다 더 쉽게 배우는 온라인 강좌

좀 더 친절하고 상세한 설명을 원하신다면 아래 강좌를 이용해보시는 것도 좋을 것 같아요 😄

<figure class="third">
	<a href="https://www.inflearn.com/course/Age-of-Vuejs/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/lv1.png"></a>
	<a href="https://www.inflearn.com/course/vue-pwa-vue-js-%EC%A4%91%EA%B8%89/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/lv2.png"></a>
	<a href="https://www.inflearn.com/course/vue-js/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/lv3.png"></a>
	<figcaption>인프런 온라인 강좌 : Vue.js 시작하기, Vue.js 중급, Vue.js 완벽 가이드 (좌측 부터)</figcaption>
</figure>

## 밀착 지도를 받을 수 있는 오프라인 강의

강남역 패스트캠퍼스에서 2020년 1월부터 3월 초까지 두 달 동안 매주 토요일 Vue와 PWA를 제작하는 수업을 진행합니다. 관심 있으신 분들은 아래 이미지를 클릭해주세요 😄

<figure class="third">
	<a href="https://www.fastcampus.co.kr/dev_camp_vue/" target="_blank"><img src="{{ site.url }}/images/posts/web/fastcampus/vue.png"></a>
	<figcaption>패스트캠퍼스 Vue.js 정복 캠프(20.2.24 ~ 20.4.1)</figcaption>
</figure>