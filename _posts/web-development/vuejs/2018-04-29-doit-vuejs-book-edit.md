---
layout: article
title: "'Do it! Vue.js 입문' 책 정오표 안내"
date: 2018-04-29 21:44:32 +0900
categories: [web-development, vuejs]
excerpt: "Do it! Vue.js 입문 책의 초판 수정 사항들을 안내합니다."
image:
  teaser: posts/web/vuejs/doit!_vue.js_cover.png
  credit: 장기효
  creditlink: http://easyspub.co.kr/20_Menu/BookView/A001/185
  #url to their site or licensing
locale: "ko_KR"
# 리플 옵션
comments: true
tags:
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
- Vue.js 중급 강좌
- Vue.js 중급 강의
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
- 장기효
- captain pangyo
---
{% include toc.html %}

## 들어가며
Vue.js 입문 책을 출간한 지 3개월가량 되었습니다. 많은 분들이 책에 관심 가져주시고 구매해주신 덕택에 벌써 초판 인쇄량 2,000권이 다 판매되었네요. 이 자리를 빌려 책을 구매해주신 독자분들께 감사드립니다.

처음 집필하면서 인쇄한 2,000부가 다 나갔기 때문에 추가 2,000부를 찍으려고 합니다. 초판(처음 인쇄한 책)에서 나왔던 오탈자와 오류를 잠깐 돌아보며 어떻게 개정될지 함께 알아보도록 하겠습니다.

## 수정된 부분 요약
이번에 수정한 부분들을 크게 분류해보면 다음과 같습니다.

1. Font Awesome 라이브러리의 버전 업에 따른 마크업 코드 수정
2. 책 조판 작업에서 발생한 오탈자와 오류 수정

상세한 수정 사항은 다음 내용을 참고하시기 바랍니다.

## 수정 사항

- 72 페이지 : 2번이 달린 template 속성에서 button과 v-on 사이의 불필요한 공백 제거

```html
<button v-on:click="showLog">show</button>
```

- 113 페이지 : 주석 처리된 ES5 문법의 `console.log("hi");` 앞에 인덴팅 부여

```js
// ES5 문법 - 위 ES6 문법과 동일한 코드
clickBtn: function () {
  console.log("hi");
}
```

- 115 페이지 : template 속성의 ':' 다음에 불 필요한 스페이스 1개 제거

```js
Vue.component('your-component', {
	template: `<div><span style="font-size:1.2em;"><button>{{ message }}</button></span></div>`
});
```

- 134 페이지 : Font Awesome 라이브러리 버전 업에 따른 CDN 주소 갱신 (위 코드, 아래 코드 다 적용)

```html
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css">
```

- 137 페이지 : 페이지 가운데 부분의 import 구문에서 `from` 에 코드 스타일 입히기

```js
import 불러온 파일의 내용이 담길 객체 from '불러올 파일 위치';
```

- 147 페이지 : i 태그의 클래스 명(아이콘 클래스) 수정

```html
<i class="addBtn fas fa-plus" aria-hidden="true"></i>
```

- 148 페이지 : `.addContainer` 스타일 속성을 `inline-block` -> `block`로 수정

```css
.addContainer {
	display: block;
}
```

- 153 페이지 상단 코드 : 체크 버튼과 삭제 버튼의 `i` 태그 클래스 명 수정

```html
<li v-for="todoItem in todoItems" class="shadow">
  <i class="checkBtn fas fa-check" aria-hidden="true"></i>
  {{ todoItem }}
  <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
    <i class="far fa-trash-alt" aria-hidden="true"></i>
  </span>
</li>
```

- 153 페이지 하단 코드 : style 태그에 `scoped` 속성 추가

```html
<style scoped>

</style>
```

- 155 페이지 코드 : `i` 태그의 클래스 명(아이콘 클래스) 수정

```html
<li v-for="(todoItem, index) in todoItems" class="shadow">
  <i class="checkBtn fas fa-check" aria-hidden="true"></i>
  {{ todoItem }}
  <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
    <i class="far fa-trash-alt" aria-hidden="true"></i>
  </span>
</li>
```

- 163 페이지 : `v-on:add Todo` 의 불필요한 공백 제거

```html
<TodoInput v-on:addTodo="addTodo"></TodoInput>
```

- 165 페이지 : `i` 태그의 클래스 명(아이콘 클래스) 수정

```html
<li v-for="(todoItem, index) in propsdata" class="shadow">
  <i class="checkBtn fas fa-check" aria-hidden="true"></i>
  {{ todoItem }}
  <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
    <i class="far fa-trash-alt" aria-hidden="true"></i>
  </span>
</li>
```

- 171 페이지의 `.list-item`, `.list-move` 스타일 속성 삭제

```html
<style>
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
```

- 172 페이지에 설명 추가 : 모달 소스 코드는 ~에서 HTML 부분의 transition 태그 코드와 CSS 부분을 복사해 가져옵니다. 복사한 transition 코드는 ...
- 173 페이지 상단 코드 수정 : 추가 버튼과 모달의 닫기 버튼의 `i` 태그 클래스명 수정

```html
<div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" placeholder="Type what you have to do" v-on:keyup.enter="addTodo">
    <span class="addContainer" v-on:click="addTodo">
      <i class="addBtn fas fa-plus" aria-hidden="true"></i>
    </span>

    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">경고</h3>
      <span slot="footer" @click="showModal = false">할 일을 입력하세요.
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </modal>
  </div>
```

- 173 페이지 하단 코드 수정 : `localStorage.setItem(value, value);`와 `this.propsdata.push(value);` 삭제 후 아래와 같이 변경

```js
this.$emit('addTodo', value);
```

- 178 페이지 참고 링크 수정 (뷰엑스 튜토리얼 -> 뷰엑스 한글 강의)

```html
뷰엑스 한글 강의 : https://www.inflearn.com/course/vue-pwa-vue-js-중급
```

## 마무리
이외에도 오류나 오탈자를 제보해주신 분들을 추첨하여 소정의 상품을 드리려고 합니다.
더 좋은 책을 함께 만들어 나가기 위한 독자분들의 소중한 의견을 기다립니다.

관심 가져주셔서 감사합니다. <br>
저자 장기효 드림
