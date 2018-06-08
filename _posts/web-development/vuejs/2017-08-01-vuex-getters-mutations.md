---
layout: article
title: "Vuex 시작하기 2 - Getters 와 Mutations"
date: 2017-08-01 16:45:32 +0900
categories: [web-development, vuejs]
excerpt: "Vue 중급으로 레벨업. Vuex 의 Getters 와 Mutations 사용법 배우기"
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
- 뷰엑스
- vuex 예제
- vuex 사용
- vuex 튜토리얼
- vuex 시작하기
- vuejs vuex
- vuex getters
- vuex mutations
- vuex example
- vue vuex 시작하기
- vuex 한글
- vuex 소개
- vuex 튜토리얼
- vuex 시작하기 2
- vuex 입문
- vuejs 강의
- vue.js 강의
- vuejs 강좌
- vue.js 강좌
- vue 강의
- vue 배우기
- 뷰엑스 시작하기
- 뷰엑스 예제
- 인프런
- 인프런 vuejs
- 인프런 뷰
- 패스트캠퍼스
- 패스트캠퍼스 프론트엔드 웹앱 캠프
- fastcampus
---
{% include toc.html %}

## 들어가며
이 글은 [Vuex 시작하기 1](https://joshua1988.github.io/web-development/vuejs/vuex-start/)에 이어,
Vuex 의 Getters, Mutations 를 소개합니다. 지난 글에서는 state 까지 다뤘습니다.

## Getters 란?
중앙 데이터 관리식 구조에서 발생하는 문제점 중 하나는
각 컴포넌트에서 Vuex 의 데이터를 접근할 때 중복된 코드를 반복호출 하게 되는 것이다.
예를 들어, 아래와 같은 코드가 있다.

```js
// App.vue
computed: {
  doubleCounter() {
    return this.$store.state.counter * 2;
  }
},

// Child.vue
computed: {
  doubleCounter() {
    return this.$store.state.counter * 2;
  }
},
```

여러 컴포넌트에서 같은 로직을 비효율적으로 중복 사용하고 있다.
이 때, Vuex 의 데이터 (state) 변경을 각 컴포넌트에서 수행하는 게 아니라,
Vuex 에서 수행하도록 하고 각 컴포넌트에서 수행 로직을 호출하면, 코드 가독성도 올라가고 성능에서도 이점이 생긴다.

```js
// store.js (Vuex)
getters: {
  doubleCounter: function (state) {
    return state.counter * 2;
  }
},

// App.vue
computed: {
  doubleCounter() {
    return this.$store.getters.doubleCounter;
  }
},

// Child.vue
computed: {
  doubleCounter() {
    return this.$store.getters.doubleCounter;
  }
},
```

![vuex-getters]({{ site.url }}/images/posts/web/vuejs/vuex-2/vuex-getters.png)

Getters 를 적용해도 비슷해 보이는가? 이건 정말 간단한 예제일 뿐이다. 만약

```js
this.store.state.todos.filter(todo => todo.done)...
```

등의 복잡한 로직이라면 왜 Getters 를 쓰는게 편할지 납득이 갈 것이다.

## Getters 등록을 위한 코드 정리
[지난 튜토리얼](https://joshua1988.github.io/web-development/vuejs/vuex-start/#vuex-튜토리얼-5---state-접근) 에 이어서 getters 를 추가해보자.

먼저, 지난번 코드에서 정리해야 하는 부분은 아래와 같다.

```html
<!-- App.vue -->
<div id="app">
  Parent counter : {{ "{{ this.$store.state.counter" }} }}
  <!-- ... -->
</div>
```

Vue 공식 사이트에서 [언급된](https://vuejs.org/v2/guide/computed.html#Computed-Properties) 것처럼
Template 의 표현식은 최대한 간소화해야 한다.

따라서,

```html
<!-- App.vue -->
<div id="app">
  Parent counter : {{ "{{ parentCounter" }} }}
  <!-- ... -->
</div>

<!-- Child.vue -->
<div>
  Child counter : {{ "{{ childCounter" }} }}
  <!-- ... -->
</div>
```

```js
// App.vue
computed: {
  parentCounter() {
    return this.$store.state.counter;
  }
},

// Child.vue
computed: {
  childCounter() {
    return this.$store.state.counter;
  }
},
```

computed 속성을 활용함으로써 Template 코드가 더 간결해지고, 가독성이 좋아졌다.

## Getters 등록
여기서 한술 더 떠서 getters 를 Vuex 에 추가한다.

```js
// store.js
export const store = new Vuex.Store({
  // ...
  getters: {
    getCounter: function (state) {
      return state.counter;
    }
  }
});
```

## Getters 사용
등록된 getters 를 각 컴포넌트에서 사용하려면 this.$store 를 이용하여 getters 에 접근한다.

```js
// App.vue
computed: {
  parentCounter() {
    this.$store.getters.getCounter;
  }
},

// Child.vue
computed: {
  childCounter() {
    this.$store.getters.getCounter;
  }
},
```

이렇게 getters 를 Vuex 에 등록하고 사용하였다.
참고로, `computed` 의 장점인 Caching 효과는 단순히 state 값을 반환하는 것이 아니라,
getters 에 선언된 속성에서 filter(), reverse() 등의 추가적인 계산 로직이 들어갈 때 발휘된다.

## mapGetters
Vuex 에 내장된 helper 함수, mapGetters 로 이미 위에서 한번 가독성이 올라간 코드를 더 직관적이게 작성할 수 있다.

```html
<!-- App.vue -->
<div id="app">
  Parent counter : {{ "{{ parentCounter" }} }}
  <!-- ... -->
</div>
```

```js
// App.vue
import { mapGetters } from 'vuex'

// ...
computed: mapGetters({
  parentCounter : 'getCounter' // getCounter 는 Vuex 의 getters 에 선언된 속성 이름
}),
```

또는 Vuex 의 getters 속성 이름과 컴포넌트의 computed 속성을 동일하게 하여
아래와 같이 간단하게 선언할 수도 있다.

```html
<!-- App.vue -->
<div id="app">
  Parent counter : {{ "{{ getCounter" }} }}
  <!-- ... -->
</div>
```

```js
// App.vue
import { mapGetters } from 'vuex'

computed: mapGetters([
  'getCounter'
]),
```

여기서 **주의할 점은 위 방법들은 컴포넌트 자체에서 사용할 computed 속성과 함께 사용할 수 없다는 점**이다.
해결방안은 ES6 의 문법 `...` 을 사용하면 된다.

```js
// App.vue
import { mapGetters } from 'vuex'

computed: {
  ...mapGetters([
    'getCounter'
  ]),
  anotherCounter() {
    // ...
  }
}
```

다만 `...` 문법을 사용하려면 Babel stage-2 라이브러리 설치 및 babel preset 에 추가가 필요하다.
상세한 설명은 [여기](https://babeljs.io/docs/plugins/preset-stage-2/)를 참고한다.

## Mutations 란?
Mutations 이란 Vuex 의 데이터, 즉 state 값을 변경하는 로직들을 의미한다.
Getters 와 차이점은

1. 인자를 받아 Vuex 에 넘겨줄 수 있고
2. computed 가 아닌 methods 에 등록

또한, 다음 챕터에 나올 Actions 와의 차이점이다.

- Mutations 는 동기적 로직을 정의
- Actions 는 비동기적 로직을 정의

**Mutations 의 성격상 안에 정의한 로직들이 순차적으로 일어나야 각 컴포넌트의 반영 여부를 제대로 추적할 수가 있기 때문이다.**

여태까지 우리는 counter 를 변경할 때

```js
return this.$store.state.counter++;
return this.$store.state.counter;
```

와 같이 컴포넌트에서 직접 state 에 접근하여 변경하였지만, 이는 안티패턴으로써
Vue 의 Reactivity 체계와 상태관리 패턴에 맞지 않은 구현방식이다.
안티패턴인 이유는 여러 개의 컴포넌트에서 같은 state 값을 동시에 제어하게 되면,
state 값이 어느 컴포넌트에서 호출해서 변경된건지 추적하기가 어렵기 때문이다.
하지만, 상태 변화를 명시적으로 수행함으로써 **테스팅, 디버깅, Vue 의 Reactive 성질 준수** 의 혜택을 얻는다.

아래와 같이 `commit` 을 이용하여 state 를 변경한다.

![vuex-mutations]({{ site.url }}/images/posts/web/vuejs/vuex-2/vuex-mutations.png)

<p class="notice">Mutations 가 낯설다면 기억하기 쉽게 Setters 로 이해하자.</p>

## Mutations 등록
getters 와 마찬가지로 Vuex 에 mutations 속성을 추가한다.

```js
// store.js
export const store = new Vuex.Store({
  // ...
  mutations: {
    addCounter: function (state, payload) {
      return state.counter++;
    }
  }
});
```

## Mutations 사용
App.vue 의 기존 코드는 addCounter 에서 state 의 counter 값을 바로 접근하여 1 을 올리는 코드였다.

```html
<!-- App.vue -->
<div id="app">
  Parent counter : {{ "{{ parentCounter" }} }} <br>
  <button @click="addCounter">+</button>
  <!-- ... -->
</div>
```

```js
// App.vue
methods: {
  addCounter() {
    this.$store.state.counter++;
  }
},
```

state 를 컴포넌트에서 직접 접근하여 증가시키는 부분을
앞에서 등록했던 mutations 를 이용하는 코드로 바꾸면 아래와 같다.

```js
// App.vue
methods: {
  addCounter() {
    // this.$store.state.counter++;
    this.$store.commit('addCounter');
  }
},
```

여기서 주목할만한 부분은 getters 처럼

```js
this.$store.mutations.addCounter;
```

이런 식의 접근이 불가능하고, commit 을 이용하여 mutations 이벤트를 호출해야 한다는 점이다.
앞서 설명한 추적 가능한 상태 변화를 위해 프레임워크가 이렇게 구조화가 되어 있다는 것을 알고 넘어가자.

<p class="notice">궁금하면 `this.$store` 을 콘솔로 찍어 내용을 확인!</p>

## Mutations 에 인자 값 넘기기
각 컴포넌트에서 Vuex 의 state 를 조작하는데 필요한 특정 값들을 넘기고 싶을 때는
`commit()` 에 두 번째 인자를 추가한다.

```js
this.$store.commit('addCounter', 10);
this.$store.commit('addCounter', {
  value: 10,
  arr: ["a", "b", "c"]
});
```

이를 Vuex 에서 아래와 같이 받을 수 있다.

```js
mutations: {
  // payload 가 { value : 10 } 일 경우
  addCounter: function (state, payload) {
    state.counter = payload.value;
  }
}
```

<p class="notice">데이터 인자 명은 보통 payload 를 많이 쓴다.</p>

## mapMutations
mapGetters 와 마찬가지로, Vuex 에 내장된 mapMutations 를 이용하여 코드 가독성을 높일 수 있다.

```js
// App.vue
import { mapMutations } from 'vuex'

methods: {
  // Vuex 의 Mutations 메서드 명과 App.vue 메서드 명이 동일할 때 [] 사용
  ...mapMutations([
    'addCounter'
  ]),
  // Vuex 의 Mutations 메서드 명과 App.vue 메서드 명을 다르게 매칭할 때 {} 사용
  ...mapMutations({
    addCounter: 'addCounter' // 앞 addCounter 는 해당 컴포넌트의 메서드를, 뒤 addCounter 는 Vuex 의 Mutations 를 의미
  })
}
```

## 마무리
[지난 글](https://joshua1988.github.io/web-development/vuejs/vuex-start/#vuex-튜토리얼-4---state-등록)의 state 에 이어서, **이번 글에서는 변경된 state 값을 받아오는 Getters** 와
**state 값을 변경하기 위한 메서드를 정의하는 Mutations** 에 대해 알아보았다.
Vuex 의 마지막 속성인 Actions 와 Vuex 폴더 구조화는 다음 글에서 다루기로 한다.

[Vuex 시작하기 1탄 바로가기](https://joshua1988.github.io/web-development/vuejs/vuex-start/) <br>
[Vuex 시작하기 3탄 바로가기](https://joshua1988.github.io/web-development/vuejs/vuex-actions-modules/)

## 글보다 더 쉽게 배우는 온라인 강좌
좀 더 친절하고 상세한 설명을 원하신다면 아래 강좌를 이용해보시는 것도 좋을 것 같아요 :)

<figure class="third">
	<a href="https://www.inflearn.com/course/vue-pwa-vue-js-%EA%B8%B0%EB%B3%B8/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/inflearn/vuejs-basic.png"></a>
	<a href="https://www.inflearn.com/course/vue-pwa-vue-js-%EC%A4%91%EA%B8%89/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/inflearn/vue-intermediate.png"></a>
	<a href="https://www.inflearn.com/course/webpack-%EC%9B%B9%ED%8C%A9-%EA%B0%95%EC%A2%8C/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/inflearn/webpack.png"></a>
	<figcaption>인프런 온라인 강좌 : Vue.js 초급, Vue.js 중급, Webpack (좌측 부터)</figcaption>
</figure>
