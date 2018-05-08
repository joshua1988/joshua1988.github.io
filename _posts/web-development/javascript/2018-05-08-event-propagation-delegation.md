---
layout: article
title: "이벤트 버블링, 이벤트 캡처 그리고 이벤트 위임까지"
date: 2018-05-08 17:14:13 +0900
categories: [web-development, javascript]
excerpt: "(초급) 이벤트 버블링, 이벤트 캡처링, 그리고 이벤트 위임까지 이벤트 전달 방식과 관련된 모든 것을 파헤쳐 봅니다."
image:
  teaser: posts/web/javascript/js.png
  credit: Frank Liu #name of the person or site you want to credit
  creditlink: http://geekologist.co/tag/javascript/
  #url to their site or licensing
locale: "ko"
# 리플 옵션
comments: true
tags:
- 자바스크립트 이벤트
- 자바스크립트 이벤트핸들러
- 자바스크립트 이벤트 버블링
- 자바스크립트 이벤트 중지
- 자바스크립트 이벤트 캡쳐링
- 자바스크립트 이벤트 제거
- 자바스크립트 이벤트 전파
- stopPropagation()
- stopPropagation
- addEventListener
- 이벤트 버블링 방지
- 이벤트 버블링 캡쳐링
- javascript 이벤트 취소
- 자바스크립트 기초
- 자바스크립트 기초 예제
- 자바스크립트
- 자바스크립트 기본
- 자바스크립트 강좌
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

얼마 전 Vanilla JS로 꽤 복잡한 웹 애플리케이션을 구현할 일이 생겨 오랜만에 순수 자바스크립트를 들여다보게 되었습니다.
구현 과정에서 이벤트 캡쳐와 버블링에 대해 정확히 지식이 정리가 되어 있지 않다는 것을 깨닫고 아래와 같이 정리하게 되었네요.
브라우저에서 어떻게 특정 화면 요소의 이벤트를 감지하는지 그리고 그 이벤트를 어떻게 다른 화면 요소에 전파하는지 같이 알아보겠습니다.

이 글을 읽고 나면 알게 되는 것들

- 이벤트 등록 방법
- 이벤트 전달 방식 (이벤트 버블링, 이벤트 캡쳐, 이벤트 위임)
- event.stopPropagation()

## 이벤트 등록
본문에 들어가기 앞서 가장 기본적으로 이해하고 있어야 하는 내용은 바로 웹 애플리케이션의 **이벤트 등록**입니다.
여기서 말하는 이벤트 등록이란 웹 애플리케이션에서 사용자의 입력을 받기 위해 필요한 기능입니다.
아래와 같은 코드를 의미하죠.

```html
<button>add one item</button>
```

```js
var button = document.querySelector('button');
button.addEventListener('click', addItem);

function addItem(event) {
	console.log(event);
}
```

add one item이라는 간단한 버튼을 만들어 클릭했을 때 addItem이라는 함수를 실행시키는 코드입니다.
버튼을 클릭하고 나면 addItem 함수가 실행되고 addItem 함수에 `event` 인자가 넘어옵니다.
`event` 인자를 콘솔에 출력해보면 이벤트와 관련된 정보를 확인할 수 있습니다.

이처럼 `addEventListener()` 웹 API는 웹 개발자들이 화면에 동적인 기능을 추가하기 위해 자연스럽게 접하게 되는 기본적인 기능입니다.
사용자의 입력에 따라 추가 동작을 구현할 수 있는 방법이죠. 여기서 브라우저는 어떻게 이벤트의 발생을 감지했을까요?
브라우저가 이벤트를 감지하는 방식 2가지를 아래에서 알아보겠습니다.

## 이벤트 버블링 - Event Bubbling
이벤트 버블링은 특정 화면 요소에서 이벤트가 발생했을 때 해당 이벤트가 더 상위의 화면 요소들로 전달되어 가는 특성을 의미합니다. 아래와 같은 그림처럼요.

<figure>
	<img src="{{ site.url }}/images/posts/web/javascript/event/event-bubble.png">
	<figcaption>하위의 클릭 이벤트가 상위로 전달되어 가는 그림</figcaption>
</figure>

<p class="notice">상위의 화면 요소란? HTML 요소는 기본적으로 트리 구조를 갖습니다. 여기서는 트리 구조상으로 한 단계 위에 있는 요소를 상위 요소라고 하며 body 태그를 최상위 요소라고 부르겠습니다.</p>

위 그림은 아래에 예시로 들 코드를 미리 도식화한 그림입니다.
세 개의 div 태그가 있고 가장 아래에 있는 div 태그에서 이벤트가 발생했을 때 최상위 요소인 body 태그까지 이벤트가 전달되는 모습을 나타내었습니다.
그럼 이제 같이 코드를 보겠습니다.

```html
<body>
	<div class="one">
		<div class="two">
			<div class="three">
			</div>
		</div>
	</div>
</body>
```

```js
var divs = document.querySelectorAll('div');
divs.forEach(function(div) {
	div.addEventListener('click', logEvent);
});

function logEvent(event) {
	console.log(event.currentTarget.className);
}
```

위 코드는 세 개의 div 태그에 모두 클릭 이벤트를 등록하고 클릭 했을 때 logEvent 함수를 실행시키는 코드입니다.
여기서 위 그림대로 최하위 div 태그 `<div class="three"></div>`를 클릭하면 아래와 같은 결과가 실행됩니다.

<figure>
	<img src="{{ site.url }}/images/posts/web/javascript/event/event-bubble-log.png">
	<figcaption>three 클래스를 갖는 div 태그를 클릭했을 때의 결과</figcaption>
</figure>

div 태그 한 개만 클릭했을 뿐인데 왜 3개의 이벤트가 발생되는 걸까요? 그 이유는 브라우저가 이벤트를 감지하는 방식 때문입니다.

브라우저는 특정 화면 요소에서 이벤트가 발생했을 때 그 이벤트를 최상위에 있는 화면 요소까지 이벤트를 전파시킵니다.
따라서, 클래스 명 three -> two -> one 순서로 div 태그에 등록된 이벤트들이 실행됩니다.
마찬가지로 two 클래스를 갖는 두 번째 태그를 클릭했다면 two -> one 순으로 클릭 이벤트가 동작하겠죠.

여기서 주의해야 할 점은 각 태그마다 이벤트가 등록되어 있기 때문에 상위 요소로 이벤트가 전달되는 것을 확인할 수 있습니다.
만약 이벤트가 특정 div 태그에만 달려 있다면 위와 같은 동작 결과는 확인할 수 없습니다.

이와 같은 하위에서 상위 요소로의 이벤트 전파 방식을 **이벤트 버블링(Event Bubbling)**이라고 합니다. <br>
"Trigger clicks all the way up"

## 이벤트 캡쳐 - Event Capture
이벤트 캡쳐는 이벤트 버블링과 반대 방향으로 진행되는 이벤트 전파 방식입니다.

<figure>
	<img src="{{ site.url }}/images/posts/web/javascript/event/event-capture.png">
	<figcaption>클릭 이벤트가 발생한 지점을 찾아내려 가는 그림</figcaption>
</figure>

위 그림처럼 특정 이벤트가 발생했을 때 최상위 요소인 body 태그에서 해당 태그를 찾아 내려갑니다.
그럼 이벤트 캡쳐는 코드로 어떻게 구현할 수 있을까요?

```html
<body>
	<div class="one">
		<div class="two">
			<div class="three">
			</div>
		</div>
	</div>
</body>
```

```js
var divs = document.querySelectorAll('div');
divs.forEach(function(div) {
	div.addEventListener('click', logEvent, {
		capture: true // default 값은 false입니다.
	});
});

function logEvent(event) {
	console.log(event.currentTarget.className); // one, two, three
}
```

`addEventListener()` API에서 옵션 객체에 `capture:true`를 설정해주면 됩니다.
그러면 해당 이벤트를 감지하기 위해 이벤트 버블링과 반대 방향으로 탐색합니다.

따라서, 아까와 동일하게 `<div class="three"></div>` 를 클릭해도 아래와 같은 결과가 나타납니다.

<figure>
	<img src="{{ site.url }}/images/posts/web/javascript/event/event-capture-log.png">
	<figcaption>three 클래스를 갖는 div 태그를 클릭했을 때의 결과</figcaption>
</figure>

## event.stopPropagation()
"난 이렇게 복잡한 이벤트 전달 방식 알고 싶지 않고, 그냥 원하는 화면 요소의 이벤트만 신경 쓰고 싶어요."라고 생각하시는 분들이 충분히 있을 수 있습니다.
실제로 마감 기한에 쫓기는 상황에서 이런 동작 방식을 정확히 이해하는 시간보다는 구현에 더 많은 시간을 쏟아야 하기 때문입니다.
그럴 때는 아래처럼 `stopPropagation()` 웹 API를 사용합니다.

```js
function logEvent(event) {
	event.stopPropagation();
}
```

위 API는 해당 이벤트가 전파되는 것을 막습니다.
따라서, 이벤트 버블링의 경우에는 클릭한 요소의 이벤트만 발생시키고 상위 요소로 이벤트를 전달하는 것을 방해합니다.
그리고 이벤트 캡쳐의 경우에는 클릭한 요소의 최상위 요소의 이벤트만 동작시키고 하위 요소들로 이벤트를 전달하지 않습니다.

위와 같이 logEvent 함수에 `stopPropagation()` API를 사용한다면
앞의 '이벤트 버블링 예제'와 '이벤트 캡쳐 예제'에서 사용한 코드 기준으로 각각
three와 one이 찍히겠네요.

```js
// 이벤트 버블링 예제
divs.forEach(function(div) {
	div.addEventListener('click', logEvent);
});

function logEvent(event) {
	event.stopPropagation();
	console.log(event.currentTarget.className); // three
}
```

```js
// 이벤트 캡쳐 예제
divs.forEach(function(div) {
	div.addEventListener('click', logEvent, {
		capture: true // default 값은 false입니다.
	});
});

function logEvent(event) {
	event.stopPropagation();
	console.log(event.currentTarget.className); // one
}
```

## 이벤트 위임 - Event Delegation
앞에서 살펴본 이벤트 버블링과 캡쳐는 사실 이벤트 위임을 위한 선수 지식이라고 해도 과언이 아닙니다.
이벤트 위임은 실제 바닐라 JS로 웹 앱을 구현할 때 자주 사용하게 되는 코딩 패턴입니다.

이벤트 위임을 한 문장으로 요약해보면 '하위 요소에 각각 이벤트를 붙이지 않고 상위 요소에서 하위 요소의 이벤트들을 제어하는 방식'입니다.

말보다는 코드죠. 아래 코드를 함께 살펴보겠습니다.

```html
<h1>오늘의 할 일</h1>
<ul class="itemList">
	<li>
		<input type="checkbox" id="item1">
		<label for="item1">이벤트 버블링 학습</label>
	</li>
	<li>
		<input type="checkbox" id="item2">
		<label for="item2">이벤트 캡쳐 학습</label>
	</li>
</ul>
```

```js
var inputs = document.querySelectorAll('input');
inputs.forEach(function(input) {
	input.addEventListener('click', function(event) {
		alert('clicked');
	});
});
```

위 코드는 할 일 목록을 간단한 리스트 아이템으로 나타낸 코드입니다.

<figure>
	<img src="{{ site.url }}/images/posts/web/javascript/event/event-delegation-1.gif">
	<figcaption>할 일 목록의 체크 박스를 클릭했을 때 클릭 이벤트 리스너가 동작하는 모습</figcaption>
</figure>

자바스크립트 `querySelectorAll()`를 이용해 화면에 존재하는 모든 인풋 박스 요소를 가져온 다음
각 인풋 박스의 요소에 클릭 이벤트 리스너를 추가합니다. 화면을 실행시키고 각 리스트 아이템의 인풋 박스(체크 박스)를 클릭하면
위와 같이 경고 창이 표시되죠.

여기까지는 별다를 것 없는 이상하지 않은 코드였는데요. 그런데 만약 여기서 할 일이 더 생겨서 리스트 아이템을 추가하면 어떻게 될까요?

```js
// ...

// 새 리스트 아이템을 추가하는 코드
var itemList = document.querySelector('.itemList');

var li = document.createElement('li');
var input = document.createElement('input');
var label = document.createElement('label');
var labelText = document.createTextNode('이벤트 위임 학습');

input.setAttribute('type', 'checkbox');
input.setAttribute('id', 'item3');
label.setAttribute('for', 'item3');
label.appendChild(labelText);
li.appendChild(input);
li.appendChild(label);
itemList.appendChild(li);
```

새로 추가한 리스트 아이템에 클릭 이벤트가 정상적으로 동작하는지 한번 확인해봤습니다.

<figure>
	<img src="{{ site.url }}/images/posts/web/javascript/event/event-delegation-2.gif">
	<figcaption>새로 추가된 리스트 아이템(이벤트 위임 학습)에서 클릭 이벤트가 동작하지 않는 모습</figcaption>
</figure>

새로 추가된 리스트 아이템에는 클릭 이벤트 리스너가 동작하지 않네요. 왜 그럴까요?

코드를 다시 살펴보면, 인풋 박스에 클릭 이벤트 리스너를 추가하는 시점에서 리스트 아이템은 두 개입니다.
따라서, 새롭게 추가된 리스트 아이템에는 클릭 이벤트 리스너가 등록되지 않았죠.
이런 식으로 매번 새롭게 추가된 리스트 아이템까지 클릭 이벤트 리스너를 일일이 달아줘야 할까요?

리스트 아이템이 많아지면 많아질수록 이벤트 리스너를 다는 작업 자체가 매우 번거롭습니다.
이 번거로운 작업을 해결할 수 있는 방법이 바로 이벤트 위임(Event Delegation)입니다.

앞에서 살펴본 코드를 아래와 같이 변경해보겠습니다.

```js
// var inputs = document.querySelectorAll('input');
// inputs.forEach(function(input) {
// 	input.addEventListener('click', function() {
// 		alert('clicked');
// 	});
// });

var itemList = document.querySelector('.itemList');
itemList.addEventListener('click', function(event) {
	alert('clicked');
});

// 새 리스트 아이템을 추가하는 코드
// ...
```

화면의 모든 인풋 박스에 일일이 이벤트 리스너를 추가하는 대신 이제는 인풋 박스의 상위 요소인 ul 태그,
`.itemList`에 이벤트 리스너를 달아놓고 하위에서 발생한 클릭 이벤트를 감지합니다.
이 부분이 앞에서 배웠던 이벤트 버블링이죠.

결과는 다음과 같습니다.

<figure>
	<img src="{{ site.url }}/images/posts/web/javascript/event/event-delegation-3.gif">
	<figcaption>새로 추가된 리스트 아이템에서 클릭 이벤트가 정상적으로 동작하는 모습</figcaption>
</figure>

이젠 리스트 아이템을 새로 추가할 때마다 클릭 이벤트를 안 달아도 되겠네요 :)

<p class="notice">참고 : 위 코드는 현재 인풋 박스의 이벤트만 다루는 것이 아니라 label 태그의 이벤트도 감지합니다. event 객체를 이용하여 인풋 박스의 이벤트만 감지할 수 있도록 구현해보세요.</p>

## 마무리
오늘은 브라우저가 어떻게 이벤트를 감지하고 그에 따라 우리는 어떻게 이벤트를 다뤄야 하는지에 대해 알아보았습니다.
위 내용은 어떤 프레임워크를 쓰느냐와 관계없이 기본적인 브라우저의 이벤트 감지 방식이기 때문에 알아두시면 유용하겠네요 :)

그럼 모두 즐겁게 코딩하세요!
