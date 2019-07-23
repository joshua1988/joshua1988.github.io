---
layout: article
title: "Angular 2 대신에 Vue.js를 선택한 이유 (그리고 React를 선택하지 않은 이유)"
date: 2017-09-06 18:04:32 +0900
categories: [web-development, translation]
excerpt: "(번역) 실제 프로젝트에서 고민한 프레임워크 선정 과정과 Angular, React, Vue 의 비교"
image:
  teaser: posts/web/translation/angular-vue.png
  credit: Huy Nguyen
  creditlink: https://blog.holistics.io/why-and-how-we-migrated-from-angularjs-to-vuejs/
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
- angular vue
- angular2
- angular vs vue
- angular2 vs vue
- 앵귤러 뷰
- 뷰
- react vs vue
- react
- react vue
- react vue 비교
- 프론트엔드 프레임워크 비교
- 프론트엔드 프레임워크
- frontend framework comparison
- 패스트캠퍼스
- 패스트캠퍼스 프론트엔드 웹앱 캠프
- 인프런 뷰 강의
- 뷰 강의
- 뷰 강좌
- vue 배우기
---
{% include toc.html %}

## 들어가며
이 글은 Medium 의 "Why we moved from Angular 2 to Vue.js(and why we didn’t choose React)" 글을 번역한 글입니다.

항상 이상적일 수만은 없는 실제 프로젝트 여건에서 신중하게 프레임워크를 고민하고 선정해 나가는 과정을 상세하게 기술한 글입니다.
Angular 2로 구축되어 있는 프로젝트를 업그레이드 & 마이그레이션 하는 과정에서
프로젝트의 현 상황과 여건을 반영한 프레임워크 선정 기준을 세우고, Vue.js 프레임워크를 적용해 나가는 개인 경험담이 담겨져 있습니다.

급격하게 요동치는 프론트엔드 프레임워크 시대에, 프론트엔드 개발자로서 항상 어떤 프레임워크를 선정해야 할지 고민하는 데
인사이트를 제공하는 글이 되길 바랍니다.

## 본문
우리는 최근에 [Rever](https://reverscore.com/) 라는 사이트에 Vue.js로 개발한 웹 페이지를 오픈했습니다.
16주 동안 641 개의 커밋이라는 강도 높은 개발 과정을 지나고 나니, Vue.js 도입하기를 잘했다는 생각이 듭니다.

8 달 전에 우리는 Angular 2를 쓰고 있었습니다. 정확하게 말하자면 Angular 2 베타 9 버전이었죠.
외주가 Angular 2로 제작해놓은 웹 사이트가 있었는데, UX/UI부터 설계까지 한 번도 만족한 적이 없었습니다.
심지어 어느 부분에 대해서는 Angular 2 자체가 맘에 들지 않았어요.

경험담을 더 얘기하기 전에, Angular 2 베타 9와 Angular 2.0는 완전히 다른 제품이라고 말하고 싶습니다.
그렇기 때문에 문제가 있었죠. Beta 9부터 2.0.0까지 8 개의 Beta 버전이 있었습니다. RC 8 개와 2.0.0 버전,
그리고 업그레이드까지 합치면 총 17 개의 버전이 있었죠. 우리는 Beta 9에서 2.0.0으로 업그레이드를 시도했지만,
상당히 많은 부분들이 호환되지 않아 업그레이드 작업이 버거워졌습니다. 그러면서도 프레임워크를 Angular 2로 계속 가져가야 하나 고민도 생겼습니다.
왜냐면 Angular 팀에서 Angular 4 업그레이드 작업에 들어간다고 공지했거든요. 물론 Angular 팀에서
급격한 변화는 없을 거라고 했지만, 우리가 Angular 2.0.0으로 업그레이드가 끝나는 시점에 또 다른 업그레이드를
해야 한다는 부담이 생겼습니다. 우리 팀의 시간과 자원은 한정적인데 말이죠...

Angular 2 가 싫었던, 그리고 여전히 싫어하는 주된 이유는 타입스크립트 때문입니다.
Angular 2를 자바스크립트로 구현할 수 있다는 걸 알지만, 순수 자바스크립트로 개발하였을 때
Angular 2 프레임워크에서 추구하는 이상적인 모양이 아니라는 걸 깨닫고선 타입스크립트로 갈 수밖에 없었습니다.
이 상황에서 타입스크립트를 걷어낸다는 건 프로젝트 전체를 다시 제작해야 한다는 것이겠죠.

저는 타입스크립트가 현실적으로 가치를 더하지도 않고 오히려 프로젝트 팀의 코딩 속도를 떨어뜨린다고 느꼈습니다.
자바스크립트로 간단하게 할 수 있는 객체 생성도 타입스크립트에서는 오히려 복잡하기만 했습니다.
혹시 타입스크립트를 시작하시는 분들께는 아래의 기사를 읽어보시길 강력히 권해드립니다. 모든 사람을 위한 해결책은 아닌 거 같아요.

[정적 타입의 충격적인 비밀](https://medium.com/javascript-scene/the-shocking-secret-about-static-types-514d39bf30a3) <br>
[Angular 2 vs React: 최후의 경쟁](https://medium.com/javascript-scene/angular-2-vs-react-the-ultimate-dance-off-60e7dfbc379c)

전 아직도 Angular 1 이 얼마나 다루기 쉬웠는지 기억합니다, 자체의 문제가 있긴 했지만요.
그래도 Angular 2 처럼 중간에 길을 잃은 다른 프레임워크에 비해서 작업하기가 수월했습니다.
Angular 2 에 대한 저의 결론은 간단했습니다.
**Angular 1 과 Angular 2 의 공통점은 이름 뿐이며 이 둘은 완전히 다른 프레임워크다.**

그래서 테스트 안된 시스템에 17 개의 버전을 업그레이드 해야 하고,
비즈니스 측에서는 새로운 기능을 추가해달라고 계속 압박을 주고, 많은 버그와 잘못 짜여진 코드들..
심지어 팀에 초기 팀 멤버들은 모두 나간 상태, 저 홀로 남아 모든 책임을 지고 있었습니다.
타입스크립트 베타 버전을 쓰고 있었기에 레퍼런스 찾기도 어렵고, Angular는 2에서 4로 올라가고...
악영향을 주는 문제들이 급격히 쌓이기 시작했습니다.

그렇게 저희가 결정한 것은 혹시 다른 선택지가 있는지 살펴보는 것이었습니다.
업그레이드에 많은 시간을 소모하게 된다면 올바른 방향을 정하는 게 필요하니까요.
그리고 우리는 조사해봤습니다.

## React
첫 번째 옵션은 당연히 리액트였습니다. 왜냐면 모든 개발자가 사용하고, 사용하지 않는 개발자들도 React에 대해 얘기하니까요.
이게 한 가지 이유였고, 또 다른 이유는 Facebook 이 밀고 있다는 것이었습니다.
그러나, React 자체는 프레임워크가 아닙니다 제대로 활용하려면 추가적으로 구성해줘야 할 것이 많죠.

## Vue.js
Vue.js는 새로운 녀석이었습니다. 버전 2.0을 내놓기 전까지 들어보지도 못했죠.
딱 봤을 때 구미가 당겼지만, 위험해 보였습니다.

## 의사결정 과정
먼저 의사결정 시 어느 부분을 중요하게 볼 지 정했습니다.
우리가 꿈꾸는 프레임워크는 아래의 조건들을 만족해야 된다고 생각했습니다.

1. 안정적이어야 한다.
2. 큰 커뮤니티 또는 큰 단체에서 지원하고 있어야 한다.
3. 문서화가 잘되어 있거나 스택오버 플로우에 레퍼런스가 많아야 한다.
4. 배우기 쉬워야 한다.
5. 부트스트랩이랑 잘 결합되어야 한다.
6. 크기가 작아야 한다.
7. 코드를 재사용할 수 있어야 한다.
8. 숙련도에 따라 코딩 속도가 빨라져야 한다.
9. 반응성을 보장
10. 컴포넌트 기반

기준을 정하고 나서 실제로 프레임워크를 사용해봤습니다. 단순히 Google에 나와 있는 자료들로만 결정하지는 않기 위해
React 와 Vue.js 둘 다 각각 몇 일씩 검토를 해봤죠. 일단 저는 두 프레임워크를 전혀 몰랐기 때문에,
두 프레임워크를 이틀 정도 학습한 후 기존 코드에서 어느 부분을 다시 구현해야 할지를 살펴봤습니다.

재 구현이 필요한 부분은
1. 기본적인 API 호출
2. 2 페이지의 레이아웃 2개
3. 사용자와 관련 있는 부분의 반응성
4. 로그인 양식과, 몇 개의 기타 양식
5. 부트스트랩 모달 1개

위 부분들을 작업할 때 Vue.js 의 학습 및 구현 속도에 놀랐습니다. 몇 일만에 실제 구현물을 프로토타이핑 하여 팀원들과 CTO에게 보여줬습니다. Vue.js 의 기본에 대해서 이해하고, 확장 가능한 아키텍처 설계를 할 수 있게 되었습니다.
가장 중요한 점은 Vue.js로 코딩하는 것 자체를 즐기면서 React 보다 코딩을 빠르게 할 수 있었습니다.

React는 제가 생각했던 것 이상으로 어려웠습니다. Redux 와 MobX 2 가지 선택지 사이에서 고민하는 부분 자체가 Vue 의 Vuex에 비해 문제가 많았습니다. 단순하게 생각해보면 익숙하지 않은 프레임워크가 있을 때, Vuex 와 같이 프레임워크 자체에서 공식적으로 지원하는 라이브러리가 있으면 더 편한 거죠. 그런데, Vuex로 했을 때 Redux 보다 반응성 (Reactivity) 가 더 좋았던 것 같습니다. 뭐 아마 제 개인적인 느낌이겠죠. 개인마다 느끼는 학습곡선이 다르듯이 말이에요.

JSX 도 문제였습니다. Vue는 재사용이 가능한 HTML 코드를 JSX에서는 재사용할 수 없었기 때문이죠.
개인적으로 인라인 템플릿을 싫어하기 때문에 .vue 파일로 작업하기 편했습니다. React는 JSX / HTML 을 JS 코드와 섞기 때문에
별로 좋아하지 않았습니다. 왜냐면 제가 관심사의 분리 (Separation of Concerns) 추종하기 때문이죠.
그리고 인라인 템플릿은 왠지 코드가 못생겨 보이지 않나요..? (웃음)

## 구현 속도
구현 속도는 Vue.js 의 압승입니다. JSX 를 배울 필요도 없죠. 이 결과는 다른 개발자가 합류하였을 때 재확인됐습니다.
교육을 1시간 정도만 했는데도 바로 프로젝트 소스에 컨트리뷰션 했으니까요.

이 점이 사실 저희에게 가장 중요했습니다. .vue 파일 열어보시면 바로 깨달으실 거에요.
template 영역에 html 와 vue 태그가 있어 Angular 1 과 비슷한 모양입니다.
따라서 Angular 1 을 해보셨으면 진짜 익숙하실거에요. 또 style 과 javascript 영역이 있어서
Vue.js 에 대해 사소한 몇 가지만 더 배우시면 완전히 이해할 수 있습니다.
*methods, computed, properties, data* 와 같은 기본적인 속성만 배우시면 코딩하시는 데 필요한
90% 는 다 학습하신겁니다. 정말 쉬워요.

## 문서화
구현 속도에 있어서 중요한 것은 문서화입니다. Vue.js 의 문서는 말할 것도 없이 뛰어납니다.
가이드, 예제, API 등이 매우 잘 되어 있으며, 개발 중에 마주할 문제들이 모두 언급되어 있습니다.
문서가 모두 중국어만 지원하는 거 아닌가..? (창시자가 중국인) 했지만 거의 모든 문서가 영어로 제공됩니다.

## 물어보기
1 주일 이상을 고민한 후에 선택한 Vue.js는 상당히 좋아 보였습니다.
하지만 놀랍게도, 개발 중에 마주한 문제 해결을 위해 주변에 물어보는 것은 아무 의미가 없었습니다.
왜냐면 Vue.js를 많이 써본 사람이 없기 때문이죠. 문제 해결을 위해 인터넷에 질문을 올리면
돌아오는 답변은 "괜찮은 것 같네요. 근데 전 아직 안 해봤습니다". 반면에 React는 대부분 답변을 받았습니다.
Angular 2는 두 번째로 답변율이 높았구요.

그래서 지역 내 커뮤니티에서 Vue.js를 잘 쓰는 개발자를 알아보기 시작했습니다.
다행히 몇 명을 만났고, 내가 혼자가 아니구나 생각했습니다.
단지 저의 개발자 인맥이 좁았던 거고 Vue.js로 상용 서비스를 만드는 개발자들을 몰랐을 뿐이죠.

## 모바일
Vue.js 와 React 중에 뭘 선택할까 고민할 때, 기존의 모바일 앱을 다시 구현하는 부분도 고민하고 있었습니다.
React Native 가 좋은 선택으로 보였고, React에 큰 가산점으로 작용했죠.
왜냐면 아직 Vue.js는 React Native 와 같은 게 없었기 때문이에요.
따라서, 웹 애플리케이션에서 사용한 코드를 모바일 앱에서 재활용할 수 있다는 가능성은 정말 큰 장점이었죠.

하지만, 저는 일어날지 안 날지도 모르는 가능성을 쫓지 않기로 했습니다.
오히려 제 경험에서는 Node.js로 브라우저와 서버 사이의 막대한 양의 코드를 재사용하였습니다.

## 라이센스
제가 이 글을 작성할 때쯤에 Facebook 이 React 라이센스를 BSD+로 바꾼다는 얘기가 들렸습니다.
페이스북에 따르면, 이 라이센스는 특허 괴물로부터 React를 보호하기 위해서라고 합니다.
이 내용이 저희 의사결정에 반영된 건 아니지만 어쨋든 우리가 React를 선택하지 않아 다행입니다.
왜냐면 라이센스로 한번 시끄러워지면 걷잡을 수 없거든요.

결국 페이스북이 React를 후원하는 게 강점보다는 빚이 될지도 모릅니다.
그렇기 때문에 성공적인 오픈소스 재단이 이끄는 독립적인 조직이나 단체가 더 선호됩니다.
Facebook은 IBM을 예로 삼아 옳은 방향으로 나아가야 합니다. IBM이 Strongloop를 인수했을 때
Express.js를 Node.js 재단에 기부했습니다. 커뮤니티의 강력한 압박과 IBM 이 가진
지속적인 소프트웨어 발전 의지 덕택이었죠. Twitter 또한 좋은 예시입니다.
Bootstrap에 거의 무료인 MIT 라이센스를 적용하고 아무도 Bootstrap 의 라이센스에 대해서 불평하지 않기 때문입니다.

## 결론
프레임워크를 선택하기 위해 여러 웹 사이트를 조사하던 중 한 웹 사이트가 눈에 끌렸습니다.
자바스크립트 프레임워크에 대한 만족도 조사를 그래프로 나타낸 [사이트](https://medium.com/@sachagreif/the-state-of-javascript-front-end-frameworks-1a2d8a61510)였죠.
물론 이 사이트가 과학적으로 입증된 조사는 아닙니다. 하지만 꽤 괜찮은 정보들을 담고 있고,
저희가 최종적으로 Vue.js 로 가겠다고 결정하였을 때 그 정보들의 사실 여부가 입증되었죠.
특히 Vue.js 같은 경우에는 처음에 아무것도 몰랐기 때문에 도움이 꽤 되었습니다.

![fw-comparison-table]({{ site.url }}/images/posts/web/translation/fe-fw-comparison.png)

결국 Vue.js를 저희의 프레임워크로 선정하였습니다. 스택오버 플로우에 올린 질문은 모두 답변이 달렸고,
깔끔하게 잘 정리된 세 가지 유형의 공식 문서들, 라이브러리의 작은 용량, 부트스트랩과의 쉬운 결합,
Laravel 과 같은 큰 프로젝트와 Alibaba 와 같은 큰 회사에 지원을 받는 점이 컸습니다.
React 처럼 큰 커뮤니티가 안되어 있다 라는 점은 중요하지 않았습니다. 왜냐면 이미 개발하기에 충분한 큰 커뮤니티 규모거든요.

Vue.j로 선택한 것은 옳은 결정이었습니다. CTO를 설득하는 데 조금 시간이 걸렸지만, 그 과정에서 나온
그의 중요하고 심오한 질문들 덕택에 제 선택에 더 100% 확신이 생겼습니다.
아마 CTO 도 Vue 컴포넌트 1 개를 다 작성할 때까지 의구심이 좀 있었던 것 같습니다.
물론 컴포넌트 작성은 무척이나 쉬웠죠.

결국 의사결정 과정 전체가 많은 도움이 되었습니다.
**무언가를 빨리 학습할 수 있다는 건 그만큼 개발 중에 더 복잡한 문제를 마주했을 때 더 큰 자신감을 가질 수 있다는 점이니까요.**

React 가 나쁜 선택이라는 게 아닙니다. 거대한 React 커뮤니티를 보면 분명히 거기엔 타당한 이유가 있을 거라고 생각합니다.
하지만 jQuery를 봤을 때, jQuery 커뮤니티가 거대하니 jQuery는 우리 프로젝트에서 좋은 라이브러리 / 프레임워크 가 될거야 라는 논리는 아니라는 거죠.

프로젝트에서 직접 사용해보며 Vue.js 가 점점 더 성장하고 있다는 것을 체감했습니다.
그리고 우리가 올바른 선택을 했다는 것에 대한 확신도 가졌구요.

우리는 간단한 걸 중요하게 생각하고, Vue.js 의 학습곡선, 공식 문서, 특히 구현 속도가 Vue.js 의 심플함을 증명합니다.
만약 아직도 확신이 없어 갈팡질팡하신다면 아래의 링크를 확인해보시기를 권고 드립니다.

[Vue.js 와 다른 프레임워크 비교](https://vuejs.org/v2/guide/comparison.html)

## 참고
원문 : [Why we moved from Angular 2 to Vue.js](https://medium.com/reverdev/why-we-moved-from-angular-2-to-vue-js-and-why-we-didnt-choose-react-ef807d9f4163)

## Vue.js 온라인 강좌
만약 Vue.js에 관심이 생기셨다면 아래 온라인 강좌로 빠르게 배워보시는 것도 좋을 것 같습니다 :)
시간이 넉넉하신 분들은 [뷰 공식 문서](vuejs.org)를 보시는 것도 좋을 것 같네요!

<figure class="third">
	<a href="https://www.inflearn.com/course/Age-of-Vuejs/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/inflearn/age-of-vue.png"></a>
	<a href="https://www.inflearn.com/course/vue-pwa-vue-js-%EC%A4%91%EA%B8%89/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/inflearn/vue-intermediate.png"></a>
	<a href="https://www.inflearn.com/course/vue-js/?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner"><img src="{{ site.url }}/images/posts/web/inflearn/vue-advanced.jpg"></a>
	<figcaption>인프런 온라인 강좌 : Vue.js 시작하기, Vue.js 중급, Vue.js 완벽 가이드 (좌측 부터)</figcaption>
</figure>

## 밀착 지도를 받을 수 있는 오프라인 강의

강남역 패스트캠퍼스에서 6월 말부터 7월 말까지 6주 동안 Vue.js 집중반을 운영합니다. 관심 있으신 분들은 아래 이미지를 클릭해주세요 :)

<figure class="third">
	<a href="https://www.fastcampus.co.kr/dev_camp_wap/"><img src="{{ site.url }}/images/posts/web/fastcampus/wap.png"></a>
	<figcaption>패스트캠퍼스 Vue.js로 구현하는 PWA 캠프 8주 과정(19.08.24 ~ 19.10.26)</figcaption>
</figure>