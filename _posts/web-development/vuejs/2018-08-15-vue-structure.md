---
layout: article
title: "실무에서 사용하는 Vue.js 프로젝트 구조"
date: 2018-08-15 18:54:32 +0900
categories: [web-development, vuejs]
excerpt: "Vue.js 프로젝트 구조가 복잡해졌을 때의 폴더 구조는 어떻게 가져가는 것이 좋을까?"
image:
  teaser: posts/web/vuejs/vue-camp.png
  credit: Fast Campus
  creditlink: https://www.fastcampus.co.kr/dev_camp_vue/
  #url to their site or licensing
locale: "ko_KR"
# 리플 옵션
comments: true
tags:
- 장기효
- Vue.js 정복 캠프
- Vue.js 프로젝트 구조
- Vue.js 폴더 구조
- Vue.js CLI
- Vue.js 책
- do it! Vue.js 입문
- do it! vue.js
- vue.js 입문서
- vue.js 시작하기
- vuejs 시작하기
- vue.js 튜토리얼
- vuejs 튜토리얼
- vue.js 장점
- vue.js 강좌
- vue.js 예제
- vue.js 강의
- vue.js 강좌
- 튜토리얼
- vue.js 입문
- vue.js 프론트엔드 개발자
- 패스트캠퍼스
- 인프런
- 캡틴판교
- captain pangyo
---
{% include toc.html %}

## 들어가며

뷰의 장점은 빠른 프로토 타이핑입니다.
뷰 CLI로 프로젝트를 생성하고 나면 npm으로 원하는 기능들을 빠르게 확장해 나갈 수 있습니다.

이번 글에서는 복잡해진 프로젝트 폴더 구조를 효율적으로 관리하는 방법에 대해서 알아보겠습니다.
철저히 저의 개인적인 의견이 반영된 폴더 구조이기 때문에 참고하시고 필요한 것만 취해가시면 될 것 같습니다 :)

## 뷰 CLI로 생성한 기본 폴더 구조

뷰 CLI 2.9 버전을 이용하여 webpack-simple 프로젝트를 아래와 같이 생성합니다.

```bash
vue init webpack-simple folder-structure
```

프로젝트를 생성하고 나면 기본적인 폴더 구조는 아래와 같이 구성됩니다.

```bash
.
├─ README.md
├─ index.html
├─ webpack.config.js
├─ package.json
└─ src
   ├─ main.js
   ├─ App.vue
   └─ assets
      └─ logo.png
```

위와 같은 프로젝트 구조에서는 일반적으로 src 폴더 밑에 폴더들을 추가해나갑니다.
자세한 내용은 아래에서 확인하겠습니다.

## 기능 별로 구분한 폴더 구조

실무에서 개발할 때 필수로 사용되는 라우터, 상태 관리, 필터, 다국어, 플러그인 등을 이용하면 아래와 같이 폴더를 구분할 수 있습니다.

```bash
.
├─ README.md
├─ index.html
├─ webpack.config.js
├─ package.json
└─ src
   ├─ main.js
   ├─ App.vue
   ├─ components        컴포넌트
   │  ├─ common
   │  └─ ...
   ├─ routes            라우터
   │  ├─ index.js
   │  └─ routes.js
   ├─ views             라우터 페이지
   │  ├─ MainView.vue
   │  └─ ...
   ├─ store             상태 관리
   │  ├─ auth
   │  ├─ index.js
   │  └─ ...
   ├─ api               api 함수
   │  ├─ index.js
   │  ├─ users.js
   │  └─ ...
   ├─ utils             필터 등의 유틸리티 함수
   │  ├─ filters.js
   │  ├─ bus.js
   │  └─ ...
   ├─ mixins            믹스인
   │  ├─ index.js
   │  └─ ...
   ├─ plugins           플러그인
   │  ├─ ChartPlugin.js
   │  └─ ...
   ├─ translations      다국어
   │  ├─ index.js
   │  ├─ en.json
   │  └─ ...
   ├─ images            이미지
   ├─ fonts             폰트
   └─ assets            기타 자원
```

위와 같이 프로젝트를 구성하기 위해서는 기본적으로 ES6의 Import & Export 기능을 정확히 이해하고 계셔야 합니다.
그리고 웹팩의 모듈 로딩에 대해서도 이해하고 계시면 다른 파일의 기능들을 좀 더 수월하게 로딩하실 수 있습니다.
마지막으로, VSCode의 파일 아이콘 테마를 잘 활용하시면 더 수려하고 가독성 높은 폴더 구조를 만드실 수 있습니다 :)

<figure>
	<img src="{{ site.url }}/images/posts/web/vuejs/folder-structure.png">
	<figcaption>VSCode에서 확인한 프로젝트 구조</figcaption>
</figure>

## 마무리

각 폴더의 예시 코드도 함께 올리고 싶으나 글이 너무 길어질 것 같아 나중에 기회가 되면 오픈소스로 공개하려고 합니다.
혹시 폴더 구조와 관련하여 더 괜찮은 의견이 있으시면 아래에 편하게 댓글로 남겨주세요 :)

그럼 오늘도 즐겁게 코딩하시기 바랍니다!
[※이미지 출처: 패스트 캠퍼스 Vue.js 강의](https://www.fastcampus.co.kr/dev_camp_vue)

## 글보다 더 쉽게 배우는 온라인 강좌
좀 더 친절하고 상세한 설명을 원하신다면 아래 강좌를 이용해보시는 것도 좋을 것 같아요 :)

<figure class="third">
	<a href="https://www.inflearn.com/course/vue-pwa-vue-js-%EA%B8%B0%EB%B3%B8/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/inflearn/vuejs-basic.png"></a>
	<a href="https://www.inflearn.com/course/vue-pwa-vue-js-%EC%A4%91%EA%B8%89/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/inflearn/vue-intermediate.png"></a>
	<a href="https://www.inflearn.com/course/vue-js/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/inflearn/vue-advanced.jpg"></a>
	<figcaption>인프런 온라인 강좌 : Vue.js 초급, Vue.js 중급, Vue.js 완벽 가이드 (좌측 부터)</figcaption>
</figure>

## 밀착 지도를 받을 수 있는 오프라인 강의

강남역 패스트캠퍼스에서 3월부터 4월까지 6주 동안 Vue.js 집중반을 운영합니다. 관심 있으신 분들은 아래 이미지를 클릭해주세요 :)

<figure class="third">
	<a href="https://www.fastcampus.co.kr/dev_camp_vue/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/vuejs/vue-camp.png"></a>
	<figcaption>패스트캠퍼스 Vue.js 정복 캠프 6주 과정(19.03.04 ~ 19.04.10)</figcaption>
</figure>