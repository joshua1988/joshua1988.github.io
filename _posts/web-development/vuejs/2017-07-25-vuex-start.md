---
layout: article
title: "Vuex 시작하기 1 - Vuex 와 State"
date: 2017-07-25 19:28:32 +0900
categories: [web-development, vuejs]
excerpt: "Vue 중급으로 레벨업 하기. Vuex 를 이용한 상태관리 소개. state 소개"
image:
  teaser: posts/web/vuejs/logo.png
  credit: Evan You
  creditlink: https://vuejs.org/
  #url to their site or licensing
locale: "ko_KR"
# 리플 옵션
comments: true
tags:
- vue.js 사용법
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
이 글은 Vue.js 의 컴포넌트 구조화 및 기본 통신 방법을 이해하신 분들에게 적합합니다.
Vue.js 에 막 입문하시는 분들께는 [Vue 입문 가이드](https://joshua1988.github.io/web-development/vuejs/vuejs-tutorial-for-beginner/) 를 먼저 읽어보시길 권고드립니다.

## Vuex 란?
Vue.js 의 **상태관리** 를 위한 패턴이자 라이브러리.
다른 상태관리 패턴이나 라이브러리와 비교했을 때 Vue 의 Reactivity 체계를 효율적으로 활용하여
화면 업데이트가 가능하다는 차이점이 있다.

## 상태관리 (State Management) 가 왜 필요한가?
컴포넌트 기반 프레임워크에서는 화면 구성을 위해 화면 단위를 매우 잘게 쪼개서 컴포넌트로 사용한다. 예를 들면, header, button, list 등의 작은 단위들이 컴포넌트가 되어 한 화면에서 많은 컴포넌트를 사용하게 된다. 이에 따라 **컴포넌트 간의 통신이나 데이터 전달을 좀 더 유기적으로 관리할 필요성이 생긴다.**

달리 말해, header -> button, button -> list , button -> footer 등의 **컴포넌트 간 데이터 전달 및 이벤트 통신 등의 여러 컴포넌트의 관계를 한 곳에서 관리하기 쉽게 구조화 하는 것이 State Management**다.

Vue 와 성격이 유사한 프론트엔드 프레임워크인 React 에서는 이미 Redux, Flux 와 같은 상태 라이브러리를 사용하고 있고, Vue 도 Vuex 라는 상태관리 라이브러리를 사용한다.

## 상태관리로 해결할 수 있는 문제점?
상태관리는 중대형 규모의 앱 컴포넌트들을 더 효율적으로 관리하기 위한 기법이다.
일반적으로 앱의 규모가 커지면서 생기는 문제점들은 아래와 같다.

1. Vue 의 기본 컴포넌트 통신방식인 상위 - 하위 에서 **중간에 거쳐야 할 컴포넌트가 많아지거나**
2. 이를 피하기 위해 Event Bus 를 활용하여 **상하위 관계가 아닌 컴포넌트 간 통신 시 관리가 되지 않는 점**

이러한 문제점들을 해결하기 위해 모든 데이터 통신 (state) 을 한 곳에서 중앙 집중식으로 관리한다.

![vuex-diagram]({{ site.url }}/images/posts/web/vuejs/vuex-1/vuex-diagram.png)

## 상태관리 패턴
상태관리 구성요소는 크게 3가지가 있다.

- **state** : 컴포넌트 간 공유될 **data**
- **view** : 데이터가 표현될 **template**
- **actions** : 사용자의 입력에 따라 반응할 **methods**

```js
new Vue({
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ "{{ count" }} }}</div>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
})
```

위 구성요소는 아래와 같이 동작한다.

![vuex-state-one-way-data-flow]({{ site.url }}/images/posts/web/vuejs/vuex-1/vuex-state-one-way-data-flow.png)

## Vuex 튜토리얼 #1 - 간단한 Vue App 구성
Vuex 적용을 위해 Parent 컴포넌트와 Child 컴포넌트를 갖는 간단한 앱을 아래처럼 만들었다.

![demo-ui]({{ site.url }}/images/posts/web/vuejs/vuex-1/demo-ui.png)

컴포넌트 폴더구조는 아래와 같다.

![folder-structure]({{ site.url }}/images/posts/web/vuejs/vuex-1/folder-structure.png)

- `App.vue` : **Parent 컴포넌트** 또는 **상위 컴포넌트**
- `Child.vue` : **Child 컴포넌트** 또는 **하위 컴포넌트**

이 앱의 특징은 아래와 같다.

- 위 앱은 `+` 버튼 클릭 시 숫자가 올라가고, `-` 버튼 클릭 시 숫자가 감소된다.
- [Parent 컴포넌트 - Child 컴포넌트 간 데이터 전달을 위해 props 를 사용한다.](https://joshua1988.github.io/web-development/vuejs/vuejs-tutorial-for-beginner/#vue-components)
- 따라서, Parent counter 와 Child counter 는 같은 데이터 값 (counter) 을 공유하고 있다.

Parent 컴포넌트 (App.vue) 의 코드부터 보면

```html
<!-- Parent (App.vue) Template -->
<div id="app">
  Parent counter : {{ "{{ count" }} }} <br>
  <button @click="addCounter">+</button>
  <button @click="subCounter">-</button>

  <!-- Child 컴포넌트를 등록하고 counter 데이터 속성을 props 로 전달한다. -->
  <child v-bind:passedCounter="counter"></child>
</div>
```

```jsx
// App.vue
import Child from './Child.vue'

export default {
  data () {
    return {
      // data 속성 등록
      counter: 0
    }
  },
  methods: {
    // 이벤트 추가
    addCounter() {
      this.counter++;
    },
    subCounter() {
      this.counter--;
    }
  },
  components: {
    // Child 컴포넌트를 하위 컴포넌트로 등록
    'child': Child
  }
}
```

위 코드에서는 data 속성을 선언하고, 해당 data 속성을 증가 및 감소 시키는 이벤트를 등록하였다.

다음으로 Child 컴포넌트 코드를 보면,

```html
<!-- Child (Child.vue) Template -->
<div>
  <hr>
  Child counter : {{ "{{ passedCounter" }} }} <br>
  <button>+</button>
  <button>-</button>
</div>
```

```js
// Child.vue
export default {
  // Parent 에서 넘겨준 counter 속성을 passedCounter 로 받음
  props: ['passedCounter']
}
```

template 의 경우 구분선을 제외하고는 Parent 컴포넌트와 동일한 코드고, js 의 경우 전달받은 counter 를 `props` 로 등록하였다.

## Vuex 튜토리얼 #2 - Vue App 분석
위 앱의 `+` 버튼을 클릭하면 Parent 와 Child 컴포넌트의 숫자가 동일하게 올라간다.

![click-plus]({{ site.url }}/images/posts/web/vuejs/vuex-1/click-plus.png)

이유는 Parent 의 `counter` 를 Child 에서 `props` 로 넘겨 받았기 때문이다.

![counter-reference]({{ site.url }}/images/posts/web/vuejs/vuex-1/counter-reference.png)

달리 말해, **동일한 데이터 속성을 단지 2 개의 컴포넌트에서 동시에 접근하여 같은 값을 표현**하고 있는 것이다.

위 구조는 Vue 의 props 를 이용한 기본적인 Parent - Child 컴포넌트 통신이다.
화면의 단위를 잘게 쪼개면 쪼갤수록 한 컴포넌트의 데이터를 다른 컴포넌트의 화면에서 표시할 일이 많아진다.
여기서 컴포넌트의 갯수가 무한정 많아진다면? 천재가 아닌 이상 이걸 다 기억할 수도 없고, 가장 중요한 것은
협업하는 입장에서는 소스를 일일이 다 까봐야 추적이 가능하다.

**이런 비효율적인 컴포넌트 간 통신 관리를 Vuex 로 해결해보자.**

## Vuex 튜토리얼 #3 - Vuex 설치 및 등록
아래 명령어로 Vuex 를 설치하자.

```shell
npm install vuex --save
```

그리고 Vuex 를 등록할 js 파일을 하나 새로 생성한다. 이름은 관례에 따라 `store.js` 로 지정한다.

```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  //
});
```

그리고 Vue App 이 등록된 `main.js` 로 넘어가서 `store.js` 를 불러와 등록하면 된다.

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
// store.js 를 불러와
import { store } from './store'

new Vue({
  el: '#app',
  // Vue 인스턴스에 등록한다.
  store,
  render: h => h(App)
})
```

## Vuex 튜토리얼 #4 - state 등록
state 를 Vuex 에 아래와 같이 추가할 수 있다.

```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  // counter 라는 state 속성을 추가
  state: {
    counter: 0
  },
});
```

state 에 정의된 `counter` 속성은
Parent 컴포넌트 에서 사용하던 data 속성 `counter` 와 동일한 역할을 한다.
이미 앞 [상태관리 패턴 챕터](#상태관리-패턴) 에서 설명했듯이 **"state 는 컴포넌트 간에 공유할 data 속성을 의미한다."**

## Vuex 튜토리얼 #5 - state 접근
방금 state 에 등록한 `counter` 를 앱에서 접근하려면 `this.$store.state.counter` 를 활용한다.
앞의 App.vue 를 Vuex 에 맞게 다시 정리하면

```html
<div id="app">
  Parent counter : {{ "{{ this.$store.state.counter" }} }} <br>
  <button @click="addCounter">+</button>
  <button @click="subCounter">-</button>

  <!-- 기존 코드 -->
  <!-- <child v-bind:passedCounter="counter"></child> -->
  <child></child>
</div>
```

```js
// App.vue
import Child from './Child.vue'

export default {
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
  },
  components: {
    'child': Child
  }
}
```

기존 코드와의 차이점은

1. data 속성으로 선언한 counter 값 제거
2. Child 컴포넌트로 counter 를 전달하지 않음

결국 Parent 에서 관리하던 counter 라는 데이터를 Vuex 에 state 로 넘겨준 것이다.
Child 컴포넌트에서 접근하던 Parent 컴포넌트의 data 가 Vuex 로 갔기 때문에,
이제 Child 와 Parent 모두 Vuex 의 state 를 바라본다.
**따라서, Vuex 라는 저장소의 데이터를 모든 컴포넌트들이 동일한 조건에서 접근하여 사용하게 된다.**

![vuex-data-management]({{ site.url }}/images/posts/web/vuejs/vuex-1/vuex-data-management.png)

![parent-state]({{ site.url }}/images/posts/web/vuejs/vuex-1/parent-state.png)

**화면상으로는 이전과 차이가 없지만 내부적으로는 Vuex 로 데이터 관리를 하고 있는 큰 차이가 있다.**

동일하게 Child 컴포넌트의 코드에도 Vuex 를 반영해보면

```html
<div>
  <hr>
  Child counter : {{ "{{ this.$store.state.counter" }} }} <br>
  <button>+</button>
  <button>-</button>
</div>
```

```js
export default {
  // 기존 코드
  // props: ['passedCounter']
}
```

Parent 컴포넌트 에서 props 로 `counter` 를 전달받던 방식에서,
Vuex 의 state 인 `counter` 로 바로 접근하는 방식으로 변경됐다.

## 마무리
위와 같이 Vuex 의 state 를 이용하여 데이터 관리를 한 곳에서 효율적으로 할 수 있다.

이외에도 변경된 state 값을 받아오기 위한 **Getters**, state 값을 변경하기 위한 **Mutations**,
비동기 mutations 로직을 위한 **Actions**, 폴더 구조화 등을 알아야
Vuex 를 잘 활용하여 가독성 있는 코드를 짤 수 있다.

[Vuex 시작하기 2탄 바로가기](https://joshua1988.github.io/web-development/vuejs/vuex-getters-mutations/) <br>
[Vuex 시작하기 3탄 바로가기](https://joshua1988.github.io/web-development/vuejs/vuex-actions-modules/)

## 글보다 더 쉽게 배우는 온라인 강좌
좀 더 친절하고 상세한 설명을 원하신다면 아래 강좌를 이용해보시는 것도 좋을 것 같아요 :)

<figure class="third">
	<a href="https://www.inflearn.com/course/vue-pwa-vue-js-%EA%B8%B0%EB%B3%B8/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/inflearn/vuejs-basic.png"></a>
	<a href="https://www.inflearn.com/course/vue-pwa-vue-js-%EC%A4%91%EA%B8%89/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/inflearn/vue-intermediate.png"></a>
	<a href="https://www.inflearn.com/course/webpack-%EC%9B%B9%ED%8C%A9-%EA%B0%95%EC%A2%8C/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/inflearn/vue-advanced.jpg"></a>
	<figcaption>인프런 온라인 강좌 : Vue.js 초급, Vue.js 중급, Vue.js 완벽 가이드 (좌측 부터)</figcaption>
</figure>
