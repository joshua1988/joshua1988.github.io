---
layout: article
title: "React 인가 Vue 인가?"
date: 2017-06-13 17:25:32 +0900
categories: [web-development, translation]
excerpt: "(번역) 프론트엔드 프레임워크 왕 React 와 신흥강자 Vue 를 프레임워크 특성에서 비교한 글"
image:
  teaser: posts/web/translation/react-or-vue-main.png
  credit: Anthony Gore
  creditlink: https://medium.com/js-dojo/react-or-vue-which-javascript-ui-library-should-you-be-using-543a383608d
  #url to their site or licensing
locale: "ko_KR"
# 리플 옵션
comments: true
tags:
- vuejs
- Vue JS
- vue 시작하기
- vue js 시작하기
- vue js 한글
- vue 소개
- vue js 입문
- react vs vue
- react
- react vue
- react vue 비교
- 프론트엔드 프레임워크 비교
- 프론트엔드 프레임워크
- frontend framework comparison
- 패스트캠퍼스
- 패스트캠퍼스 프론트엔드 웹앱 캠프
- vue 배우기
---
{% include toc.html %}

## 들어가며
Angular, React, Vue 와 같이 요즘 무수히 쏟아져 나오는 Front-End 프레임워크들을 보면 정말 "어떤 프레임워크를 써야 하는가?" , "어떤 프레임워크가 현재 진행하려는 프로젝트의 목적에 가장 부합하고, 프레임워크 특성을 헤치지 않고 장점을 살려 구현할 수 있을까?" 라는 질문을 스스로 수도 없이 하게 됩니다.

본 글은 **React or Vue: Which Javascript UI Library Should You Be Using?** 라는 원문을 번역한 글로써, 현재 가장 인지도가 높은 React 와 새로운 강자 Vue 를 Framework 특성 관점에서 장단점을 비교한 글입니다. 새로 Front-End 에 입문하셔서 어떤 프레임워크를 쓰실지 고민하시는 분이나, 기존 React 나 Vue 개발자분들 모두에게 도움이 될 것 같습니다.

그럼 재밌게 읽으시길 바라며.. <br>
-Captain Pangyo-

---
2016년 React 는 Javascript 웹 프레임워크 왕으로서 입지를 견고히 하였습니다. 특히 Web & Mobile 라이브러리 모두 빠르게 성장하며 주요 경쟁 상대인 Angular 보다 여유 있게 앞서 나가고 있죠.

하지만 2016년은 Vue 에게도 꽤 인상적인 한 해였습니다. 2.x 버전이 릴리즈 되면서 Javascript 커뮤니티 진영에 강한 인상을 남겼고, Vue 의 Github 리포지토리는 25,000 개 이상의 별을 획득했죠.

React 와 Vue 의 관점은 상당히 유사합니다. 둘 다 View Layer 에 집중된 경량 UI 라이브러리죠. 이 둘은 모두 간단한 프로젝트부터 복잡한 프로젝트까지 어느 프로젝트에도 사용할 수 있습니다.

결과적으로, **많은 웹 개발자들은 대체 어떤 프레임워크를 써야 하나? 늘 고민합니다.** 이 두 프레임워크에 우리가 알아야 할 명확한 장점과 단점이 있는지? 아니면 별반 차이가 없는 건지...?

## 두 개의 프레임워크와 각 프레임워크 지지자들
이 글에서 공정하고 철저한 분석을 통해 위 질문에 대한 답을 구하려고 합니다. 유일한 문제점은 제가 Vue 에 대해 선입견을 가진 낯 두꺼운 Vue 팬이라는 점이죠. 저는 올해 Vue 로 많은 프로젝트를 진행했습니다. Udemy 에 Vue [강의](https://www.udemy.com/vuejs-2-essentials/?couponCode=JSDOJO-MEDIUM)를 하고, Medium 에 기사를 쓸 정도로 말이죠.

편견을 가진 제 관점에서 벗어나기 위해, 훌륭한 자바스크립트 개발자이며 React 광팬인 Alexis Mangin 을 끌여 들었습니다. 이 친구는 React 에 푹 빠져있고, Web 과 Mobile 에 모두 React 를 많이 적용해봤죠.

Alexis 하루는 저에게 이렇게 물었습니다. "너 왜 React 말고 Vue 를 더 좋아해?" 제가 React 를 잘 몰랐기 때문에, 좋은 답변을 해주지 못했습니다. 그래서 이 친구에게 하루 날 잡고 까페에 노트북을 들고 가서, 서로 그렇게 좋아하는 Vue 와 React 라이브러리가 주는 장단점을 함께 살펴보자고 했죠.

그렇게 많은 토론과 양쪽의 입장에서 모두 배워보고 나니, 아래와 같이 6가지의 주요점이 나왔습니다.

## Templates 형식으로 앱 제작을 원한다면 Vue
Vue 앱에서는 HTML 파일에 마크업을 작성하는 게 기본 설정입니다. Angular 랑 비슷하게, 콧수염 괄호 `{{ "{{ " }} }}` 로 데이터 바인딩을 하고, 표준 HTML 태그 이외에 Directive 라는 특별 HTML Attritube 를 이용하여 Template 의 기능을 확장할 수 있습니다.

아래 코드는 간단한 Vue App 입니다. `Hello Vue.js!` 라는 message 를 출력하고, 버튼을 누르면 해당 메시지가 역순으로 바뀝니다.

```html
<div id="app">
  <p>{{ "{{ message" }} }}</p>
  <button v-on:click="reverseMessage">Reverse Message</button>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('');
    }
  }
});
```

이와는 반대로 React App 은 Template 구조를 사용하지 않고, 개발자가 JSX 를 사용하여 자바스크립트에서 DOM 을 생성합니다. 아래는 위 Vue 와 동일한 기능을 하는 React 코드입니다.

```html
<div id="app"></div>
```

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Hello React.js!'
    };
  }
  reverseMessage() {
    this.setState({
      message: this.state.message.split('').reverse().join('')
    });
  }
  render() {
    return (
      <div>
        <p>{this.state.message}</p>
        <button onClick={() => this.reverseMessage()}>
          Reverse Message
        </button>
      </div>
    )
  }
}
ReactDOM.render(App, document.getElementById('app'));
```

Template 은 전통적인 웹 개발 패러다임과 유사하므로 입문 개발자가 이해하기 쉽습니다. 그리고 심지어 숙련된 개발자분들께도 Functionality 동작과 태그 Layout 을 분리할 수 있어 선호되는 방식입니다. 또 Pug 와 같은 전처리기를 추가할 수 있는 옵션도 생기죠.

하지만 Template 은 표준 HTML 이외에 추가적인 HTML 구문을 학습해야 한다는 단점이 있습니다. React 의 render() 는 표준 HTML 과 Javascript 만 알면 되거든요. render() 는 또 쉽게 디버깅 하고 테스팅이 가능한 장점이 있습니다.

이 부분에서 알아두셔야 할 부분은 **Vue 가 버전 2.x 부터 Template 과 render() 를 모두 지원**한다는 사실입니다.

## 간단한 것과 "일단 동작" 되는 걸 좋아하면 Vue
간단한 Vue 프로젝트는 별도의 변환작업 (Transpilation) 없이도 브라우저에서 바로 동작이 됩니다. 이러한 부분이 jQuery 처럼 쉽게 프로젝트에 적용할 수 있는거죠.

React 도 기술적으로는 가능합니다만, 일반적인 React 코드는 JSX 와 ES6 (class, non-mutating array method)에 의존을 많이 하고 있습니다.

이와 다르게 Vue 의 단순함은 라이브러리 자체의 구조에서 더 진가를 발휘합니다. 이 두 라이브러리가 어떻게 application data (state) 를 처리하는지 보죠.

React 에서 state 는 불변(immutable) 의 속성을 가집니다. 그래서 직접적으로 변경할 수 없죠. 만약 상태를 변경하고 싶다면 아래처럼 setState() 를 사용해야 합니다.

```js
this.setState({
    message: this.state.message.split('').reverse().join('')
});
```

React 는 현재와 이전 상태를 비교하여 언제, 어떻게 다시 DOM 을 렌더링 할지 결정합니다. 그렇기 때문에 불변하는 속성이 필요하죠.

반대로, Vue 에서 data 는 변경될 수 있습니다. 아래는 `위의 React 의 message 와 같은 data 속성`을 직접 변경하는 모습입니다.

```js
// 아래의 message 속성은 Vue 인스턴스에서 접근 할 수 있습니다.
this.message = this.message.split('').reverse().join('');
```

Vue 의 렌더링 시스템이 React 보다 효율성이 떨어진다고 결론짓기 전에, Vue 가 실제로 어떻게 렌더링을 하는지 더 자세히 살펴보면: state 에 새로운 객체를 추가했을 때, Vue 가 해당 객체의 모든 속성을 확인하고 나서 getter 와 setter 로 변환합니다. Vue 의 reactivity system 이 모든 상태를 모니터링하여 변경이 일어날 때마다 자동으로 DOM 을 다시 렌더링 합니다.

더 인상적인 부분은, Vue 에서 state 를 간단하게 변경할 수 있을 뿐만 아니라, Vue 의 렌더링 시스템이 React 보다 빠르고 더 효율적이라는 것이죠.

Vue 의 reactivity system 에도 몇가지 주의할 점이 있습니다. 예를 들어, *속성 추가 및 삭제* 그리고 *특정 배열에 대한 변경*을 감지하지 못합니다. 물론 이러한 부분들을 React 처럼 Vue set() API 로 해결할 수 있습니다.

## 빠르고 경량의 앱을 제작하고 싶다면 Vue
React 와 Vue 모두 Virtual DOM 을 만들어 앱의 state 가 변할 때 실제 DOM 과 일치시킵니다. 두 라이브러리 모두 이 과정을 제 나름대로 최적화 합니다.

Vue 의 핵심 엔지니어들이 진행한 테스트에서 Vue 의 렌더링 시스템이 React 보다 빠르다는 걸 아래와 같이 증명했습니다. *테스트 조건 : 1개 list (1만개 items) 를 100 번 렌더링*

![vue-vs-react]({{ site.url }}/images/posts/web/translation/vue-react-benchmark.png)

실용적인 관점에서 봤을 때, 이 테스트 결과는 몇몇의 특정 케이스에만 해당이 될 겁니다. 대부분의 앱에서는 이러한 동작이 필요가 없을 테니 여기에 너무 치우쳐서 두 라이브러리를 비교하면 안 되겠죠.

하지만 웹 페이지의 용량은 모든 프로젝트에 상관있습니다. 현재 릴리즈된 Vue 의 라이브러리 크기가 **25.6KB** 인 반면, 이 Vue 라이브러리와 동일한 기능을 하도록 React 의 부가 라이브러리로 구성한 React 라이브러리 (React DOM 37.4KB + React Addons Library 11.4KB) 의 크기는 **48.8KB** 입니다. 거의 2배에 육박하죠. React 가 더 많은 API 를 제공한다 하더라도, 그 양만큼 Vue 보다 더 기능성을 비례해서 제공하진 않습니다.

## 큰 규모의 앱을 만드신다면 React
이 글의 앞 부분에서 보여드렸던 Vue 와 React 로 각기 구현한 간단한 앱의 비교 기억하시죠? 아마 그 비교로 인해 개발자들이 Vue 가 더 좋은 라이브러리구나 라고 판단하실 수도 있습니다. 왜냐하면 Template 에 기반한 앱이 가독성이 더 좋고 배우기도 편하실 테니까요.

허나, 이러한 초기의 혜택들이 앱의 규모가 점점 더 커질 때 기술 부채를 안겨줍니다. Template 은 런타임 에러가 나오기 쉽고, 테스트하기가 어려우며 재구조화 하기 어렵기 때문이죠.

반대로, Javascript 으로 만들어진 Template 은 컴포넌트로 구성하기 쉽고, 재사용성이 높으며 테스트 하기가 용이합니다.

Vue 또한 컴포넌트 체계와 render functions 을 갖고 있습니다. 그러나 React 의 렌더링 시스템이 더 정밀한 구성이 가능하고, shallow 렌더링 과 같은 기능들을 갖고 있습니다. 테스팅 도구와도 결합할 수 있어, 테스트하기 수월하고 더 유지보수 가능한 코드를 만들 수 있죠.

React 에서 application data 의 불변 속성이 처음에는 복잡해 보일 수 있지만, 복잡한 규모의 앱에서는 테스트와 투명도 측면에서 빛을 발할 겁니다.

## 더 큰 개발 생태계를 원한다면 React
아래 표에서 볼 수 있듯이, React 가 가장 인기 있는 라이브러리라는 사실은 부정할 수 없습니다. React 는 한 달 기준 **250만** NPM 다운로드 수를, Vue 는 **22.5만** NPM 다운로드 수를 보이고 있죠.

![vue-react-npm-downloads]({{ site.url }}/images/posts/web/translation/vue-react-npm-downloads.png)

인기가 많다는 건 단순히 인지도 측면 외에도, 더 많은 튜토리얼과 기사들 + Stack Overflow 의 더 많은 질의응답이 있다는 걸 의미합니다. 그리고 더 많은 툴과 확장 라이브러리들이 존재하기 때문에 개발자가 쉽게 재사용할 수 있는 이득이 있죠.

두 라이브러리 모두 오픈소스이긴 하지만, React 는 Facebook 에서 시작해서 유지관리되고 있습니다. 이런 측면에서 React 를 사용하는 개발자나 기업 모두 확실히 React 의 지속적인 버전업을 신뢰할 수 있죠.

이와는 반대로, Vue 는 1 명의 개발자 Evan You 에 의해서 제작되었습니다. Evan 은 현재 Vue 의 유지보수를 전업으로 하고 있죠. Vue 가 몇몇 기업의 후원을 받고 있기는 합니다만, Facebook 이나 Google 의 규모는 아니죠.

여기서 Vue Team 을 좀 더 칭송하자면, 상대적으로 적은 규모의 인원수와 기업에서 전적으로 후원받지 않는 체계에서도 훌륭한 퍼포먼스를 내고 있습니다. Vue 는 정기적으로 버전을 릴리즈 하고 있으며, 현재 Github 에서 54 개의 open issues (3456 closed issues) 밖에 존재하지 않고, React 는 530 개나 되는 open issues (3447 closed issues) 가 존재합니다.

## 기존에 이미 익숙한 게 있으면 바꾸실 필요는 없어요
자 그럼 위 장문의 글을 정리해볼까요.

Vue 의 장점은
- Template 과 Render Function 을 모두 사용할 수 있는 옵션
- 간편한 Syntax 와 프로젝트 설정
- 빠른 렌더링과 더 작은 용량

React 의 장점은
- 큰 규모에서 더 빛을 발하고, 테스팅이 수월
- Web 과 Native 앱 개발에 모두 사용 가능
- 더 큰 개발자 생태계에서 오는 많은 레퍼런스와 도구들

하지만, React 와 Vue 이 다른 점보다는 유사점을 더 많이 갖고 있는 기상천외한 UI 라이브러리입니다.
이 두 라이브러리의 공통된 특장점은
- Virtual DOM 으로 빠른 렌더링
- 경량 라이브러리
- Reactive Component
- Server Side Rendering
- 라우터, 번들러, state management 와 결합이 쉬움
- 훌륭한 개발자 커뮤니티와 지원

혹시 제가 이글에서 놓친 부분이 있다면, 아래 댓글에 남겨주세요 :)
Happy Developing Everybody!

---
**Special thanks to Anthony Gore who has allowed me to translate [this article](https://medium.com/js-dojo/react-or-vue-which-javascript-ui-library-should-you-be-using-543a383608d) in Korean.**

---

## Vue.js 온라인 강좌
만약 Vue.js에 흥미가 생기신다면 아래 온라인 강좌로 빠르게 배워보시는 것도 좋을 것 같습니다 :)

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