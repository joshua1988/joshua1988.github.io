---
layout: article
title: "Do it! Vue.js 입문 책을 집필하면서.."
date: 2018-01-26 13:44:32 +0900
categories: [web-development, vuejs]
excerpt: "Vue.js 프레임워크를 소개하고 책의 집필 의도와 집필 과정을 설명합니다. Vue.js 관련 학습 자료도 안내합니다."
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
- vuejs란
- vue.js
- vuejs
- vuejs vuex
- vuex 입문
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
안녕하세요. 웹 개발을 좋아하고 새로운 기술을 배워 공유하는 것을 즐기는 웹 개발자 캡틴판교입니다.
2014년부터 기술 블로그를 시작해서 현재의 기술 블로그에 안착하기까지 수백 개의 웹 관련 기술 글을 공유해왔는데요.
오늘은 특별히 새로운 기술이 아닌 책 하나를 소개하려고 합니다.
바로 제가 최근에 집필한 'Do it! Vue.js 입문' 책입니다.

<figure>
	<img src="{{ site.url }}/images/posts/web/vuejs/doit!_vue.js_cover.png">
	<figcaption>Do it! Vue.js 입문 표지</figcaption>
</figure>

<!-- ![Do it! Vue.js 입문]({{ site.url }}/images/posts/web/vuejs/doit!_vue.js_cover.png) -->

이 책이 어떤 책인지는 아래의 두 링크를 참고하시면 자세히 알 수 있습니다.
- [출판사 도서 소개란](http://www.easyspub.co.kr/20_Menu/BookView/PUB/185/PUB)
- [온라인 서점의 책 소개](http://www.yes24.com/24/Goods/58206961?Acode=101)

이 글에서는 다른 곳에서 읽을 수 없는 책 집필 과정과 그 과정 속에서 느낀 점들을 공유하려고 합니다.
그럼 재밌게 읽으시길 바랍니다 :)

## Vue.js 프레임워크란?
먼저 Vue.js 프레임워크가 무엇인지 소개를 하자면 Vue.js는 웹 사이트를 만들 수 있는 웹 개발자들의 도구입니다.

웹 사이트를 만들기 위해서는 HTML, CSS, Javascript와 같은 웹 기술이 필요합니다.
이 3가지 웹 기술로도 요즘 저희가 많이 사용하는 페이스북, 네이버, 구글 등 여러 가지 유형의 사이트를 만들 수 있습니다.

그런데 왜 프레임워크를 사용해서 만들까요? 그 이유는 더 쉽고 빠르게 웹 사이트를 만들 수 있기 때문입니다.
정형화된 방식으로 미리 만들어진 기능들을 편하게 가져다가 다시 사용하기 때문에
백지상태에서 시작하는 것보다는 확실히 더 빠르게 일정 이상의 좋은 품질로 개발할 수 있죠.

화면을 쉽게 개발할 수 있는 프런트엔드 프레임워크는 2000년대 중후반부터 등장했습니다.
그리고 많은 프런트엔드 프레임워크를 거쳐 지금의 Vue.js에 이르기까지 수많은 프레임워크가 등장했죠.
그래서 요즘 웹 사이트를 개발한다고 하면 엄청나게 많은 도구의 선택지가 있습니다.

좋죠. 일단 선택지가 많으니 뭐든 잘 배워서 개발할 때 써먹으면 되니까요.
하지만, 반대로 생각해보면 정말 너무 많습니다. 네 저도 지금 4년 동안 회사에서 웹 개발을 해왔는데
배우는 걸 멈춰본 적이 없습니다. 맨날 새로운 게 튀어나오고 그러면 또 배우고..

그래서 요즘에는 이런 상황에 고통받는 웹 개발자들이 한 둘이 아닙니다. 제 주변만 봐도 그렇거든요.
'아 또 나왔네......'라면서 한숨을 쉬는 개발자들이 있습니다. 저도 한숨까지는 아닌데 아 공부할게 하나 더 늘었구나라고 생각은 하죠 :)

Vue.js 프레임워크는 이런 현재 상황에서 가장 쉽게 접근할 수 있는 프레임워크입니다.
요즘 업계에서 많이 사용되는 앵귤러, 리액트와 다르게 HTML, CSS, 자바스크립트 이외에 꼭 알고 있어야 하는 기술도 없으며
프레임워크 자체가 가볍고 쉬운 프레임워크를 지향하기 때문에 배우기가 쉽습니다.

또한 배우기가 쉽다는 점 때문에 더 많은 입문자들에게 관심을 받고 있다고 생각합니다.
그리고 기존에 프런트엔드 개발을 하지 않았던 다른 분야의 개발자들도 Vue.js로 쉽게 웹 개발을 시작하고 있습니다.

## 서적을 집필하면서..
책을 잠깐 소개하겠습니다.

**Do it! Vue.js 입문서는 Vue.js 프레임워크를 처음 배우는 사람들이 쉽게 프레임워크를 배울 수 있도록 집중한 책입니다.**

처음 출판사와 도서를 기획하고 목차를 구성하면서 어떻게 하면 이 쉬운 Vue.js 프레임워크를 더 쉽게, 빠르게, 재밌게 알려줄 수 있을까? 라는 고민을 했습니다.
작년에 [패스트 캠퍼스](http://www.fastcampus.co.kr/dev_camp_wap/)와 [인프런](https://www.inflearn.com/course/vue-pwa-vue-js-%EA%B8%B0%EB%B3%B8/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner)에서 강의를 하면서 검증했던 교재와 자료들을 중심으로
수업 중간중간에 수강생들이 이해하지 못하던 부분들, 특히 질문이 많았던 부분들을 어떻게 책에 잘 녹여낼지에 대한 고민을 가장 많이 했습니다.
생각해보면 이 책을 가장 필요로 하는 웹 개발 입문자, 퍼블리셔, 대학생, 실무자를 대상으로 수업을 진행했기에 수업에서 나온 피드백이 정말 소중했었죠.

처음에 초고를 쓸 때 그 내용을 책 안에 담는 게 쉬운 작업은 아니었습니다. 기술 서적을 처음 집필하는 입장에서 어떻게 써야지 독자들이 더 쉽게 읽을 수 있을지
감이 잘 안 왔었거든요. 그때 다행히 기술서 편집 경험이 많은 노련한 편집자님을 만나 요약된 정보 위주로 전달하는 블로그 글 형식에서 더 친절하고 쉽고 자세히
설명하는 글 형식으로 탈바꿈할 수 있었습니다.

책 전체를 교정하는 과정에서 특정 부분은 최소 7번 이상 다시 썼던 것 같아요. 편집자님이 쉽고 자세한 설명을 요구했었기 때문이기도 했지만
제 스스로도 다시 읽었을 때 이상하다 싶은 부분들은 그냥 넘어가지 않고 몇 번이고 다시 고쳤습니다. 그렇게 전체 원고를 최소 8번 넘게 정독한 것 같습니다.

또한, 글로 쉽게 설명하기 어려운 부분들은 도형과 그림으로 풀어냈습니다. 그림과 도형 같은 경우에도 제가 한번 쓱 그리고 끝내는 것이 아니라
1차로 제가 작업한 그림을 개발 지식이 있는 전문 디자이너 분께 2차 작업을 맡겼고, 3차로 다시 디자이너 분과 논의하면서 도형을 다듬었습니다.
그리고 4차, 5차 작업을 편집자님, 개발을 모르는 기획자분께 검토 받으며 어느 관점에서 보든지 그 글을 쉽게 이해할 수 있는 그림으로 선정했습니다.

책 작업을 하는 내내 생각했던 1가지는 '내 스스로도 납득이 가지 않는 글은 책에 담지 말자' 였습니다.
그렇기에 글의 흐름, 단어 설명, 도형과 그림, 예제 코드 등 책의 모든 부분을 하나도 빠짐없이 꼼꼼히 읽고 검토했습니다.

그리고 그 검토 작업에 고맙게도 많은 분들이 도움을 주셨어요. 모든 집필/편집 과정을 함께해준 편집자님,
직관적인 그림과 도형을 그려준 디자이너 겸 개발자님, 전체적인 책의 오탈자와 구성 오류를 검토해준 기획자님,
그리고 베타 리딩과 기술 검수를 맡아준 개발자 두 분까지 합하면 벌써 이 책에는 저 혼자가 아닌 6명의 노력과 시간이 들어갔네요.
그 외에도 조판하는 회사의 직원과 이 책을 함께 검토해주는 출판사 직원까지 생각하면 정말 많은 분들이 좋은 책을 내기 위해 함께해주신 것 같습니다.

그래서인지 이제 내일 서점에 출간될 Do it! Vue.js 입문 책을 자신 있게 추천할 수 있습니다.
혹시 웹 개발을 시작하고 싶다면 Do it! Vue.js 책으로 시작해보시는 건 어떨까요? :)

읽어주셔서 감사합니다.<br>
-저자 장기효 올림

**P.S : 여러 명의 땀과 노력이 들어간 Do it! Vue.js 도서는 아래 링크에서 구매하실 수 있습니다 :)** <br>
[Do it! Vue.js 온라인 구매 링크](http://www.yes24.com/24/Goods/58206961?Acode=101)

아 그리고 지금 출간 기념으로 도서 이벤트를 진행 중입니다 :) <br>
[이지스 퍼블리싱 Do it! Vue.js 이벤트 페이지](https://www.facebook.com/easyspub/posts/1568634209891378)

## Vue.js 학습 자료
- [프런트엔드 개발자를 위한 Vue.js 입문 튜토리얼](https://joshua1988.github.io/web-development/vuejs/vuejs-tutorial-for-beginner/)
- [React 인가? Vue 인가?](https://joshua1988.github.io/web-development/translation/vue-or-react/)
- [Angular 2 대신에 Vue.js를 선택한 이유?](https://joshua1988.github.io/web-development/translation/why-we-moved-from-angular2-to-vuejs/)
- [왜 43%의 프런트엔드 개발자들은 Vue.js를 배우고 싶어 하나?](https://joshua1988.github.io/web-development/translation/why-43percent-devs-wanna-learn-vuejs/)
- [Vuex 튜토리얼](https://joshua1988.github.io/web-development/vuejs/vuex-start/)
- [Vue.js 한글 강의, 인프런](https://www.inflearn.com/course/vue-pwa-vue-js-%EA%B8%B0%EB%B3%B8/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner)
- [이지스 퍼블리싱 도서 소개 페이지](http://www.easyspub.co.kr/20_Menu/BookView/PUB/185/PUB)
- [Yes24 온라인 구매 페이지](http://www.yes24.com/24/Goods/58206961?Acode=101)

## 글보다 더 쉽게 배우는 온라인 강좌
뷰를 좀 더 빠르게 학습하고 싶은 분들께 아래 온라인 강좌를 추천합니다.

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