---
layout: article
title: "Vue.js 입문자가 흔히 저지르는 문법 실수 총정리"
date: 2018-12-09 17:25:32 +0900
categories: [web-development, vuejs]
excerpt: "콘솔에 출력된 에러 로그로 내 코드의 어디가 잘못되었는지 빠르게 알아보자!"
image:
  teaser: posts/web/vuejs/logo.png
  credit: Evan You
  creditlink: https://vuejs.org/
  #url to their site or licensing
locale: "ko_KR"
# 리플 옵션
comments: true
tags:
- 장기효
- 캡틴판교
- captain pangyo
- Vue.js 정복 캠프
- Vue.js 책
- do it! Vue.js 입문
- do it! vue.js
- vue.js 입문서
- vue.js 시작하기
- vue.js 튜토리얼
- vue 컴포넌트 재사용
- vue 컴포넌트 예제
- vue.js slot
- vue named slot
- vue slot
- vue.js 장점
- vue.js 예제
- vue.js 강좌
- vue.js 강의
- vue.js 입문
- vue.js 프론트엔드 개발자
- 패스트캠퍼스
- 인프런
---
{% include toc.html %}

## 들어가며

얼마 전에 오프라인 강의에서 수강생 분들이 작성한 Vue.js 코드를 고쳐주었습니다. 뷰 문법이 이미 익숙한 개발자라면 잘못된 코드가 바로 보이겠지만, 아무래도 처음 시작하시는 분들에게는 나의 코드가 대체 어디가 잘못 되었길래 이런 오류가 나는걸까? 하고 궁금해 하실 것 같아요.

그래서 준비했습니다. 에러 로그로 알아보는 나의 잘못된 코드!

Vue.js로 처음 개발을 시작하시는 분들이라면 아래의 로그들을 자주 보시게 될 것 같네요. 그 때 마다 꼭 제가 언급드리는 부분을 되짚어 보세요! :)

Enjoy your coding!

## 첫 번째 에러 케이스 - 콧수염 괄호를 사용할 때

첫 번째 에러 케이스를 살펴보기 위해 간단한 Vue.js 코드를 보겠습니다.

```html
<div id="app">
  {{ "{{ message" }} }}
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  }
});
```

위 코드는 message 속성의 값을 화면에 표시해주는 간단한 코드입니다. 위처럼 간단한 코드를 작성하다가 혹시 이런 에러 나신적 보신 적 있으신가요?

![뷰에 선언되지 않은 데이터를 화면에 표시하려고 했을 때의 오류]({{ site.url }}/images/posts/web/vuejs/error-cases/error1.png)

위 로그의 핵심은 바로 아래 문장입니다.

**Property or method "meassage" is not defined on the instance but referenced during render**

이 문장의 의미는 다음과 같습니다. "meassage라는 속성이 선언되지 않았는데 화면에 렌더링되려고 했습니다." 데이터 속성 안에 선언한 변수를 화면에서 잘못 입력한 경우죠. 아래와 같이 말입니다.

```html
<div id="app">
  {{ "{{ meassage" }} }} <!-- message가 아니라 meassage로 입력하셨네요 -->
</div>
```

```js
data: {
  message: 'Hello Vue.js!'
}
```

정리해서 위와 같은 로그가 발생했을 때는 `data`, `computed`, `methods` 속성과 HTML 태그의 콧수염 괄호 안에 선언한 변수 명이 같은지 확인해보세요!

## 두 번째 에러 케이스 - 컴포넌트를 등록할 때

두 번째 에러 케이스를 살펴보기 위해 아래와 같은 코드를 준비하였습니다.

```html
<div id="app">
  <app-header></app-header>
</div>
```

```js
var appHeader = {
  template: '<h1>header</h1>'
};

new Vue({
  el: '#app',
  components: {
    'app-header': appHeader
  }
});
```

위 코드는 뷰 컴포넌트를 등록하는 코드입니다. 컴포넌트를 등록하다가 아래와 같은 에러를 본 적 있으신가요?

![등록되지 않은 컴포넌트를 표시하려고 할 때의 오류]({{ site.url }}/images/posts/web/vuejs/error-cases/error2.png)

위 로그의 핵심은 아래 문장입니다.

**< app-haeder> - did you register the component correctly?**

"컴포넌트를 제대로 등록하셨나요?" 라는 오류 메시지입니다. 이 때는 등록한 컴포넌트의 이름을 올바르게 컴포넌트 태그에 옮겨 작성했는지 확인하시면 됩니다. 아래와 같이 `app-header`라고 등록해놓고 `app-haeder`라고 작성하시면 안돼요! :)

```html
<div id="app">
  <app-haeder></app-haeder> <!-- 여기 철자가 틀렸습니다 -->
</div>
```

```js
components: {
  'app-header': appHeader
}
```

## 세 번째 에러 케이스 - props 속성을 사용할 때

세 번째 에러 케이스를 위한 코드를 보겠습니다.

```html
<div id="app">
  <app-header v-bind:propsdata="num"></app-header>
</div>
```

```js
var appHeader = {
  props: ['propsdata'],
  template: '<h1>{{ "{{ propsdata" }} }}</h1>'
}

new Vue({
  el: '#app',
  data: {
    num: 100
  },
  components: {
    'app-header': appHeader
  }
});
```

위 코드는 컴포넌트를 하나 등록하고 props 속성을 하나 내려주는 코드입니다. props를 작성하시다가 아래와 같은 에러를 본 적이 있으신가요?

![컴포넌트 태그 쪽에 불필요한 인덴팅을 주어 나는 오류]({{ site.url }}/images/posts/web/vuejs/error-cases/error3.png)

에러 로그가 좀 더 구체적이면 좋겠지만.. 여기서는 경험에서 나오는 의견을 드릴 수 밖에 없겠네요. 위와 같은 로그는 대부분 아래와 같이 **컴포넌트 태그에 불필요한 띄어 쓰기(인덴팅)를 넣었을 때 발생**합니다.

```html
<app-header v-bind: propsdata = "num" ></app-header>
```

정리된 코드를 좋아해서 인덴팅을 여기 저기 넣으시는 분들이 있으실거에요. 자바스크립트 쪽에는 얼마든지 넣어주셔도 되지만 HTML 태그는 코드 간격을 띄었을 때 Vue.js 라이브러리에서 정상적으로 인식하지 못하는 일이 발생합니다. 따라서, HTML 태그 쪽에는 띄어 쓰기를 삼가주세요!

## 마무리

요즘 Vue.js로 서비스를 구축하는 곳들이 많아진 것 같습니다. 그만큼 더 많은 분들이 Vue.js를 시작하실 것 같은데요. 처음 배우실 때 오류 났다고 당황하지 마시고 조금 더 오류를 찬찬히 살펴보시길 추천드립니다. 그럼 더 재밌게 웹 개발하세요! :)

## 글보다 더 쉽게 배우는 온라인 강좌
좀 더 친절하고 상세한 설명을 원하신다면 아래 강좌를 이용해보시는 것도 좋을 것 같아요 😄

<figure class="third">
	<a href="https://www.inflearn.com/course/Age-of-Vuejs/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/age-of-vue.png"></a>
	<a href="https://www.inflearn.com/course/vue-pwa-vue-js-%EC%A4%91%EA%B8%89/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/vue-intermediate.png"></a>
	<a href="https://www.inflearn.com/course/vue-js/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/vue-advanced.jpg"></a>
	<figcaption>인프런 온라인 강좌 : Vue.js 시작하기, Vue.js 중급, Vue.js 완벽 가이드 (좌측 부터)</figcaption>
</figure>

## 밀착 지도를 받을 수 있는 오프라인 강의

강남역 패스트캠퍼스에서 2020년 1월부터 3월 초까지 두 달 동안 매주 토요일 Vue와 PWA를 제작하는 수업을 진행합니다. 관심 있으신 분들은 아래 이미지를 클릭해주세요 😄

<figure class="third">
	<a href="https://www.fastcampus.co.kr/dev_camp_wap/"><img src="{{ site.url }}/images/posts/web/fastcampus/wap.png"></a>
	<figcaption>패스트캠퍼스 Vue로 구현하는 PWA 캠프 (20.1.11 ~ 20.3.7)</figcaption>
</figure>