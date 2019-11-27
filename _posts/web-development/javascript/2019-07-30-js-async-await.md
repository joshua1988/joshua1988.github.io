---
layout: article
title: "자바스크립트 async와 await"
date: 2019-07-30 11:59:13 +0900
categories: [web-development, javascript]
excerpt: "(중급) 자바스크립트 개발자를 위한 async, await 사용법 설명. 쉽게 알아보는 자바스크립트 async await 개념, 사용법, 예제 코드, 예외 처리 방법"
image:
  teaser: posts/web/javascript/async-await.png
  credit: Hackernoon #name of the person or site you want to credit
  creditlink: https://hackernoon.com/javascript-async-await-the-good-part-pitfalls-and-how-to-use-9b759ca21cda
  #url to their site or licensing
locale: "ko"
# 리플 옵션
comments: true
tags:
- async await
- async await 예제
- async await 사용법
- vue async await
- 자바스크립트 async await
- javascript 비동기를 동기로
- 자바스크립트
- 자바스크립트 기초
- 자바스크립트 기초 예제
- 자바스크립트 기본
- 자바스크립트 강좌
- 자바스크립트 비동기
- 자바스크립트 비동기 처리
- 자바스크립트 비동기 프로그래밍
- 자바스크립트 비동기 함수
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

안녕하세요. 오랜만에 글을 올립니다. 작년에 Promise 글을 작성할 때까지만 해도 Async 편을 작성하는 데까지
이렇게 오랜 시간이 걸릴 거라고는 생각 못 했네요 :) 

기존 글에 많은 응원과 댓글 남겨주셔서 감사하게 받아보고 있습니다.
계속 글 구성만 고민하다가 이제서야 글을 작성합니다.

이번 글에서 살펴볼 내용은 자바스크립트의 비동기 처리 시리즈의 마지막 연재물 async & await 문법입니다.
처음 접하시는 분들이 최대한 이해하기 쉽게 코드와 글을 풀어서 작성했으니 재밌게 읽으셨으면 좋겠습니다 :)

그리고, 이번 글을 읽으시려면 꼭 [비동기 처리 및 콜백 함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)와 [Promise](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)에 대해 이해하고 계셔야 합니다. 만약 아직 개념을 이해하지 못하셨다면 글을 꼭 읽어보시고 오시는 걸 추천드립니다.

그럼 재밌게 읽으세요! :)

## async & await는 뭔가요?

async와 await는 자바스크립트의 비동기 처리 패턴 중 가장 최근에 나온 문법입니다.
기존의 비동기 처리 방식인 콜백 함수와 프로미스의 단점을 보완하고 
개발자가 읽기 좋은 코드를 작성할 수 있게 도와주죠.

## 개발자에게 읽기 좋은 코드란?

처음 프로그래밍을 배웠을 때 아래와 같이 변수와 조건문을 사용하셨던 기억이 있으시죠?

```js
var user = {
  id: 1,
  name: 'Josh'
};
if (user.id === 1) {
  console.log(user.name); // Josh
}
```

이 코드는 `user`라는 변수에 객체를 할당한 뒤 조건문으로 사용자의 아이디를 확인하고 콘솔에 사용자의 `name`을 찍는 간단한 코드입니다.

우리는 이렇게 위에서부터 아래로 한 줄 한 줄 차근히 읽으면서 사고하는 것이 편합니다.
그렇게 프로그래밍을 배웠으니까요.

## 그래서 읽기 좋은 코드와 async & await가 무슨 상관이죠?

조금 전에 읽고 이해한 방식대로 코드를 구성하는 것이 async, await 문법의 목적입니다.
다음 코드를 한번 볼까요?

```js
var user = fetchUser('domain.com/users/1');
if (user.id === 1) {
  console.log(user.name);
}
```

`fetchUser()`라는 메서드를 호출하면 앞에서 봤던 코드처럼 사용자 객체를 반환한다고 해보겠습니다.
그리고 여기서 `fetchUser()` 메서드가 서버에서 사용자 정보를 가져오는 HTTP 통신 코드라고 가정한다면
위 코드는 async & await 문법이 적용된 형태라고 보셔도 됩니다.

이게 대체 무슨 말인지 아래에서 함께 알아보겠습니다 :)

## async & await 맛보기

먼저 앞에서 살펴본 코드를 `logName()`이라는 간단한 함수로 감싸보겠습니다.

```js
function logName() {
  var user = fetchUser('domain.com/users/1');
  if (user.id === 1) {
    console.log(user.name);
  }
}
```

이제 위 함수를 실행하면 아까와 동일하게 코드가 동작할 겁니다.
자 그리고 여기서 아래와 같이 `async`와 `await`를 추가해주면

```js
async function logName() {
  var user = await fetchUser('domain.com/users/1');
  if (user.id === 1) {
    console.log(user.name);
  }
}
```

짜잔. 이게 바로 async await 코드입니다. 혹시 아직 이해가 정확히 안 가더라도 걱정 마세요. 지금부터 차근히 살펴볼게요! :)

## async & await 적용된 코드와 그렇지 않은 코드

자 저희가 조금 전에 본 코드가 대체 어떤 의미인지 한번 알아보겠습니다.
먼저 아까 살펴봤던 `logName()` 함수 코드를 다시 보겠습니다.

```js
function logName() {
  var user = fetchUser('domain.com/users/1');
  if (user.id === 1) {
    console.log(user.name);
  }
}
```

여기서 `fetchUser()`라고 하는 코드는 서버에서 데이터를 받아오는 HTTP 통신 코드라고 가정했습니다.
일반적으로 자바스크립트의 비동기 처리 코드는 아래와 같이 콜백을 사용해야지 코드의 실행 순서를 보장받을 수 있죠.

```js
function logName() {
  // 아래의 user 변수는 위의 코드와 비교하기 위해 일부러 남겨놓았습니다.
  var user = fetchUser('domain.com/users/1', function(user) {
    if (user.id === 1) {
      console.log(user.name);
    }
  });
}
```

이미 위와 같이 콜백으로 비동기 처리 코드를 작성하는 게 익숙하신 분들이라면 문제가 없겠지만,
이 사고방식에 익숙하지 않은 분들은 고개가 갸우뚱할 겁니다.

그래서 저희가 처음 프로그래밍을 배웠던 그때 그 사고로 돌아가는 것이죠.
아래와 같이 간단하게 생각하자구요.

```js
// 비동기 처리를 콜백으로 안해도 된다면..
function logName() {
  var user = fetchUser('domain.com/users/1');
  if (user.id === 1) {
    console.log(user.name);
  }
}
```

서버에서 사용자 데이터를 불러와서 변수에 담고, 사용자 아이디가 1이면 사용자 이름을 출력한다.

이렇게 하려면 async await만 붙이시면 됩니다 :)

```js
// async & await 적용 후
async function logName() {
  var user = await fetchUser('domain.com/users/1');
  if (user.id === 1) {
    console.log(user.name);
  }
}
```

※참고: 만약 위의 콜백 함수 코드가 와닿지 않는 분들은 [비동기 처리와 콜백 함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/) 글을 꼭 다시 읽어보시고 오세요.

## async & await 기본 문법

이제 async await의 기본 문법을 알아보겠습니다.

```js
async function 함수명() {
  await 비동기_처리_메서드_명();
}
```

먼저 함수의 앞에 `async` 라는 예약어를 붙입니다.
그러고 나서 함수의 내부 로직 중 HTTP 통신을 하는 비동기 처리 코드 앞에 `await`를 붙입니다.
여기서 주의하셔야 할 점은 비동기 처리 메서드가 꼭 프로미스 객체를 반환해야 `await`가 의도한 대로 동작합니다.

일반적으로 `await`의 대상이 되는 비동기 처리 코드는 [Axios](https://github.com/axios/axios) 등 프로미스를 반환하는 API 호출 함수입니다.

## async & await 간단한 예제

그럼 문법을 좀 더 정확하게 이해하기 위해서 간단한 async await 코드를 보겠습니다.

```js
function fetchItems() {
  return new Promise(function(resolve, reject) {
    var items = [1,2,3];
    resolve(items)
  });
}

async function logItems() {
  var resultItems = await fetchItems();
  console.log(resultItems); // [1,2,3]
}
```

먼저 `fetchItems()` 함수는 프로미스 객체를 반환하는 함수입니다. 프로미스는 "[자바스크립트 비동기 처리를 위한 객체](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/#promise%EA%B0%80-%EB%AD%94%EA%B0%80%EC%9A%94)"라고 배웠었죠. `fetchItems()` 함수를 실행하면 프로미스가 이행(Resolved)되며 결과 값은 `items` 배열이 됩니다.

그리고 이제 `logItems()` 함수를 보겠습니다. `logItems()` 함수를 실행하면 `fetchItems()` 함수의 결과 값인 `items` 배열이 `resultItems` 변수에 담깁니다. 따라서, 콘솔에는 `[1,2,3]`이 출력되죠.

`await`를 사용하지 않았다면 데이터를 받아온 시점에 콘솔을 출력할 수 있게 콜백 함수나 `.then()`등을 사용해야 했을 겁니다. 하지만 async await 문법 덕택에 비동기에 대한 사고를 하지 않아도 되는 것이죠.

※참고: 만약 위 코드가 왜 비동기 처리 코드인지 잘 이해가 안 가신다면 `fetchItems()`를 아래의 함수들로 바꿔서 실행해보셔도 괜찮습니다 :)

```js
// HTTP 통신 동작을 모방한 코드
function fetchItems() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      var items = [1,2,3];
      resolve(items)
    }, 3000);
  });
}

// jQuery ajax 코드
function fetchItems() {
  return new Promise(function(resolve, reject) {
    $.ajax('domain.com/items', function(response) {
      resolve(response);
    });
  });
}
```

## async & await 실용 예제

async & await 문법이 가장 빛을 발하는 순간은 여러 개의 비동기 처리 코드를 다룰 때입니다. 아래와 같이 각각 *사용자*와 *할 일 목록*을 받아오는 HTTP 통신 코드가 있다고 하겠습니다.

```js
function fetchUser() {
  var url = 'https://jsonplaceholder.typicode.com/users/1'
  return fetch(url).then(function(response) {
    return response.json();
  });
}

function fetchTodo() {
  var url = 'https://jsonplaceholder.typicode.com/todos/1';
  return fetch(url).then(function(response) {
    return response.json();
  });
}
```

위 함수들을 실행하면 각각 사용자 정보와 할 일 정보가 담긴 프로미스 객체가 반환됩니다.

자 이제 이 두 함수를 이용하여 할 일 제목을 출력해보겠습니다.
살펴볼 예제 코드의 로직은 아래와 같습니다.

1. `fetchUser()`를 이용하여 사용자 정보 호출
2. 받아온 사용자 아이디가 `1`이면 할 일 정보 호출
3. 받아온 할 일 정보의 제목을 콘솔에 출력

그럼 코드를 보겠습니다.

```js
async function logTodoTitle() {
  var user = await fetchUser();
  if (user.id === 1) {
    var todo = await fetchTodo();
    console.log(todo.title); // delectus aut autem
  }
}
```

`logTodoTitle()`를 실행하면 콘솔에 *delectus aut autem*가 출력될 것입니다.
위 비동기 처리 코드를 만약 콜백이나 프로미스로 했다면 훨씬 더 코드가 길어졌을 것이고 인덴팅 뿐만 아니라 가독성도 좋지 않았을 겁니다.
이처럼 async await 문법을 이용하면 기존의 비동기 처리 코드 방식으로 사고하지 않아도 되는 장점이 생깁니다.

※참고: 위 함수에서 사용한 `fetch()` API는 크롬과 같은 최신 브라우저에서만 동작합니다. 브라우저 지원 여부는 다음 링크로 확인해보세요. [fetch API 브라우저 지원표](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## async & await 예외 처리

async & await에서 예외를 처리하는 방법은 바로 [try catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)입니다. 프로미스에서 에러 처리를 위해 `.catch()`를 사용했던 것처럼 async에서는 `catch {}` 를 사용하시면 됩니다.

조금 전 코드에 바로 `try catch` 문법을 적용해보겠습니다.

```js
async function logTodoTitle() {
  try {
    var user = await fetchUser();
    if (user.id === 1) {
      var todo = await fetchTodo();
      console.log(todo.title); // delectus aut autem
    }
  } catch (error) {
    console.log(error);
  }
}
```

위의 코드를 실행하다가 발생한 네트워크 통신 오류뿐만 아니라 간단한 타입 오류 등의 일반적인 오류까지도 `catch`로 잡아낼 수 있습니다. 발견된 에러는 `error` 객체에 담기기 때문에 에러의 유형에 맞게 에러 코드를 처리해주시면 됩니다.

## 마무리

여태까지 살펴본 내용으로 감을 좀 잡으셨나요? 늘 처음 보는 문법은 완전하게 이해하는데 시간이 필요합니다.
실제로 서비스를 만드실 때 위 내용을 적용해보시면 더 쉽게 체득하실 수 있을거에요.

앞으로 더 프런트엔드의 이벤트와 데이터 처리가 많아질 것이기 때문에 async await에 대해서 정확히 알아놓으시면 도움이 많이 되실 겁니다.
그럼 재밌게 코딩하세요! 감사합니다 😄

<!-- ## async & await 레이스 컨디션

## async & await 내부 구조 -->

#### 다른 시리즈물 확인하기

- [1탄 - 자바스크립트 비동기 처리와 콜백 함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)
- [2탄 - 자바스크립트 Promise 쉽게 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)

## 글보다 더 쉽게 배우는 온라인 강좌

좀 더 친절하고 상세한 설명을 원하신다면 아래 강좌를 이용해보시는 것도 좋을 것 같아요 :)

<figure class="third">
	<a href="https://www.inflearn.com/course/Age-of-Vuejs/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/inflearn/age-of-vue.png"></a>
	<a href="https://www.inflearn.com/course/vue-pwa-vue-js-%EC%A4%91%EA%B8%89/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/inflearn/vue-intermediate.png"></a>
	<a href="https://www.inflearn.com/course/vue-js/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/inflearn/vue-advanced.jpg"></a>
	<figcaption>인프런 온라인 강좌 : Vue.js 시작하기, Vue.js 중급, Vue.js 완벽 가이드 (좌측 부터)</figcaption>
</figure>

## 밀착 지도를 받을 수 있는 오프라인 강의

강남역 패스트캠퍼스에서 2020년 1월부터 3월 초까지 두 달 동안 매주 토요일 Vue와 PWA를 제작하는 수업을 진행합니다. 관심 있으신 분들은 아래 이미지를 클릭해주세요 😄

<figure class="third">
	<a href="https://www.fastcampus.co.kr/dev_camp_wap/"><img src="{{ site.url }}/images/posts/web/fastcampus/wap.png"></a>
	<figcaption>패스트캠퍼스 Vue로 구현하는 PWA 캠프 (20.1.11 ~ 20.3.7)</figcaption>
</figure>