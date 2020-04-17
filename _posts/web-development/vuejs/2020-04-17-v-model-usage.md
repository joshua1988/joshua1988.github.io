---
layout: article
title: 'v-model의 동작 원리와 활용 방법'
date: 2020-04-17 17:25:32 +0900
categories: [web-development, vuejs]
excerpt: 'v-model 동작 원리. 한글(IME) 입력 처리. 실용적인 컴포넌트 설계와 활용'
image:
  teaser: posts/web/vuejs/logo.png
  credit: Evan You
  creditlink: https://vuejs.org/
  #url to their site or licensing
locale: 'ko_KR'
# 리플 옵션
comments: true
tags:
  - Vue.js 정복 캠프
  - Vue.js 책
  - do it! Vue.js 입문
  - do it! vue.js
  - vue.js 입문서
  - vue.js 시작하기
  - vue.js 장점
  - vue.js 예제
  - vue.js 온라인 강의
  - vue.js 교육
  - vue.js 강좌
  - vue.js 강의
  - vue.js 입문
  - eslint
  - prettier
  - vue eslint
  - vue prettier
  - vue.js 프론트엔드 개발자
  - 패스트캠퍼스 vue.js 강의
  - 인프런 장기효
  - Age of Vue.js
  - 인프런 vue.js 강의
  - 장기효
  - 캡틴판교
  - captain pangyo
---

{% include toc.html %}

## 들어가며

오랜만에 글을 쓰네요. 오늘은 Vue.js로 Form 요소를 개발할 때 사용하는 `v-model` 속성에 대해서 살펴보려고 합니다. 이 속성은 그냥 사용하면 그렇게 어렵지 않은데 실제 애플리케이션을 개발할 때는 꽤 주의해서 다뤄야 합니다. 그럼 `v-model`의 동작 원리와 활용 방법 등에 대해서 알아볼게요!

## v-model 속성

공식 문서에 안내된 v-model 속성의 사용법은 아래와 같습니다.

```html
<input v-model="inputText">
```

```js
new Vue({
  data: {
    inputText: ''
  }
})
```

이렇게 사용자의 입력을 받는 UI 요소들에 `v-model`이라는 속성을 사용하면 입력 값이 자동으로 뷰 데이터 속성에 연결됩니다.

![v-model]({{ site.url }}/images/posts/web/vuejs/v-model/v-model.gif)

## v-model은 어떻게 동작할까?

`v-model` 속성은 `v-bind`와 `v-on`의 기능의 조합으로 동작합니다. 매번 사용자가 일일이 `v-bind`와 `v-on` 속성을 다 지정해 주지 않아도 좀 더 편하게 개발할 수 있게 고안된 문법인 거죠. 앞에서 살펴본 코드를 아래와 같이 변경하더라도 동일하게 동작합니다.

```html
<input v-bind:value="inputText" v-on:input="updateInput">
```

```js
new Vue({
  data: {
    inputText: ''
  },
  methods: {
    updateInput: function(event) {
      var updatedText = event.target.value;
      this.inputText = updatedText;
    }
  }
})
```

위 코드를 이해하기 위해서는 다음 3가지 사실을 알고 있어야 합니다.

- `v-bind` 속성은 뷰 인스턴스의 데이터 속성을 해당 HTML 요소에 연결할 때 사용한다.
- `v-on` 속성은 해당 HTML 요소의 이벤트를 뷰 인스턴스의 로직과 연결할 때 사용한다.
- 사용자 이벤트에 의해 실행된 뷰 메서드(methods) 함수의 첫 번째 인자에는 해당 이벤트(`event`)가 들어온다.

<p class="notice">HTML 입력 요소의 종류에 따라 `v-model` 속성이 각각 다음과 같이 구성됩니다. <br>
(1) input 태그에는 `value / input` <br>
(2) checkbox 태그에는 `checked / change` <br>
(3) select 태그에는 `value / change`
</p>

## 그럼 v-model이 더 편하니까 이거 쓰면 되는거죠?

빠르게 기능을 구현하고 프로토타이핑 해나갈 때는 `v-model`을 사용해도 상관없습니다. 다만, 현재 시점에서는 [IME 입력](https://en.wikipedia.org/wiki/Input_method)(한국어, 일본어, 중국어)에 대해서 아래와 같은 한계점이 있습니다.

![v-model-ime]({{ site.url }}/images/posts/web/vuejs/v-model/v-model-ime.gif)

위 화면을 보면 한글 입력의 경우 한 글자에 대한 입력이 끝나야지만 `inputText` 데이터가 인풋 박스의 텍스트 값과 동기화됩니다. 아마 조금 전에 살펴봤던 화면을 보면 더 쉽게 비교가 될 겁니다.

![v-model]({{ site.url }}/images/posts/web/vuejs/v-model/v-model.gif)

위와 같은 `v-model`의 한계점 때문에 뷰 공식 문서에서는 한국어 입력을 다룰 때 `v-bind:value`와 `v-on:input`를 [직접 연결해서 사용하는 것을 권고하고](https://vuejs.org/v2/guide/forms.html#Basic-Usage) 있습니다.

## v-model 문법을 이용해서 한국어를 처리할 순 없을까요?

이렇게 매번 한국어 입력을 처리할 때 `v-model` 대신에 직접 이벤트와 값을 조합해서 바인딩 하는 것이 귀찮게 느껴질 수 있습니다. 이럴 땐 아래와 같이 인풋 컴포넌트를 별도의 컴포넌트로 분리하면 `v-model`로 편하게 처리할 수 있습니다.

```html
<!-- BaseInput.vue - 싱글 파일 컴포넌트 구조-->
<template>
  <input v-bind:value="value" v-on:input="updateInput">
</template>

<script>
export default {
  props: ['value'],
  methods: {
    updateInput: function(event) {
      this.$emit('input', event.target.value);
    }
  }
}
</script>
```

위 코드의 동작을 간단하게 설명하자면 다음과 같습니다.

- `BaseInput` 컴포넌트의 상위 컴포넌트에서 `props`로 받은 `value`를 인풋 태그에 값으로 연결합니다.
- 인풋 태그에서 값이 입력되면 인풋 태그에서 `input` 이벤트가 발생하고 `updateInput` 메서드가 실행됩니다.
- `updateInput` 메서드에서 인풋 태그에 입력된 값을 상위 컴포넌트에 `input` 이벤트로 올려 보냅니다.

이제 이 컴포넌트를 등록해서 아래와 같이 사용할 수 있습니다.

```html
<!-- App.vue - 싱글 파일 컴포넌트 구조 -->
<template>
  <div>
    <base-input v-model="inputText"></base-input>
  </div>
</template>

<script>
import BaseInput from './BaseInput.vue';

export default {
  components: {
    'base-input': BaseInput
  },
  data: function() {
    return {
      inputText: ''
    }
  }
}
</script>
```

여기서 주의 깊게 살펴볼 만한 부분은 상위 컴포넌트에서 정의한 데이터 값을 하위 컴포넌트로 내려보내는 부분입니다. 

평소에 사용하던 프롭스 속성 대신에 `v-model`을 사용했는데요. 이미 앞 [v-model은 어떻게 동작할까?](#v-model은-어떻게-동작할까) 챕터에서 `v-model` 속성은 `v-bind:value`와 `v-on:input`을 조합해서 만들었다는 것을 배웠기 때문에 `v-model` 속성에 연결한 값이 하위 컴포넌트에 `value` 라는 프롭스 속성으로 내려간다는 사실을 추론할 수 있습니다.

## 마무리

오늘은 `v-model`의 기본 문법과 내부 동작 원리 그리고 한국어 입력을 좀 더 효율적으로 처리하는 방법에 대해서 알아보았습니다. 아무래도 이 글을 읽으시는 분들 중에 국내 사용자를 대상으로 웹 서비스를 제작하시는 분들이 많을 테니까요. 아무쪼록 제 글이 이분들께 도움이 되었으면 좋겠네요 😄

그럼 재밌게 코딩하시고 또 다음에 뵙겠습니다~!

## 밀착 지도를 받을 수 있는 오프라인 강의

강남역 패스트캠퍼스에서 2020년 4월 말부터 6월 초까지 두 달 동안 매주 월요일 수요일에 Vue.js 집중반 수업을 진행합니다. 관심 있으신 분들은 아래 이미지를 클릭해주세요 😄

<figure class="third">
	<a href="https://www.fastcampus.co.kr/dev_camp_vue/" target="_blank"><img src="{{ site.url }}/images/posts/web/fastcampus/vue.png"></a>
	<figcaption>패스트캠퍼스 Vue.js 정복 캠프(20.4.27 ~ 20.6.8)</figcaption>
</figure>

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