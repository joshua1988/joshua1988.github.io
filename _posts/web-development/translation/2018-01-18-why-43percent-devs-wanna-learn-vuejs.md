---
layout: article
title: "왜 43%의 프론트엔드 개발자들은 Vue.js를 배우고 싶어하나?"
date: 2018-01-18 17:45:32 +0900
categories: [web-development, translation]
excerpt: "(번역) 2017년에 가장 배우고 싶은 라이브러리 Vue.js 소개 글. 학습 자료와 링크가 첨부되어 있습니다."
image:
  teaser: posts/web/vuejs/logo.png
  credit: Evan You
  creditlink: https://vuejs.org/
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
최근 [Code School](https://www.codeschool.com/)의 창업자이자 명강사인 Gregg이 Vue.js 공식 소개 영상을 촬영하였습니다.
쉬운 설명과 짜임새 있는 강의 구성을 잘해서 개인적으로 많이 좋아하는 강사인데요.
이렇게 유명한 교육자가 Vue.js 진영으로 넘어왔다는 건 정말 기쁜 소식인 것 같습니다.

아래의 글은 얼마 전에 Gregg이 Vue.js의 공식 소개 영상을 글로 풀어놓은 [미디엄 기사](https://medium.com/vue-mastery/why-43-of-front-end-developers-want-to-learn-vue-js-7f23348bc5be)를 번역한 글입니다.
왜 전 세계 43%의 프런트엔드 개발자들이 뷰를 배우고 싶어 하는지 체감할 수 있는 글입니다.
가볍고 유연한 Vue.js 프레임워크의 특징과 배우기 쉬운 점을 가벼운 설명으로 잘 녹여내었죠.

프런트엔드 개발을 시작하시는 분들에게 좋은 정보가 되었으면 좋겠습니다.<br>

## 서문
전 세계 웹 개발자를 대상으로 한 [2017년 자바스크립트의 현황조사](https://stateofjs.com/2017/front-end/results/)에 따르면
Vue.js(이하 뷰 약칭)는 프런트엔드 개발자들이 가장 배우고 싶어 하는 프런트엔드 프레임워크입니다.

왜 이렇게 뷰가 선풍적인 인기를 끌고 있는지 제 생각을 나눠보려고 합니다.
아래에서 뷰로 간단한 앱을 만들어볼 거예요.

저는 최근에 에반 유(Vue.js 창시자), 크리스, 사라, 아담과 함께 뷰 소개 비디오를 만들었습니다.
소개 비디오는 [여기서](https://vuejs.org/) 찾으실 수 있구요. 아래의 글은 이 영상을 글로 풀어낸 것입니다.

## 위대한 자바스크립트의 진화
아마 다들 아시겠지만 자바스크립트는 지난 10년간 굉장히 많이 성장해왔어요.
서버 쪽에서 처리되던 코드들이 거의 다 브라우저로 넘어왔죠.
브라우저에서 처리해야 할 코드들이 많아지면서 프레임워크가 점점 더 그 코드들을 체계적으로 관리하게 되었습니다.

![angular, react, vue.js]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/1_angular-react-vue.png)

위에 보시는 프레임워크 앵귤러, 리액트, 뷰 중에 어떤 게 더 낫다 라고 얘기하지 않을 겁니다.
하지만, [Vue.js 공식 문서](https://vuejs.org/v2/guide/comparison.html)를 보시면 세 개의 프레임워크가 잘 비교되어 있으니 참고해보세요.

뷰는 진입 장벽이 낮고, 유연하고, 성능이 우수하고, 유지 보수와 테스팅이 편리한 자바스크립트 프레임워크입니다.
뷰는 또한 점진적인 프레임워크를 지향합니다. 이는 웹 애플리케이션 전체를 프레임워크로 구조화하지 않아도
웹 애플리케이션의 작은 부분에만 적용하여 특정 화면에 더 나은 사용자 경험을 제공할 수 있는 걸 의미해요.

아니면 웹 애플리케이션 전체를 처음부터 뷰로 구현할 수 있죠. 뷰는 거대한 규모의 애플리케이션을 개발할 수 있게
핵심 라이브러리와 주변 생태계를 제공합니다.
![점진적인 프레임워크로서의 vue.js]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/2_vuejs-flexibility.gif)

다른 프런트엔드 프레임워크처럼 뷰는 재사용이 가능한 컴포넌트로 웹 페이지를 구성할 수 있습니다.
각각의 컴포넌트는 각 페이지 영역을 표시하기 위해 필요한 HTML, CSS, 자바스크립트를 갖고 있죠.
![vue.js 컴포넌트로 구성한 웹 페이지 구조]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/3_components-in-page.png)

## 첫 번째 프로젝트 시작하기
뷰를 아직 사용 안 해보신 분들을 위해 뷰로 코딩하는 느낌이 어떤 건지 보여드리려고 합니다.
그리고 문법도 간단히 한번 살펴볼께요. 정말 자세한 내용은 다루지 않을 겁니다.
다만, 뷰의 주요 컨셉이 어떤 건지 알아볼게요.

대부분의 자바스크립트처럼 우리도 페이지에 데이터를 표시하는 것으로 시작해보겠습니다.
![데이터 집어넣기]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/4_insert-data-onpage.gif)

위 그림처럼 뷰로 'Boots'라는 데이터를 'X'에 넣고 싶으면 아래와 같이 구현합니다.
![vue.js 인스턴스로 표현하기]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/5_vue-instance.gif)

위에서 보시는 것처럼 뷰 라이브러리를 불러와서 뷰 인스턴스를 생성하고, 'app'이라는 화면 요소에 연결하였습니다.
여기서 `el`은 인스턴스가 뿌려질 화면 요소를 의미합니다. 그리고 `data` 안에 표시하고 싶은 값을 정의하여
화면에 {{ {{  }} }}로 연결했죠.

위 코드를 동작시키면 아래와 같이 나옵니다.
![vue.js 인스턴스 결과화면]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/6_first-result.gif)

여기서 특별한 건 없어요. 다만 데이터가 변할 때 뷰의 마법이 시작됩니다. 제가 이제 개발자 도구의 콘솔 창으로 가서
product의 값을 변경해볼게요. 어떤 일이 일어나는지 보세요.
![콘솔에서 데이터 변경]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/7_first-result-with-console.gif)

뷰는 리액티브(Reactive)합니다.
이 말은 웹 페이지 상에 표시된 데이터가 변할 때 뷰에서 다 알아서 그 변경을 처리하는 것을 의미합니다.
이 동작은 문자열뿐만 아니라 모든 유형의 데이터에 모두 적용됩니다. 어디 한번 문자열 대신에 배열을 넣어볼까요?
그리고 HTML은 아이템 목록을 나타낼 수 있게 ul 태그로 바꿨습니다.
product의 개수만큼 li 태그를 생성하려면 v-for라는 특별한 속성을 사용합니다.
이렇게 하면 데이터의 개수만큼 li 태그가 찍혀져 나오죠.
![v-for 디렉티브]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/8_v-for-directive-usage.png)

이제 브라우저로 가서 코드를 실행하면 아래와 같습니다.
![v-for 디렉티브 결과]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/9_v-for-directive-result.gif)

아직 코드가 살짝 부자연스럽네요. 어디 빈 배열로 시작해서 데이터를 불러와 담아볼까요?
불러올 데이터는 데이터베이스에서 가져온다고 가정합시다.
![API로 가져온 데이터 목록 표시하기]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/10_v-for-directive-with-apis.gif)

위 코드가 실행된 결과는 아래와 같습니다.
![vue.js 결과 화면]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/11_v-for-directive-with-apis-result.gif)

보시는 것처럼 현재 목록의 각 아이템은 데이터를 받아온 객체를 표시합니다.
좀 더 사용자가 보기 편하게 데이터 표현 방식을 아래와 같이 바꿔봅니다.
![vue.js의 데이터 표현방식]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/12_v-for-expression.gif)

그럼 결과는..
![vue.js 결과화면]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/13_v-for-exp-result.gif)

각 아이템 중에 혹시 개수(quantity)가 0인게 있으면 사용자가 인지할 수 있도록 조금 다르게 표시해볼까요?
span 태그로 `item.quantity === 0` 일 때만 OUT OF STOCK 텍스트가 나타나게 하겠습니다.
여기서 이 조건을 위해 v-if 디렉티브를 사용합니다.
![v-if 디렉티브 사용]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/14_v-for-another.gif)

아이템 중에 jacket의 재고가 다 떨어졌었네요. 아래와 같이 말이죠.
![v-if 디렉티브 vue.js 결과화면]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/15_v-if-directive-result.gif)

만약 모든 상품(product)의 총 재고량을 목록 아래에 표시하려면 어떻게 해야 할까요?
totalProducts라는 computed 속성을 활용하면 됩니다.
만약 자바스크립트 reduce() API가 익숙하지 않으시다면 여기서는 그냥 각 상품의 재고의 총합을 구하는 동작이라고 생각하세요.
![vue.js의 computed 속성]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/16_computed-prop.gif)

아래에서 볼 수 있듯이 이제 모든 상품의 총 재고량이 표시됩니다.
![vue.js의 computed 속성 결과 화면]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/17_computed-prop-result.gif)

자 이제 뷰 개발자 도구(Vue.js Chrome Extension)을 알아보기 좋은 시간이네요.
개발자 도구의 장점 중 하나는 페이지 상에 표시된 데이터를 살펴볼 수 있다는 점입니다.
![vue.js 개발자 도구]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/18_vue-devtool.gif)

뷰의 반응성(Reactivity: 데이터가 변함에 따라 뷰에서 반사적으로 화면을 변화시키는 특성)을 다시 살펴볼까요.
아이템 2개를 제거해보겠습니다. 아래 보시는 것처럼 상품 목록뿐만 아니라 남은 상품의 총 재고량도 바뀌네요.<br>

![vue.js 반응성 reactivity]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/19_vue-reactivity.gif)

다음으로, 버튼을 이용해서 페이지에 이벤트를 추가해보겠습니다.
각 상품 아이템에 Add라는 버튼을 추가합니다. 그리고 버튼을 클릭했을 때 각 상품의 재고량을 1개씩 늘리겠습니다.
![vue.js 버튼 클릭 이벤트 v-on]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/20_v-on-click.gif)

아래를 보시면 각 상품의 Add 버튼을 클릭했을 때 각 상품의 재고와 총 재고량 숫자가 올라갑니다.
그리고 Jacket 상품의 Add 버튼을 클릭하면 OUT OF STOCK이라는 글씨도 사라지네요.
![vue.js v-on 디렉티브 결과 화면]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/21_v-on-click-result.gif)

허나 여기서 만약 각 상품의 재고량을 그냥 수기로 입력하고 싶으면 어떻게 해야 할까요?
인풋 박스를 하나 만들고 v-model 디렉티브를 연결해봅니다. 그리고 입력되는 값은 항상 숫자라고 지정할게요.
![vue.js v-model 디렉티브]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/22_v-model.gif)

이제 모든 아이템의 재고 숫자를 직접 입력하여 변경할 수 있습니다.
만약 0을 입력하면 자연스럽게 OUT OF STOCK이 함께 표시되네요.
그리고 아까 추가했던 Add 버튼도 정상적으로 동작합니다.
![vue.js v-model 디렉티브 결과 화면]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/23_v-model-result.gif)

여기까지 살펴본 코드는 [JSFIDDLE](https://jsfiddle.net/greggpollack/gr1cs2tv/)에서 살펴볼 수 있습니다.

## 몇 개 더 살펴보는 뷰의 특징
만약 큰 애플리케이션을 만든다라고 하면 여러 개의 컴포넌트로 조합해야 합니다.
![vue.js single file components]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/24_single-file-components.png)

뷰는 CLI(Command Line Interface) 명령어 도구로 쉽게 프로젝트를 생성할 수 있습니다.
아래 명령어로 프로젝트를 시작하시면 돼요.(뷰 CLI 도구는 미리 설치되어 있어야 합니다)

![vue.js CLI 도구]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/25_vue-cli.png)

그리고 컴포넌트별로 .vue 파일을 생성해 관리할 수 있어요.
.vue 파일에는 HTML, 자바스크립트, 컴포넌트별 CSS & SCSS가 들어갑니다.
![vue.js 컴포넌트 체계]({{ site.url }}/images/posts/web/translation/why-43percent-devs-wanna-learn-vuejs/26_vue-components-system.gif)

자 지금까지 뷰가 할 수 있는 기능 중 정말 빙산의 일각만 보셨습니다.
뷰에는 프런트엔드 화면을 개발하고, 구성하고, 빌드 하기 위한 더 많은 기능들이 있죠.
만약 뷰를 배우고 싶어 하신다면 아래의 2가지 자료를 추천드립니다.

1. [VueMastery의 뷰 가이드 & CheatSheet](http://www.vuemastery.com/download-1)
2. [Vue.js의 공식 문서](https://vuejs.org/v2/guide/)

## 마무리
위에서 살펴본 그렉의 설명 말고도 가볍게 Vue.js의 특징을 살펴볼 수 있는 글이 있습니다.<br>
- [프런트엔드 개발자를 위한 Vue.js 입문서](https://joshua1988.github.io/web-development/vuejs/vuejs-tutorial-for-beginner/)

그리고 위 블로그 글이 마음에 드셨다면 저의 Vue.js 책으로 Vue.js를 시작해보시는 건 어떨까요? :)
- [Yes24 온라인 구매 링크](http://www.yes24.com/24/Goods/58206961?Acode=101)
- [교보문고 온라인 구매 링크](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791188612789&orderClick=LEA&Kc=)
- [이지스 퍼블리싱 도서 소개 페이지](http://www.easyspub.co.kr/20_Menu/BookView/PUB/185/PUB)

## Vue.js 온라인 강좌
책을 볼 시간이 없으시다면 아래 온라인 강좌로 빠르게 배워보시는 것도 좋을 것 같습니다 :)

<figure class="third">
	<a href="https://www.inflearn.com/course/Age-of-Vuejs/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/inflearn/age-of-vue.png"></a>
	<a href="https://www.inflearn.com/course/vue-pwa-vue-js-%EC%A4%91%EA%B8%89/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/inflearn/vue-intermediate.png"></a>
	<a href="https://www.inflearn.com/course/vue-js/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/inflearn/vue-advanced.jpg"></a>
	<figcaption>인프런 온라인 강좌 : Vue.js 시작하기, Vue.js 중급, Vue.js 완벽 가이드 (좌측 부터)</figcaption>
</figure>

## 밀착 지도를 받을 수 있는 오프라인 강의

강남역 패스트캠퍼스에서 8월 말부터 11월 초까지 8주 동안 Vue.js 집중반을 운영합니다. 관심 있으신 분들은 아래 이미지를 클릭해주세요 :)

<figure class="third">
	<a href="https://www.fastcampus.co.kr/dev_camp_wap/"><img src="{{ site.url }}/images/posts/web/fastcampus/wap.png"></a>
	<figcaption>패스트캠퍼스 Vue.js로 구현하는 PWA 캠프 8주 과정(19.08.24 ~ 19.11.02)</figcaption>
</figure>