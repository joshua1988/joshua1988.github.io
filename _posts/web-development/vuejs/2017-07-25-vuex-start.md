---
layout: article
title: "Vuex 시작하기 1 - Vuex와 State"
date: 2017-07-25 19:28:32 +0900
categories: [web-development, vuejs]
excerpt: "Vue 중급으로 레벨업 하기. 상태 관리란 무엇인가? Vuex를 이용한 상태 관리. state 소개"
image:
  teaser: posts/web/vuejs/logo.png
  credit: Evan You
  creditlink: https://vuejs.org/
  #url to their site or licensing
locale: "ko_KR"
# 리플 옵션
comments: true
tags:
  - 상태 관리란
  - 상태 관리 패턴
  - vue 상태 관리
  - 상태 관리 라이브러리
  - vuex 상태 관리
  - vue store
  - vue store란
  - vue 컴포넌트 통신
  - vue.js 강좌
  - vue.js 한글
  - vue.js 시작
  - vuejs
  - vue.js
  - Vue JS
  - vuex
  - vuex 예제
  - vuex 사용
  - vuex 사용법
  - vuex 설치
  - vuex 구조
  - vuex 패턴
  - vuex 튜토리얼
  - vuex example
  - vuex 시작하기
  - vue vuex
  - vue vuex 시작하기
  - vuex 한글
  - vuex 소개
  - vuex 튜토리얼
  - vuex 입문
  - vue 강의
  - vuex 강의
  - vuejs 강의
  - vue.js 강의
  - vuejs 강좌
  - vue.js 강좌
  - vue 배우기
  - 뷰엑스
  - 뷰엑스 예제
  - 뷰엑스 시작하기
  - 패스트캠퍼스
  - 패스트캠퍼스 프론트엔드 웹앱 캠프
  - 인프런
  - 인프런 vuejs
  - 인프런 뷰
  - fastcampus
---

{% include toc.html %}

## 들어가며

이 글은 Vue.js의 컴포넌트와 컴포넌트 통신 방법을 알고 계신 분들이 읽기 좋습니다.
Vue.js를 잘 모르시거나 이제 막 시작하시는 분들은 [Vue 입문 가이드](https://joshua1988.github.io/web-development/vuejs/vuejs-tutorial-for-beginner/)를 먼저 읽어보시고 오세요 :)

## Vuex란?

Vue.js의 **상태 관리**를 위한 패턴이자 라이브러리입니다. 다른 상태 관리 패턴이나 라이브러리와 비교했을 때 뷰의 반응성(Reactivity) 체계를 효율적으로 활용하여 화면을 업데이트 한다는 차이점이 있습니다.

## 상태 관리(State Management)가 왜 필요한가?

컴포넌트 기반 프레임워크에서는 작은 단위로 쪼개진 여러 개의 컴포넌트로 화면을 구성합니다. 예를 들면, header, button, list 등의 화면 요소가 각각 컴포넌트로 구성되어 한 화면에서 많은 컴포넌트를 사용합니다. 이에 따라 **컴포넌트 간의 통신이나 데이터 전달을 좀 더 유기적으로 관리할 필요성이 생깁니다.**

## 상태 관리란?

상태 관리란 여러 컴포넌트 간의 데이터 전달과 이벤트 통신을 한곳에서 관리하는 패턴을 의미합니다. 뷰와 성격이 비슷한 프레임워크인 리액트(React)에서는 Redux, Mobx와 같은 상태 관리 라이브러리를 사용하고 있고 뷰에서는 Vuex라는 상태 관리 라이브러리를 사용합니다.

## 상태 관리로 해결할 수 있는 문제점?

상태 관리는 중대형 규모의 웹 애플리케이션에서 컴포넌트 간에 데이터를 더 효율적으로 전달할 수 있습니다. 일반적으로 앱의 규모가 커지면서 생기는 문제점들은 다음과 같습니다.

1. 뷰의 컴포넌트 통신 방식인 props, event emit 때문에 **중간에 거쳐할 컴포넌트가 많아지거나**
2. 이를 피하기 위해 Event Bus를 사용하여 **컴포넌트 간 데이터 흐름을 파악하기 어려운 것**

이러한 문제점을 해결하기 위해 모든 데이터 통신을 한 곳에서 중앙 집중식으로 관리하는 것이 상태 관리입니다.

<figure>
	<img src="{{ site.url }}/images/posts/web/vuejs/vuex-1/vuex-diagram.png">
	<figcaption>Vuex 전체 흐름도</figcaption>
</figure>

## 상태 관리 패턴

상태 관리 구성요소는 크게 3가지가 있습니다.

- **state** : 컴포넌트 간에 공유할 **data**
- **view** : 데이터가 표현될 **template**
- **actions** : 사용자의 입력에 따라 반응할 **methods**

```js
new Vue({
  // state
  data() {
    return {
      counter: 0
    };
  },
  // view
  template: `
    <div>{{ "{{ counter" }} }}</div>
  `,
  // actions
  methods: {
    increment() {
      this.counter++;
    }
  }
});
```

위 구성요소는 아래와 같은 흐름으로 동작합니다.

<figure>
	<img src="{{ site.url }}/images/posts/web/vuejs/vuex-1/vuex-state-one-way-data-flow.png">
	<figcaption>단방향 흐름 처리를 나타낸 그림</figcaption>
</figure>

## Vuex 튜토리얼 #1 - 간단한 Vue App 구성

뷰엑스를 알아보기 위해 버튼으로 숫자를 늘리고 줄일 수 있는 카운터 앱을 만들어보겠습니다.
Vue CLI로 프로젝트를 생성한 다음 아래와 같이 Parent, Child 컴포넌트를 제작합니다.

<figure class="half">
	<img src="{{ site.url }}/images/posts/web/vuejs/vuex-1/demo-ui.png">
	<figcaption>Parent 컴포넌트와 Child 컴포넌트가 표시된 화면</figcaption>
</figure>

<!-- ![vuex-app-ui]({{ site.url }}/images/posts/web/vuejs/vuex-1/demo-ui.png) -->

컴포넌트 폴더구조는 아래와 같습니다.

![folder-structure]({{ site.url }}/images/posts/web/vuejs/vuex-1/folder-structure.png)

- `App.vue` : 상위 컴포넌트 또는 Parent
- `Child.vue` : 하위 컴포넌트 또는 Child

이 앱의 특징은 다음과 같습니다.

- 위 앱은 `+` 버튼을 클릭하면 카운터가 올라가고 `-` 버튼을 클릭하면 카운터가 감소됩니다.
- [Parent 컴포넌트 - Child 컴포넌트 간에 데이터를 전달할 때 props 속성을 사용한다.](https://joshua1988.github.io/web-development/vuejs/vuejs-tutorial-for-beginner/#vue-components)
- 따라서, 상위 컴포넌트(Parent)와 하위 컴포넌트(Child)는 같은 데이터(counter)를 갖습니다.

## Vuex 튜토리얼 #2 - Parent, Child 컴포넌트 코드 살펴보기

먼저, 상위 컴포넌트인 App.vue(Parent)의 템플릿 코드를 보겠습니다.

```html
<!-- App.vue(Parent) -->
<div id="app">
  Parent counter : {{ "{{ counter" }} }} <br>
  <button @click="addCounter">+</button>
  <button @click="subCounter">-</button>
  <!-- Child 컴포넌트를 등록하고 counter 데이터 속성을 props로 전달한다. -->
  <child v-bind:num="counter"></child>
</div>
```

카운터를 화면에 표시하고 카운터의 값을 늘렸다 줄였다 할 수 있는 버튼 2개가 있습니다. 그리고 하위 컴포넌트인 `child` 컴포넌트를 등록하고 `counter`를 props 속성으로 내렸습니다.

다음으로는 `App.vue`의 인스턴스 옵션 속성을 보겠습니다.

```js
// App.vue(Parent)
import Child from "./Child.vue";

export default {
  components: {
    // Child 컴포넌트를 하위 컴포넌트로 등록
    child: Child
  },
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    // 이벤트 추가
    addCounter() {
      this.counter++;
    },
    subCounter() {
      this.counter--;
    }
  }
};
```

위 코드에서는 데이터 속성인 `counter`를 선언하고 `counter`를 늘리거나 줄일 수 있는 메서드를 2개 등록하였습니다.

다음으로 하위 컴포넌트의 코드를 보겠습니다.

```html
<!-- Child.vue(Child) -->
<div>
  <hr>
  Child counter : {{ "{{ num" }} }} <br>
  <button>+</button>
  <button>-</button>
</div>
```

```js
// Child.vue(Child)
export default {
  // 상위 컴포넌트에서 내려준 counter 속성을 num로 받음
  props: ["num"]
};
```

템플릿 코드의 구분선(hr 태그)을 제외하고는 Parent 컴포넌트와 유사한 코드입니다. 화면에 표시될 카운터는 Parent 컴포넌트에서 전달받은 `props` 속성입니다.

## Vuex 튜토리얼 #3 - Vue App 분석

위 앱의 `+` 버튼을 클릭하면 Parent와 Child 컴포넌트의 숫자가 동일하게 올라갑니다.

<figure class="half">
	<img src="{{ site.url }}/images/posts/web/vuejs/vuex-1/click-plus.png">
	<figcaption>+ 버튼을 두 번 클릭한 결과 화면</figcaption>
</figure>

왜냐하면 상위 컴포넌트의 `counter` 데이터를 props 속성으로 넘겨 받았기 때문입니다.

![counter-reference]({{ site.url }}/images/posts/web/vuejs/vuex-1/counter-reference.png)

달리 말해, **같은 데이터 속성을 2개의 컴포넌트에서 접근하여 같은 값을 표현**하고 있다는 의미입니다. 이 구조는 뷰의 props 속성을 이용한 기본적인 컴포넌트 통신 방법입니다.

화면의 단위를 잘게 쪼개면 쪼갤수록 한 컴포넌트의 데이터를 다른 컴포넌트의 화면에서 표시할 일이 많아집니다. 만약 컴포넌트의 갯수가 무한정 많아진다면 어떻게 될까요? 최상위 컴포넌트에서 맨 아래의 컴포넌트에 데이터를 전달하기 위해 중간 계층의 컴포넌트에 모두 props, event emit을 선언해줘야 할 겁니다.

이제 이 비효율적인 컴포넌트 간 데이터 전달 방식을 Vuex로 해결해봅시다 :)

## Vuex 튜토리얼 #4 - Vuex 설치 및 등록

먼저 아래 명령어로 프로젝트에 Vuex를 설치합니다.

```bash
npm install vuex
```

그리고 뷰엑스를 등록할 자바스크립트 파일을 하나 새로 생성합니다. 이름은 관례에 따라 `store.js` 로 지정하겠습니다.

```js
// store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  // ...
});
```

이제 프로젝트의 `main.js` 파일로 가서 `store.js`를 불러와 등록합니다.

```js
// main.js
import Vue from "vue";
import App from "./App.vue";
// store.js를 불러오는 코드
import { store } from "./store";

new Vue({
  el: "#app",
  // 뷰 인스턴스의 store 속성에 연결
  store: store,
  render: h => h(App)
});
```

## Vuex 튜토리얼 #5 - state 등록

state를 뷰엑스에 아래와 같이 추가합니다.

```js
// store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  // counter라는 state 속성을 추가
  state: {
    counter: 0
  }
});
```

state에 정의된 `counter` 속성은
Parent 컴포넌트에서 사용하던 data 속성 `counter` 와 동일한 역할을 합니다.
이미 앞 [상태 관리 패턴 챕터](#상태 관리-패턴)에서 설명했듯이 **"state는 컴포넌트 간에 공유할 data 속성을 의미합니다."**

## Vuex 튜토리얼 #6 - state 접근

방금 state에 등록한 `counter`속성은 컴포넌트의 템플릿 코드에서 `$store.state.counter`로 접근할 수 있습니다. 앞에서 살펴본 Parent 컴포넌트에 적용해보면 다음과 같습니다.

```html
<!-- App.vue(Parent) -->
<div id="app">
  Parent counter : {{ "{{ $store.state.counter" }} }} <br />
  <button @click="addCounter">+</button>
  <button @click="subCounter">-</button>

  <!-- 기존 코드 -->
  <!-- <child v-bind:num="counter"></child> -->
  <child></child>
</div>
```

```js
// App.vue(Parent)
import Child from "./Child.vue";

export default {
  components: {
    child: Child
  },
  // 기존 코드
  // data () {
  //   return {
  //     counter: 0
  //   }
  // },
  methods: {
    addCounter() {
      this.$store.state.counter++;
    },
    subCounter() {
      this.$store.state.counter--;
    }
  }
};
```

위 코드는 기존 코드와 다음 2가지가 다릅니다.

1. data 속성으로 선언한 `counter` 값 제거
2. Child 컴포넌트로 `counter` 를 전달하지 않음

결국 Parent 컴포넌트에서 관리하던 `counter` 데이터를 뷰엑스의 state에 넘겨주었습니다. Child 컴포넌트에서 접근하던 Parent 컴포넌트의 data 속성이 뷰엑스로 갔기 때문에 이제 Child에서는 뷰엑스의 state를 바라보면 됩니다. 이제 Parent와 Child 모두 state를 접근할 수 있게 되었죠. 마찬가지로 어떤 컴포넌트든 이제 뷰엑스로 `counter`를 접근할 수 있습니다.

<figure>
	<img src="{{ site.url }}/images/posts/web/vuejs/vuex-1/vuex-data-management.png">
	<figcaption>뷰엑스의 counter를 접근하는 Parent, Child 컴포넌트의 모습</figcaption>
</figure>

Parent 컴포넌트의 `+` 버튼을 눌렀을 때 동일하게 동작하는 것을 확인할 수 있습니다.

<figure class="half">
	<img src="{{ site.url }}/images/posts/web/vuejs/vuex-1/parent-state.png">
	<figcaption>+ 버튼을 두 번 클릭했을 때 정상적으로 숫자가 올라감</figcaption>
</figure>

화면상으로는 이전과 차이가 없지만 내부적으로는 뷰엑스를 사용하고 있다는 차이가 있습니다. 뷰엑스로 데이터 관리를 하기 때문에 Parent와 Child 뿐만 아니라 더 많은 컴포넌트들이 `counter` 값을 접근할 수 있게 됐죠.

동일하게 Child 컴포넌트에도 뷰엑스를 적용해보겠습니다.

```html
<div>
  <hr />
  Child counter : {{ "{{ $store.state.counter" }} }} <br />
  <button>+</button>
  <button>-</button>
</div>
```

```js
export default {
  // 기존 코드
  // props: ['passedCounter']
};
```

Parent 컴포넌트에서 props 속성으로 `counter`를 전달받던 방식에서 뷰엑스의 state인 `counter`를 바로 접근하는 방식으로 바뀌었습니다.

## 마무리

이처럼 뷰엑스를 이용하면 여러 컴포넌트 간에 공유할 데이터를 효율적으로 관리할 수 있습니다. 이외에도 state 값을 쉽게 접근할 수 있는 **getters**, state 값을 변경하는 **mutations**,
비동기 처리를 위한 **actions**, 폴더 구조화 등을 알아야 뷰엑스로 웹 서비스를 개발할 수 있습니다.

다음 시리즈가 궁금하시다면 아래 링크를 활용해보세요 :)

[Vuex 시작하기 2탄 바로가기](https://joshua1988.github.io/web-development/vuejs/vuex-getters-mutations/) <br>
[Vuex 시작하기 3탄 바로가기](https://joshua1988.github.io/web-development/vuejs/vuex-actions-modules/)

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
	<a href="https://www.inflearn.com/course/%ED%94%84%EB%9F%B0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%9B%B9%ED%8C%A9?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/webpack.png"></a>
	<a href="https://www.inflearn.com/course/pwa?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/pwa.jpg"></a>
	<figcaption>인프런 온라인 강의 : Vue.js 끝장내기, 쉽게 배우는 Webpack, PWA 시작하기</figcaption>
</figure>

## 밀착 지도를 받을 수 있는 오프라인 강의

강남역 패스트캠퍼스에서 2020년 4월 말부터 6월 초까지 두 달 동안 매주 월요일 수요일에 Vue.js 집중반 수업을 진행합니다. 관심 있으신 분들은 아래 이미지를 클릭해주세요 😄

<figure class="third">
	<a href="https://www.fastcampus.co.kr/dev_camp_vue/" target="_blank"><img src="{{ site.url }}/images/posts/web/fastcampus/vue.png"></a>
	<figcaption>패스트캠퍼스 Vue.js 정복 캠프(20.4.27 ~ 20.6.8)</figcaption>
</figure>
