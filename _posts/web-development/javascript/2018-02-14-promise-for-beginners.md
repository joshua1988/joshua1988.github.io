---
layout: article
title: "자바스크립트 Promise 쉽게 이해하기"
date: 2018-02-14 11:54:13 +0900
categories: [web-development, javascript]
excerpt: "(중급) 자바스크립트 입문자를 위한 Promise 설명. 쉽게 알아보는 자바스크립트 Promise 개념, 사용법, 예제 코드. 예제로 알아보는 then(), catch() 활용법"
image:
  teaser: posts/web/javascript/promise.png
  credit: Dominik Kundel #name of the person or site you want to credit
  creditlink: https://www.twilio.com/blog/2016/10/guide-to-javascript-promises.html
  #url to their site or licensing
locale: "ko"
# 리플 옵션
comments: true
tags:
- 자바스크립트 프로미스
- 자바스크립트 프라미스
- 자바스크립트 promise
- 자바스크립트 promise 예제
- 자바스크립트 promise then
- 자바스크립트 프로미스 then
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

## Promise가 뭔가요?
**"A promise is an object that may produce a single value some time in the future"**

프로미스는 자바스크립트 비동기 처리에 사용되는 객체입니다.
여기서 자바스크립트의 비동기 처리란 '특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행하는 자바스크립트의 특성'을 의미합니다.
비동기 처리에 대한 이해가 없으시다면 [이전 글 '자바스크립트 비동기 처리와 콜백 함수'](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)를 읽어보시길 추천드립니다 :)

## Promise가 왜 필요한가요?
프로미스는 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용합니다. 일반적으로 웹 애플리케이션을 구현할 때 서버에서 데이터를 요청하고 받아오기 위해 아래와 같은 API를 사용합니다.

```js
$.get('url 주소/products/1', function (response) {
  // ...
});
```

위 API가 실행되면 서버에다가 '데이터 하나 보내주세요' 라는 요청을 보내죠.
그런데 여기서 데이터를 받아오기도 전에 마치 데이터를 다 받아온 것 마냥 화면에 데이터를 표시하려고 하면 오류가 발생하거나 빈 화면이 뜹니다.
이와 같은 문제점을 해결하기 위한 방법 중 하나가 프로미스입니다.

## 프로미스 코드 - 기초
그럼 프로미스가 어떻게 동작하는지 이해하기 위해 예제 코드를 살펴보겠습니다.
먼저 아래 코드는 간단한 ajax 통신 코드입니다.

```js
function getData(callbackFunc) {
  $.get('url 주소/products/1', function (response) {
    callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
  });
}

getData(function (tableData) {
  console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
});
```

위 코드는 제이쿼리의 ajax 통신을 이용하여 지정한 url에서 1번 상품 데이터를 받아오는 코드입니다.
비동기 처리를 위해 프로미스 대신에 콜백 함수를 이용했죠.

위 코드에 프로미스를 적용하면 아래와 같은 코드가 됩니다.

```js
function getData(callback) {
  // new Promise() 추가
  return new Promise(function (resolve, reject) {
    $.get('url 주소/products/1', function (response) {
      // 데이터를 받으면 resolve() 호출
      resolve(response);
    });
  });
}

// getData()의 실행이 끝나면 호출되는 then()
getData().then(function (tableData) {
  // resolve()의 결과 값이 여기로 전달됨
  console.log(tableData); // $.get()의 reponse 값이 tableData에 전달됨
});
```

콜백 함수로 처리하던 구조에서 `new Promise()`, `resolve()`, `then()`와 같은 프로미스 API를 사용한 구조로 바뀌었습니다.
여기서 `new Promise()`는 좀 이해가 가겠는데 `resolve()`, `then()`은 뭐 하는 애들일까요? 아래에서 함께 알아보겠습니다.

## 프로미스의 3가지 상태(states)
프로미스를 사용할 때 알아야 하는 가장 기본적인 개념이 바로 프로미스의 상태(states)입니다.
여기서 말하는 상태란 프로미스의 처리 과정을 의미합니다. `new Promise()`로 프로미스를 생성하고 종료될 때까지 3가지 상태를 갖습니다.
- Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
- Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
- Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태

#### Pending(대기)
먼저 아래와 같이 `new Promise()` 메서드를 호출하면 Pending(대기) 상태가 됩니다.

```js
new Promise();
```

이렇게 `new Promise()` 메서드를 호출할 때 콜백 함수의 인자로 resolve, reject에 접근할 수 있습니다.

```js
new Promise(function (resolve, reject) {
  // ...
});
```

#### Fulfilled(이행)
여기서 콜백 함수의 인자 resolve를 아래와 같이 실행하면 Fulfilled(이행) 상태가 됩니다.

```js
new Promise(function (resolve, reject) {
  resolve();
});
```

그리고 이행 상태가 되면 아래와 같이 `then()`을 이용하여 처리 결과 값을 받을 수 있습니다.

```js
function getData() {
  return new Promise(function (resolve, reject) {
    var data = 100;
    resolve(data);
  });
}

// resolve()의 결과 값 data를 resolvedData로 받음
getData().then(function (resolvedData) {
  console.log(resolvedData); // 100
});
```

<p class="notice">프로미스의 '이행' 상태를 좀 다르게 표현해보면 '완료' 입니다.</p>


#### Rejected(실패)
`new Promise()`로 프로미스 객체를 생성하면 콜백 함수 인자로 resolve와 reject를 사용할 수 있다고 했습니다.
여기서 reject 인자로 reject() 메서드를 실행하면 Rejected(실패) 상태가 됩니다.

```js
new Promise(function (resolve, reject) {
  reject();
});
```

그리고, 실패 상태가 되면 실패한 이유(실패 처리의 결과 값)를 `catch()`로 받을 수 있습니다.

```js
function getData() {
  return new Promise(function (resolve, reject) {
    reject(new Error("Request is failed"));
  });
}

// reject()의 결과 값 Error를 err에 받음
getData().then().catch(function (err) {
  console.log(err); // Error: Request is failed
});
```

<figure>
	<img src="{{ site.url }}/images/posts/web/javascript/promise.svg">
	<figcaption>프로미스 처리 흐름 - 출처 : MDN</figcaption>
</figure>

## 프로미스 코드 - 쉬운 예제
그럼 위에서 배운 내용들을 종합하여 간단한 프로미스 코드를 만들어보겠습니다.
이해하기 쉽게 앞에서 살펴본 ajax 통신 예제 코드에 프로미스를 적용해보겠습니다.

```js
function getData() {
  return new Promise(function (resolve, reject) {
    $.get('url 주소/products/1', function (response) {
      if (response) {
        resolve(response);
      }
      reject(new Error("Request is failed"));
    });
  });
}

// Fulfilled 또는 Rejected의 결과 값 출력
getData().then(function (data) {
  console.log(data); // response 값 출력
}).catch(function (err) {
  console.error(err); // Error 출력
});
```

위 코드는 서버에서 제대로 응답을 받아오면 resolve() 메서드를 호출하고, 응답이 없으면 reject() 메서드를 호출하는 예제입니다.
호출된 메서드에 따라 then()이나 catch()로 분기하여 데이터 또는 오류를 출력합니다.

## 여러 개의 프로미스 연결하기 (Promise Chaining)
프로미스의 또 다른 특징은 여러 개의 프로미스를 연결하여 사용할 수 있다는 점입니다.
앞 예제에서 then() 메서드를 호출하고 나면 새로운 프로미스 객체가 반환됩니다.
따라서, 아래와 같이 코딩이 가능합니다.

```js
function getData() {
  return new Promise({
    // ...
  });
}

// then() 으로 여러 개의 프로미스를 연결한 형식
getData()
  .then(function (data) {
    // ...
  })
  .then(function () {
    // ...
  })
  .then(function () {
    // ...
  });
```

그러면 위의 형식을 참고하여 실제로 돌려볼 수 있는 예제를 살펴보겠습니다.
비동기 처리 예제에서 가장 흔하게 사용되는 [setTimeout() API](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)를 사용하였습니다.

```js
new Promise(function(resolve, reject){
  setTimeout(function() {
    resolve(1);
  }, 2000);
})
.then(function(result) {
  console.log(result); // 1
  return result + 10;
})
.then(function(result) {
  console.log(result); // 11
  return result + 20;
})
.then(function(result) {
  console.log(result); // 31
});
```

위 코드는 프로미스 객체를 하나 생성하고 `setTimeout()`을 이용해 2초 후에 `resolve()`를
호출하는 예제입니다.

`resolve()`가 호출되면 프로미스가 대기 상태에서 이행 상태로 넘어가기 때문에
첫 번째 `.then()`의 로직으로 넘어갑니다. 첫 번째 `.then()`에서는 이행된 결과 값 1을 받아서 10을 더한 후 그다음 `.then()` 으로 넘겨줍니다.
두 번째 `.then()`에서도 마찬가지로 바로 이전 프로미스의 결과 값 11을 받아서 20을 더하고 다음 `.then()`으로 넘겨줍니다.
마지막 `.then()`에서 최종 결과 값 31을 출력합니다.

## 실무에서 있을 법한 프로미스 연결 사례
실제 웹 서비스에서 있을 법한 사용자 로그인 인증 로직에 프로미스를 여러 개 연결해보겠습니다.

```js
getData(userInfo)
  .then(parseValue)
  .then(auth)
  .then(diaplay);
```

위 코드는 페이지에 입력된 사용자 정보를 받아와 파싱, 인증 등의 작업을 거치는 코드를 나타내었습니다.
여기서 `userInfo`는 사용자 정보가 담긴 객체를 의미하고, `parseValue`, `auth`, `display`는 각각 프로미스를 반환해주는 함수라고 가정했습니다.
아래와 같이 말이죠.

```js
var userInfo = {
  id: 'test@abc.com',
  pw: '****'
};

function parseValue() {
  return new Promise({
    // ...
  });
}
function auth() {
  return new Promise({
    // ...
  });
}
function display() {
  return new Promise({
    // ...
  });
}
```

이처럼 여러 개의 프로미스를 `.then()`으로 연결하여 처리할 수 있습니다.

## 프로미스의 에러 처리 방법
앞에서 살펴본 프로미스 예제는 코드가 항상 정상적으로 동작한다고 가정하고 구현한 예제입니다.
실제 서비스를 구현하다 보면 네트워크 연결, 상태 코드 문제 등으로 인해 오류가 발생할 수 있습니다.
따라서, 프로미스의 에러 처리 방법에 대해서도 알고 있어야 합니다.

에러 처리 방법에는 다음과 같이 2가지 방법이 있습니다. <br><br>
1.then()의 두 번째 인자로 에러를 처리하는 방법

```js
getData().then(
  handleSuccess,
  handleError
);
```

2.catch()를 이용하는 방법

```js
getData().then().catch();
```

위 2가지 방법 모두 프로미스의 reject() 메서드가 호출되어 실패 상태가 된 경우에 실행됩니다.
간단하게 말해서 프로미스의 로직이 정상적으로 돌아가지 않는 경우 호출되는 거죠. 아래와 같이 말입니다.

```js
function getData() {
  return new Promise(function (resolve, reject) {
    reject('failed');
  });
}

// 1. then()으로 에러를 처리하는 코드
getData().then(function () {
  // ...
}, function (err) {
  console.log(err);
});

// 2. catch()로 에러를 처리하는 코드
getData().then().catch(function (err) {
  console.log(err);
});
```

## 프로미스 에러 처리는 가급적 catch()로
앞에서 프로미스 에러 처리 방법 2가지를 살펴봤습니다.
개개인의 코딩 스타일에 따라서 then()의 두 번째 인자로 처리할 수도 있고
catch()로 처리할 수도 있겠지만 가급적 catch()로 에러를 처리하는 게 더 효율적입니다.

그 이유는 아래의 코드를 보시면 알 수 있습니다.

```js
// then()의 두 번째 인자로는 감지하지 못하는 오류
function getData() {
  return new Promise(function (resolve, reject) {
    resolve('hi');
  });
}

getData().then(function (result) {
  console.log(result);
  throw new Error("Error in then()"); // Uncaught (in promise) Error: Error in then()
}, function (err) {
  console.log('then error : ', err);
});
```

getData() 함수의 프로미스에서 resolve() 메서드를 호출하여 정상적으로 로직을 처리했지만,
then()의 첫 번째 콜백 함수 내부에서 오류가 나는 경우 오류를 제대로 잡아내지 못합니다.
따라서 코드를 실행하면 아래와 같은 오류가 납니다.

<figure>
	<img src="{{ site.url }}/images/posts/web/javascript/then-not-handling-error.png">
	<figcaption>'에러를 잡지 못했습니다(Uncaught Error)' 로그</figcaption>
</figure>

하지만 똑같은 오류를 catch()로 처리하면 다른 결과가 나옵니다.

```js
// catch()로 오류를 감지하는 코드
function getData() {
  return new Promise(function (resolve, reject) {
    resolve('hi');
  });
}

getData().then(function (result) {
  console.log(result); // hi
  throw new Error("Error in then()");
}).catch(function (err) {
  console.log('then error : ', err); // then error :  Error: Error in then()
});
```

위 코드의 처리 결과는 다음과 같습니다.

<figure>
	<img src="{{ site.url }}/images/posts/web/javascript/catch-handling-error.png">
	<figcaption>발생한 에러를 성공적으로 콘솔에 출력한 모습</figcaption>
</figure>

**따라서, 더 많은 예외 처리 상황을 위해 프로미스의 끝에 가급적 catch()를 붙이시기 바랍니다.**

## 마무리
여태까지 살펴본 설명과 예제로 프로미스의 동작에 대해 감을 좀 잡으셨나요?
현대 웹 앱의 특성상 앞으로도 프로미스는 더 많이 사용될 것 같습니다.
숙련된 웹 개발자가 되기 위해 위 개념과 사용법을 꼭 숙지하시기 바랍니다 :)

다음에 연재할 시리즈물 마지막 편은 ES6의 async입니다. 그럼 금방 또 찾아뵙겠습니다.
감사합니다.

#### 다른 시리즈물 확인하기

- [1탄 - 자바스크립트 비동기 처리와 콜백 함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)
- [3탄 - 자바스크립트 async와 await](https://joshua1988.github.io/web-development/javascript/js-async-await/)

#### 참고

- [MDN Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Master the JS interview: Promise](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)
- [Promise/A+ Spec](https://github.com/promises-aplus/promises-spec)

## 글보다 더 쉽게 배우는 온라인 강좌

좀 더 친절하고 상세한 설명을 원하신다면 아래 강좌를 이용해보시는 것도 좋을 것 같아요 😄

<figure class="third">
	<a href="https://www.inflearn.com/course/Age-of-Vuejs/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/lv1.png"></a>
	<a href="https://www.inflearn.com/course/vue-pwa-vue-js-%EC%A4%91%EA%B8%89/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/lv2.png"></a>
	<a href="https://www.inflearn.com/course/vue-js/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/lv3.png"></a>
	<figcaption>인프런 온라인 강의 : Vue.js 시작하기, Vue.js 중급, Vue.js 완벽 가이드</figcaption>
</figure>

<figure class="third">
	<a href="https://www.inflearn.com/course/vue-js-%EB%81%9D%EB%82%B4%EA%B8%B0-%EC%BA%A1%ED%8B%B4%ED%8C%90%EA%B5%90?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/lv4.png"></a>
	<a href="https://www.inflearn.com/course/webpack-%EC%9B%B9%ED%8C%A9-%EA%B0%95%EC%A2%8C?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/webpack.png"></a>
	<a href="https://www.inflearn.com/course/pwa?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/pwa.jpg"></a>
	<figcaption>인프런 온라인 강의 : Vue.js 끝장내기, 쉽게 배우는 Webpack, PWA 시작하기</figcaption>
</figure>

## 밀착 지도를 받을 수 있는 오프라인 강의

강남역 패스트캠퍼스에서 2020년 2월부터 4월 초까지 두 달 동안 매주 월요일 수요일에 Vue.js 집중반 수업을 진행합니다. 관심 있으신 분들은 아래 이미지를 클릭해주세요 😄

<figure class="third">
	<a href="https://www.fastcampus.co.kr/dev_camp_vue/" target="_blank"><img src="{{ site.url }}/images/posts/web/fastcampus/vue.png"></a>
	<figcaption>패스트캠퍼스 Vue.js 정복 캠프(20.2.24 ~ 20.4.1)</figcaption>
</figure>