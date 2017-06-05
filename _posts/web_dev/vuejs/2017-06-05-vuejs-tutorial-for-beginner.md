---
layout: article
title: "프론트엔드 개발자를 위한 Vue.js 입문서"
date: 2017-06-05 17:35:32 +0900
categories: web_dev
excerpt: "초심자를 위한 Vue.js 소개, 구성요소, 구조, Vue Router, Vue Resource 등"
image:
  teaser: posts/web/vuejs/logo.png
  credit: Evan You
  creditlink: https://vuejs.org/
  #url to their site or licensing
locale: "ko_KR"
# 리플 옵션
comments: true
tags:
- vuejs
- Vue JS
- vue 튜토리얼
- vue 시작하기
- vue 소개
- vuejs 튜토리얼
- vuejs 입문
- 강의
- vue router
- namedview vs nested routes
- namedview
- nested routes
- 패스트캠퍼스
- 패스트캠퍼스 프론트엔드 웹앱 캠프
- fastcampus
- pwa
- vue 배우기
---
{% include toc.html %}

## Vue 는 무엇인가?
MVVM 패턴의 ViewModel 레이어에 해당하는 View 단 라이브러리

![View Model Layer]({{ site.url }}/images/posts/web/vuejs/view-model.png)

- **데이터 바인딩** 과 **화면 단위를 컴포넌트 형태로 제공하며 API 를 지원**하는데에 궁극적인 목적이 있음
- Angular 에서 지원하는 **2 way data bindings** 을 동일하게 제공
- 하지만 **Component 간 통신**의 기본 골격은 React 의 **1 Way Data Flow (부모 -> 자식)** 와 유사
- 다른 Front-End FW (Angular, React) 와 [비교](https://vuejs.org/v2/guide/comparison.html)했을 때 훨씬 가볍고 빠름.
- 간단한 Vue 를 적용하는데 있어서도 **러닝커브가 낮고, 쉽게 접근 가능**

## MVVM 패턴이란?
[위키](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel) 에 명시된 것처럼, Backend 로직과 Client 의 마크업 & 데이터 표현단을 분리하기 위한 구조로 전통적인 MVC 패턴의 방식에서 기인하였다. 간단하게 생각해서 화면 앞단의 회면 동작 관련 로직과 뒷단의 DB 데이터 처리 및 서버 로직을 분리하고, 뒷단에서 넘어온 데이터를 Model 에 담아 View 로 넘어주는 중간 지점이라고 보면 되겠다.

![mvvm-pattern]({{ site.url }}/images/posts/web/vuejs/mvvm-pattern.png)

## Vue 시작하기
다른 주요 Front-End Framework (Angular, React) 보다 Vue 가 가지는 가장 큰 강점은 바로 시작하기가 정말 쉽다는 점이다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Vue Sample</title>
  </head>
  <body>
    <div id="app">
      {{ message }}
    </div>

    <script src="https://unpkg.com/vue@2.3.3"></script>
    <script>
      new Vue({
        el: '#app',
        data: {
          message: 'Hello Vue.js!'
        }
      })
    </script>
  </body>
</html>
```

Vue JS 라이브러리를 따로 받을 필요도 없이 CDN 으로 코드 땡겨오고 바로 Vue 인스턴스를 하나 생성하여 간단한 Vue App 을 만들어보았다.
기존의 구현된 시스템에 적용하기도 훨씬 수월할 것으로 보인다.

## Vue Instance
#### Vue Instance 생성자
- Vue 생성자를 만드는 방법은 아래와 같다.

  ```javascript
  // vm 은 ViewModel 을 뜻한다. (관행적인 코딩 컨벤션)
  var vm = new Vue({
    // options
  })
  ```

- Vue 객체를 생성할 때 아래와 같이 *data, template, el, methods, life cycle callback* 등의 options 을 포함할 수 있다.

  ```javascript
  var vm = new Vue({
    template: ...,
    el: ...,
    methods: {

    },
    // ...
  })
  ```

- 각 options 으로 미리 정의한 vue 객체를 확장하여 재사용이 가능하다. 하지만 아래 방법 보다는 template 에서 custom element 로 작성하는 것이 더 좋다.

  ```javascript
  var MyComponent = Vue.extend({
    // template, el, methods 와 같은 options 정의
  })
  // 위에서 정의한 options 를 기본으로 하는 컴포넌트 생성
  var myComponentInstance = new MyComponent()
  ```


#### Vue Instance 라이프싸이클 초기화
Vue 객체가 생성될 때 아래의 초기화 작업을 수행한다.

- 데이터 관찰
- 템플릿 컴파일
- DOM 에 객체 연결
- 데이터 변경시 DOM 업데이트

이 초기화 작업 외에도 개발자가 의도하는 커스텀 로직을 아래와 같이 추가할 수 있다.

```javascript
var vm = new Vue({
  data: {
    a: 1
  },
  created: function () {
    // this 는 vm 을 가리킴
    console.log('a is: ' + this.a)
  }
})
```

이 외에도 라이프싸이클 단계에 따라 `mounted`, `updated`, `destroyed` 등을 사용할 수 있다.
이 라이프싸이클 초기화 메서드로 커스텀 로직을 수행하기 때문에 Vue 에서는 따로 Controller 를 갖고 있지 않다.

## Vue Components
화면에 비춰지는 뷰의 단위를 쪼개어 재활용이 가능한 형태로 관리하는 것이 컴포넌트

![vue-js-component-intro-picture]({{ site.url }}/images/posts/web/vuejs/components.png)

- 컴포넌트 등록은 아래와 같은 코드로 생성 가능하다.

  ```html
  <div id="app">
    <my-component></my-component>
  </div>
  ```

  ```js
  // 등록
  Vue.component('my-component', {
    template: '<div>A custom component!</div>'
  })
  // Vue 인스턴스 생성
  new Vue({
    el: '#app'
  })
  ```

**주의할 점 : Vue 인스턴스를 생성하기전에 꼭 Component 부터 등록!**

- 컴포넌트의 `data` 속성은 꼭 함수로 작성해야한다.

  ```js
  // 아래 Vue 컴포넌트는 오류를 발생시킨다.
  Vue.component('my-component', {
    data: {
      message: 'hello'
    }
  })

  var data = { text: 'hello' }
  Vue.component('my-component', {
    data: function () {
      return data;
    }
    // 모든 컴포넌트가 같은 값을 공유하지 않게 아래와 같이 수정
    // data: function () {
    //   return {
    //     text: 'hello'
    //   }
    // }
  })
  ```

#### Global or Local Component
- 컴포넌트를 뷰 인스턴스에 등록해서 사용할 때 다음과 같이 global 하게 등록할 수 있다.

  ```js
  Vue.component('my-component', {
    // ...
  })
  ```


- local 하게 등록하는 방법은 다음과 같다.

  ```js
  var cmp = {
    data: function () {
      return {
        // ...
      };
    }
    template: '<hr>',
    methods: {}
  }

  new Vue({
    components: {
      'my-cmp' : cmp
    }
  })
  ```

#### 부모와 자식 컴포넌트 관계
- 구조상 상-하 관계에 있는 컴포넌트의 통신은
  - 부모 -> 자식 : props down
  - 자식 -> 부모 : events up

![parent-child-components-relationship]({{ site.url }}/images/posts/web/vuejs/parent-child-relationship.png)

#### Props
- 모든 컴포넌트는 각 컴포넌트 자체의 스코프를 갖는다.
  - 예를 들어, 하위 컴포넌트가 상위 컴포넌트의 값을 바로 참조할 수 없는 형식
- **상위에서 하위로 값을 전달하려면 props 속성을 사용한다.**

```js
Vue.component('child-component', {
  props: ['passedData'],
  template: '<p>{{passedData}}</p>'
});

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue! from Parent Component',
  }
});
```

```html
<div id="app">
  <child-component v-bind:passed-data="message"></child-component>
</div>
```

**주의 할점 : js 에서 props 변수 명명을 카멜 기법으로 하면 html 에서 접근은 케밥 기법(`-`) 으로 가야한다.**

![props-parsing-rules-between-components]({{ site.url }}/images/posts/web/vuejs/props-name-parsing-tip.png)

#### 같은 레벨의 컴포넌트 간 통신
동일한 상위 컴포넌트를 가진 2개의 하위 컴포넌트 간의 통신은
- Child (하위) -> Parent(상위) -> 다시 2개의 Children (하위)

**컴포넌트 간의 직접적인 통신은 불가능하도록 되어 있는게 Vue 의 기본 구조**

#### Event Bus
Non Parent - Child 컴포넌트 간의 통신을 위해 **Event Bus** 를 활용할 수 있다.
- Event Bus 를 위해 새로운 Vue 를 생성하여 아래와 같이 Vue Root Instance 가 위치한 파일에 등록

  ```js
  // Vue Root Instance 전에 꼭 등록 순서가 중요.
  export const eventBus = new Vue();
  new Vue({
    // ...
  })
  ```

- 이벤트를 발생시킬 컴포넌트에 `eventBus` import 후 `$emit` 으로 이벤트 발생

  ```js
  import { eventBus } from '../../main';

  eventBus.$emit('refresh', 10);
  ```

- 해당 이벤트를 받을 컴포넌트에도 동일하게 import 후 콜백으로 이벤트 수신

  ```js
  import { eventBus } from '../../main';

  // 등록 위치는 해당 컴포넌트의 created 메서드에 등록
  created() {
    eventBus.$on('refresh', function (data) {
      console.log(data); // 10
    });
  }
  ```

- 참고 : eventBus 의 콜백함수 안에서 해당 소스의 메서드를 참고하려면 `self` 사용

  ```js
  methods: {
    callAnyMethod() {
      // ...
    }
  }
  created() {
    var self = this;
    eventBus.$on('refresh', function (data) {
      console.log(this); // this 는 빈 Vue 인스턴스를 접근
      self.callAnyMethod() // self 는 이 created 의 Vue 컴포넌트에 접근, 따라서 이 컴포넌트에 미리 선언된 메서드에 접근 가능
    });
  }
  ```
