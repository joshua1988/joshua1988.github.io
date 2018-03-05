---
layout: article
title: "(중급) Vue.js 라우터 네비게이션 가드 알아보기"
date: 2018-03-05 20:59:32 +0900
categories: [web-development, vuejs]
excerpt: "뷰 라우터를 사용할 때 알아두면 좋은 네비게이션 가드 설명. 특정 페이지로 넘어가기 전에 검증 로직 추가하기"
image:
  teaser: posts/web/vuejs/logo.png
  credit: Evan You
  creditlink: https://vuejs.org/
  #url to their site or licensing
locale: "ko_KR"
# 리플 옵션
comments: true
tags:
- vue router
- vue router navigation guard
- vue router 네비게이션 가드
- 네비게이션 가드
- 네비게이션 가드 예제
- 뷰 네비게이션 가드 설명
- do it! Vue.js 입문
- do it! vue.js
- do it! vuejs
- 두잇 vue.js 입문
- 두잇 vuejs 입문
- 두잇 vue.js
- 두잇 vuejs
- 이지스 퍼블리싱
- vue.js 입문서
- vue.js 시작하기
- vuejs 시작하기
- vue.js 튜토리얼
- vuejs 튜토리얼
- vue.js 장점
- vue.js 강좌
- vue.js 예제
- vue.js 강의
- vuejs란
- vue.js
- vuejs
- 시작하기
- 튜토리얼
- vue.js 입문
- vue.js 프론트엔드 개발자
- 패스트캠퍼스
- Vue로 구현하는 PWA 캠프
- 인프런
- 누구나 다루기 쉬운 Vue.js
- 캡틴판교
- captain pangyo
---
{% include toc.html %}

## 네비게이션 가드란?
네비게이션 가드(navigation guard)란 뷰 라우터로 특정 URL에 접근할 때 해당 URL의 접근을 막는 방법을 말합니다.
예를 들어, 사용자의 인증 정보가 없으면 특정 페이지에 접근하지 못하게 할 때 사용하는 기술입니다.

## 네비게이션 가드의 종류
네비게이션 가드의 종류는 아래와 같이 3가지가 있습니다.
- 애플리케이션 전역에서 동작하는 **전역 가드**
- 특정 URL에서만 동작하는 **라우터 가드**
- 라우터 컴포넌트 안에 정의하는 **컴포넌트 가드**

## 전역 가드
전역 가드는 라우터 인스턴스를 참조하는 객체로 설정할 수 있습니다.
그러면 전역 가드 설정 방법을 알아보겠습니다.

먼저, 전역 가드 설정을 위해 먼저 아래와 같이 라우터 인스턴스를 생성합니다.

```js
var router = new VueRouter();
```

다음으로 `router` 변수에 아래와 같이 `.beforeEach()` API를 호출합니다.

```js
router.beforeEach(function (to, from, next) {
  // to : 이동할 url
  // from : 현재 url
  // next : to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
});
```

여기서 `beforeEach()`를 호출하면 다음과 같이 3개의 인자를 받습니다.
- to : 이동할 url 정보가 담긴 라우터 객체
- from : 현재 url 정보가 담긴 라우터 객체
- next : to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수

`router.beforeEach()`를 호출하고 나면 모든 라우팅이 대기 상태가 됩니다.
원래 url이 변경되고 나면 해당 url에 따라 화면이 자연스럽게 전환되어야 하는데
전역 가드를 설정했기 때문에 화면이 전환되지 않습니다. 여기서 해당 url로 라우팅 하기 위해서는 next()를 호출해줘야 합니다.
next()가 호출되기 전까지 화면이 전환되지 않습니다.

## 전역 가드 동작 예제
앞에서 설명한 전역 가드의 동작 방식을 이해하기 위해 아래와 같은 라우터 코드를 준비하였습니다.

```js
// 라우터 컴포넌트
var Login = { template: '<p>Login Component</p>' };
var Home = { template: '<p>Home Component</p>' };

// 라우팅 정보
var router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
});
```

[전체 실행 코드 확인 - jsfiddle](https://jsfiddle.net/Captain_Pangyo/28gcwnxc/)

위 코드의 실행 결과는 아래와 같습니다.

<figure>
	<img src="{{ site.url }}/images/posts/web/vuejs/nav-guards/router-sample.gif">
	<figcaption>뷰 기본 라우터 예제</figcaption>
</figure>

여기서 전역 가드를 설정하는 코드를 아래와 같이 추가합니다.

```js
router.beforeEach(function (to, from, next) {
  console.log('every single routing is pending');
});
```

이제 '/login'이나 '/home'으로 이동하더라도 라우팅이 되지 않고 아래와 같이 로그만 출력됩니다.

<figure>
	<img src="{{ site.url }}/images/posts/web/vuejs/nav-guards/navigation guard.gif">
  <figcaption>전역 가드 설정 때문에 페이지는 이동하지 않고 대신 로그만 출력하는 화면</figcaption>
</figure>

만약 원하는 url로 이동하고 싶으면 아래와 같이 `next()`를 호출하면 됩니다.

```js
router.beforeEach(function (to, from, next) {
  next();
});
```

## 전역 가드로 페이지 인증하기
전역 가드를 실제 애플리케이션 로직에 어떻게 적용할 수 있는지 살펴보겠습니다.
앞에서 살펴본 예제의 Login 컴포넌트에 다음과 같이 meta 정보를 추가하였습니다.

```js
var router = new VueRouter({
  routes: [
    // meta 정보에 authRequired라는 Boolean 값 추가
    { path: '/login', component: Login, meta: {authRequired: true} },
    { path: '/home', component: Home }
  ]
});
```

그리고 `beforeEach()`의 콜백 함수에 사용자 인증 여부를 체크하는 로직을 추가합니다.

```js
router.beforeEach(function (to, from, next) {
  // to: 이동할 url에 해당하는 라우팅 객체
  if (to.matched.some(function(routeInfo) {
    return routeInfo.meta.authRequired;
  })) {
    // 이동할 페이지에 인증 정보가 필요하면 경고 창을 띄우고 페이지 전환은 하지 않음
    alert('Login Please!');
  } else {
    console.log("routing success : '" + to.path + "'");
    next(); // 페이지 전환
  };
});
```

위 코드는 이동하려는 페이지에 만약 인증 정보가 필요하면 경고 창을 띄우고 화면은 전환하지 않는 코드입니다.
뷰 라우터 인스턴스에서 '/login'에 해당하는 라우터 객체에만 `authRequired` 값을 설정해놨기 때문에
'/home' 페이지로 이동할 때는 `next()`로 페이지를 이상 없이 전환합니다. 위 코드를 실행한 결과는 아래와 같습니다.

<figure>
	<img src="{{ site.url }}/images/posts/web/vuejs/nav-guards/nav-guard-auth.gif">
	<figcaption>인증 값이 필요한 페이지는 라우팅을 막는 화면</figcaption>
</figure>

<p class="notice">위 예제에서 사용한 .some()은 자바스크립트 내장 API입니다. 지정된 배열의 모든 요소를 검사하여 조건을 만족시키면 true 값을 반환하고, 아니면 false 값을 반환합니다.</p>

## 라우터 가드와 컴포넌트 가드
앞에서 살펴본 전역 가드와 마찬가지로 라우터 가드와 컴포넌트 가드도 같은 원리로 동작합니다.
다만 URL 이동을 막기 위해 사용하는 API만 조금 다릅니다.

#### 라우터 가드
전체 라우팅이 아니라 특정 라우팅에 대해서 가드를 설정하는 방법은 아래와 같습니다.

```js
var router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login,
      beforeEnter: function(to, from, next) {
        // 인증 값 검증 로직 추가
      }
    }
  ]
})
```

#### 컴포넌트 가드
라우터로 지정된 특정 컴포넌트에 가드를 설정하는 방법은 다음과 같습니다.

```js
const Login = {
  template: '<p>Login Component</p>',
  beforeRouteEnter (to, from, next) {
    // Login 컴포넌트가 화면에 표시되기 전에 수행될 로직
    // Login 컴포넌트는 아직 생성되지 않은 시점
  },
  beforeRouteUpdate (to, from, next) {
    // 화면에 표시된 컴포넌트가 변경될 때 수행될 로직
    // `this`로 Login 컴포넌트를 접근할 수 있음
  },
  beforeRouteLeave (to, from, next) {
    // Login 컴포넌트를 화면에 표시한 url 값이 변경되기 직전의 로직
    // `this`로 Login 컴포넌트를 접근할 수 있음
  }
}
```
