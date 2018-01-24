---
layout: article
title: "Vue.js 개발을 위한 주요 ES6 문법 4가지"
date: 2018-01-24 18:22:32 +0900
categories: [web-development, translation]
excerpt: "(번역) Vue.js로 개발할 때 도움이 되는 ES6 문법 4가지를 간단한 설명과 예제로 살펴봅니다. 화살표 함수, 템플릿 리터럴, 모듈, 구조 분해 등"
image:
  teaser: posts/web/vuejs/vuejs-es6.jpeg
  credit: kostas mamniatis
  creditlink: https://vuejsfeed.com/blog/using-es6-arrow-functions-in-vue-modules
  #url to their site or licensing
locale: "ko_KR"
# 리플 옵션
comments: true
tags:
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
- vuejs es6
- es6 문법
- vuejs를 위한 es6
- vue.js를 위한 es6
- vue.js를 위한 es2015
- 시작하기
- 튜토리얼
- do it! vue.js
- do it! vuejs
- 두잇 vue.js
- 두잇 vuejs
- vue.js 입문
- vue.js 입문서
- vue.js 프론트엔드 개발자
- 패스트캠퍼스
- Vue로 구현하는 PWA 캠프
- 인프런
- 누구나 다루기 쉬운 Vue.js
- 캡틴판교
- 장기효
---
{% include toc.html %}

## 들어가며
최근에 Vue.js를 소개하는 글을 올렸습니다. 그리고 이번에 Vue.js 입문서를 집필하면서
Vue.js의 가장 큰 장점은 학습 곡선이 낮다는 점이라고 강조를 했었는데요.
최신 기술을 빠르게 학습해야 하고 능통해야 하는 것이 프런트엔드 개발자의 숙명이긴 하지만,
굳이 많은 최신 기술들을 학습하지 않고도 웹 애플리케이션을 개발할 수 있는 프레임워크를
학습할 수 있다면 괜찮은 선택지이지 않을까요?

그렇다고 이번 글도 Vue.js 프레임워크에 대해 소개하지는 않습니다.
이번 글에서는 Vue.js 프레임워크를 사용할 때 알고 있으면 더 효율적으로 코딩할 수 있는
최신 자바스크립트 문법 4가지를 살펴보겠습니다.

혹시 Vue.js를 기존 자바스크립트(ES5)로 개발하고 계신다면 한번 읽어보기 좋은 글인 것 같아요.
그럼 많은 도움 되시길 바랍니다.

Do it! Vue.js 입문서 저자<br>
Captain Pangyo

## 서문
ES2015(ES6)는 현대 자바스크립트의 최신 스펙입니다. 만약 자바스크립트를 처음 접하셨거나 오랫동안 사용을 안 하셨다면
아래에서 살펴보는 ES6로 더 즐겁게 웹 개발을 하실 수 있을 겁니다.

Vue.js 개발자라면 ES6의 문법으로 더 편하게 코딩하실 수 있습니다.
하지만 Vue.js를 개발할 때 가장 많이 쓰이는 아래 4가지 문법을 먼저 익히시는 것을 추천드립니다.

이 글에서는 뷰로 개발할 때 주로 사용하는 ES2015 문법을 살펴보겠습니다.
- 화살표 함수 (Arrow Functions)
- 템플릿 리터럴 (Template literals)
- 모듈 (Modules)
- 구조 분해와 확장 문법 (Destructuring and spread syntax)

그럼 각 문법에 대해 간단히 설명하고 예제로 함께 살펴볼께요.

## 화살표 함수 (Arrow Functions)
화살표 함수는 자바스크립트로 함수를 선언할 때 사용하는 새로운 함수 정의 방식입니다.
기존에 저희가 알고 있던 자바스크립트 함수 선언 방식(ES5)과 다르고 더 짧은 코드로 선언할 수 있는 장점이 있습니다.

```js
// 일반적인 자바스크립트 함수(ES5)
function (인자) {
	함수 로직
}

// 화살표 함수(ES6)
(인자) => {
	함수 로직
}
```

#### this에 바인딩 하지 않는 특성
화살표 함수의 중요한 특징은 값을 `this`로 바인딩 하지 않는 것입니다.
대신에, 화살표 함수 안에서 선언한 `this`는 해당 함수가 수행되는 컨텍스트를 가리킵니다.

앞의 설명을 더 정확하게 이해하기 위해 함수를 실행하고 나면 콜백 함수를 인자로 받는 자바스크립트 배열 API를 살펴봅시다.
여기서는 `Array.filter()`를 예로 들겠습니다.
`filter()``는 콜백 함수에서 정의한 조건 값에 따라 기존 배열의 요소들을 걸러내어 새로운 배열을 반환해줍니다.

Vue.js의 장점은 데이터 속성, computed 속성, 메서드 속성들을 같은 뷰 객체 내부에서 쉽게 접근할 수 있다는 점입니다.
만약 콜백 함수를 ES5 방식으로 정의한다면 콜백 함수 내부에서 선언한 `this`는 뷰 컴포넌트 내부를 가리키지 않습니다.
따라서, 콜백 함수 안에서 뷰 컴포넌트의 데이터를 접근하려면 유효 범위를 이어주는 추가 코딩이 필요하죠.

아래 예제로 같이 살펴보겠습니다. `size`는 데이터 속성이고 `filterBySize`는 computed 속성입니다.
`filter()` API를 사용하기 전에 선언한 `let size = this.size;`는 콜백 함수 안에서 뷰 컴포넌트의 데이터 속성을 접근하기 위해 추가한 코드입니다.

```js
new Vue({
  data: {
    size: 'large',
    items: [ { size: 'small' }, { size: 'large' } ]
  },
  computed: {
    filterBySize() {
      let size = this.size;
      return this.items.filter(function(item) {
        return item.size === size;
        // 참고 : 여기서 this.size를 접근하면 undefined
      });
    }
  }
});
```

화살표 함수는 이와 반대로 `this`로 현재 컨텍스트를 가리킵니다.
위에서 살펴본 코드를 화살표 함수로 바꿔보면 아래와 같습니다.

```js
filterBySize() {
  return this.items.filter((item) => {
    return item.size === this.size;
  });
}
```

#### 시사점
이처럼 Vue.js는 화살표 함수를 여러 곳에서 유용하게 사용할 수 있지만 뷰로 개발할 때 무조건 화살표 함수만 사용해라 라는건 아닙니다.
아래와 같이 뷰 인스턴스의 속성들을 정의할 때는 화살표 함수를 사용하면 안 됩니다.

```js
// 일반적인 자바스크립트 함수(ES5)
var regular = new Vue({
  data: {
    val: 'Hello world'
  },
  computed: {
    upperCase: function() {
      return this.val.toUpperCase();
    }
  }
});
console.log(regular.upperCase); // HELLO WORLD

// 화살표 함수 (ES6)
var arrow = new Vue({
  data: {
    val: 'Hello world'
  },
  computed: {
    upperCase: () => {
      return this.val.toUpperCase();
    }
  }
});
console.log(arrow.upperCase);
// Uncaught TypeError: Cannot read property 'toUpperCase' of undefined
```

#### 인자 값이 1개인 경우
화살표 함수는 특정 상황에서 더 간결하게 작성할 수 있습니다. 만약 함수에 인자 값이 1개라면 ()는 안 써도 됩니다.
그리고 함수 정의 로직이 1줄이면 {}도 제거할 수 있습니다.

위에서 살펴본 filter() API를 줄여볼까요?

```js
filterBySize() {
  return this.items.filter(item => item.size === this.size);
}
```

## 템플릿 리터럴 (Template literals)
템플릿 리터럴은 기존 자바스크립트에서 문자열을 표시할 때 사용하는 작은 따옴표(')나 큰 따옴표(")
대신 백틱(`)을 사용하는 것을 의미합니다.

백틱(backtick)을 사용하면 아래와 같이 2가지 이점이 있습니다.
1. 문자열을 여러 줄에 걸쳐 표시할 수 있습니다. (뷰 컴포넌트의 템플릿 선언 시에 유용함)
2. 문자열과 자바스크립트 표현식을 함께 사용하기 좋습니다. (computed 속성 사용이 편함)

#### 여러 줄 표시
자바스크립트 파일에서 마크업 문법(HTML, CSS)을 작성하는 것은 쉽지 않습니다. 하지만, 뷰로 구현할 때 가끔은 필요할 때가 있습니다.
여기서 만약 템플릿에 마크업이 많이 들어가면 어떻게 될까요? 기존 자바스크립트 문법의 경우 아래와 같이 2개의 선택지가 있습니다.

첫 번째, 한 줄에 코드를 다 넣습니다.

```js
Vue.component({
  template: '<div><h1></h1><p></p></div>'
});
```

이렇게 하면 조금만 줄이 길어져도 읽기 힘듭니다.

두 번째, 여러 줄에 걸쳐서 코드를 표시합니다. 다만 자바스크립트의 파싱 원리를 생각했을 때, 각 줄을 바꿀 때마다 `+`로 연결해줘야 합니다.
이런 식으로 작성하면 나중에 편집하기가 정말 어렵죠.

```js
Vue.component({
  template: '<div>' +
            '<h1></h1>' +
            '<p></p>' +
            '</div>'
});
```

템플릿 리터럴을 이용하면 이런 문제점들이 깔끔하게 해결됩니다.
중간에 `+`를 붙일 필요도 없고 한 줄에 작성할 필요도 없죠.

```js
Vue.component({
  template: `<div>
              <h1></h1>
              <p></p>
            </div>`
});
```

#### 변수 삽입 표현식 (Embedded Expression)
템플릿 문법을 작성하다보면 가끔씩 변수의 값을 동적으로 표시하고 싶을 때가 있습니다.
뷰에서는 computed 속성에서 뷰 데이터를 동적으로 표현하는 경우가 많습니다.

일반적인 문자열 표현방식을 사용하게 되면 `+`로 문자열과 변수를 조합해주어야 합니다. 아래와 같이 말이죠.

```js
new Vue({
  data: {
    name: 'George'
  },
  computed: {
    greeting() {
      return 'Hello, ' + this.name + ', how are you?'
    }
  }
});
```

위처럼 코딩하면 확실히 편집하기도 힘들고 읽기도 어렵습니다.
하지만 반대로 템플릿 리터럴의 `${}` 문법을 활용하면 문자열을 쪼개지 않고도 동적으로 표현할 수 있습니다.

```js
new Vue({
  data: {
    name: 'George'
  },
  computed: {
    greeting() {
      return `Hello, ${this.name}, how are you?`
    }
  }
});
```

더 자세한 템플릿 리터럴은 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)을 참고하세요.

## 모듈 (Modules)
특정 자바스크립트 파일의 객체를 다른 파일에서 어떻게 로딩하시나요?
ES6가 나오기 전에는 자바스크립트 언어에서 특정 객체 & 파일 로딩 기능을 제공하지 않았습니다.
ES6에서는 모듈이라는 것을 이용하여 `import`와 `export` 문법으로 특정 내용을 로딩할 수 있습니다.

```js
// file1.js
export default {
  myVal: 'Hello'
}
```

```js
// file2.js
import obj from './file1.js';
console.log(obj.myVal); // Hello
```

모듈을 사용하면 2가지 이점이 있습니다.
1. 자바스크립트 애플리케이션을 여러 개의 파일로 분할할 수 있습니다.
2. 프로젝트 안에서 재사용이 가능한 코드를 생성할 수 있습니다.

#### 컴포넌트 모듈 (Component Modules)
뷰에서 모듈을 가장 잘 활용할 수 있는 부분이 바로 뷰 컴포넌트입니다.
ES5에서는 아래와 같이 컴포넌트 내용을 생성해야 합니다.

```js
// app.js
Vue.component('component1', { ... });
Vue.component('component2', { ... });
Vue.component('component3', { ... });

new Vue({ ... });
```

위와 같은 방식은 앱이 점점 커지면 app.js 파일의 내용도 점점 많아지는 단점이 있습니다.
모듈을 사용하면 app.js 파일이 아닌 다른 파일에서 컴포넌트 내용을 정의하고 불러올 수 있습니다.

```js
// component1.js
export default {
  // 컴포넌트 내용 정의
};
```

component1.js 파일에 정의한 컴포넌트 내용을 아래와 같이 불러옵니다.

```js
// app.js
import component1 from './component1.js';
Vue.component('component1', component1);

...
```

위와 같은 방식 이외에도 싱글 파일 컴포넌트(Single File Components) 체계를 활용하면
컴포넌트 기반으로 더 수월하게 프로젝트를 구성할 수 있습니다. 대신 웹팩(Webpack)이라는 빌드 도구가 필요합니다.

자바스크립트 모듈에 대해 더 알고 싶으시면 [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)를 살펴보세요.

## 구조 분해와 확장 문법
뷰 개발에 있어서 객체는 중요한 요소입니다. ES6의 새로운 문법을 이용하면 객체 속성을 더 쉽게 정의할 수 있습니다.

#### 할당 구조 분해 (Destructuring assignment)
ES6의 구조 분해(Destructuring) 문법을 이용하면 객체의 특정 값을 다른 변수에 할당하기가 쉽습니다.
`myObj` 객체를 이용한 예제를 살펴봅니다.

```js
let myObj = {
  prop1: 'Hello',
  prop2: 'World'
};

const prop1 = myObj.prop1;
const prop2 = myObj.prop2;
```

할당 구조 분해(Destructuring assignment)를 이용하면 위 문법을 아래와 같이 바꿀 수 있습니다.

```js
let myObj = {
  prop1: 'Hello',
  prop2: 'World'
};

const { prop1, prop2 } = myObj;

console.log(prop1); // Hello
```

위와 같은 문법은 뷰엑스(Vuex)를 다룰 때 유용하게 사용할 수 있습니다.
액션(Actions)에서 `state`와 `commit()`를 접근할 수 있는 `context` 객체를 받을 때 일반적으로 아래와 같이 코딩하죠.

```js
actions: {
  increment (context) {
   context.state
   context.commit(...)
  }
}
```

이때 구조 분해 문법을 이용하면 액션에서 `state` 속성을 사용할 필요가 없습니다.
commit() 메서드만 정의하면 되죠. 아래와 같이 액션 함수를 간소화하여 정의할 수 있습니다.

```js
actions: {
  increment ({ commit }) {
    commit(...);
  }
}
```

#### 확장 문법
확장 문법은 객체에 키(key), 값(value)이 많을 때 해당 객체의 값을 특정 객체의 값으로 쉽게 복사할 수 있습니다.
ES5에서는 객체의 특정 값들을 다른 객체로 복사할 때 아래와 같은 방식을 사용했었죠.

```js
let myObj = {
  prop1: 'Hello',
  prop2: 'World'
};

let newObj = {
  name: 'George',
  prop1: myObj.prop1,
  prop2: myObj.prop2
};

console.log(newObj.prop1); // Hello
```

위 코드에 확장 연산자 `...`를 적용해보면 더 편하게 객체의 값을 복사할 수 있습니다.

```js
let newObj = {
  name: 'George',
  ...myObj
};

console.log(newObj.prop1); // Hello
```

자 그럼 뷰엑스에 이 문법을 어떻게 적용하면 될까요?
기존 자바스크립트 방식에서 state 속성 선언하는 부분을 보겠습니다.

```js
// store.js
new Vuex.Store({
  state: {
    prop1: ...,
    prop2: ...,
    prop3: ...
  }
});
```

```js
// app.js
new Vue({
  computed: {
    prop1() {
      return store.state.prop1;
    },
    prop2() {
      return store.state.prop2;
    }
    ...
  }
});
```

뷰엑스에서 제공하는 *mapState* 함수를 이용하면 위 코드처럼 `state`에 일일이 접근하지 않아도 됩니다.

```js
import { mapState } from 'vuex';

var state = mapState(['prop1', 'prop2', 'prop3']);
console.log(state.prop1) // { ... }
```

또는 아래와 같이 `mapState`에 `...` 연산자를 붙여 computed 속성에서 쉽게 뷰엑스의 `state`에 접근할 수 있습니다.

```js
// app.js
import { mapState } from 'vuex';

new Vue({
  computed: {
    someLocalComputedProp() { ... },
    ...mapState(['prop1', 'prop2', 'prop3'])
  }
});
```

**P.S: 이 글은 원작자 Anthony의 허가를 받고 [4 Essential ES2015 Features For Vue.js Development](https://vuejsdevelopers.com/2018/01/22/vue-js-javascript-es6/?jsdojo_id=revue_esv&utm_campaign=Revue%20newsletter&utm_medium=Newsletter&utm_source=Vue.js%20Developers)를 번역한 글입니다.**
