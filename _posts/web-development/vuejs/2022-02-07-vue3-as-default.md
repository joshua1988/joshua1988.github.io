---
layout: article
title: 'Vue 3, 기본 버전이 되다'
date: 2022-02-07 23:05:32 +0900
categories: [web-development, vuejs]
excerpt: '22년 초에 일어난 Vue.js 진영의 큰 변화를 살펴봅니다. 기본 라이브러리 버전이 된 Vue 3 이야기'
image:
  teaser: posts/web/vuejs/vue3.png
  credit: Yurim Jin
  creditlink: https://milooy.wordpress.com/
  #url to their site or licensing
locale: 'ko_KR'
# 리플 옵션
comments: true
tags:
- Vue.js 3
- Vue 3
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
- vue.js 프론트엔드 개발자
- 패스트캠퍼스 vue.js 강의
- 인프런 장기효
- Age of Vue.js
- 인프런 vue.js 강의
- 장기효
- 캡틴판교
- captain pangyo
- vue composition api
---

{% include toc.html %}

## 들어가며

안녕하세요. 오랜만의 기술 글입니다. 작년에는 회사, 멘토링, 유튜브, 개인 작업 때문에 바빠서 기술 글을 많이 못 올렸네요. 올해는 여러분에게 도움 될 만할 글들을 좀 더 자주 올리려고 합니다. 많은 관심 부탁드릴게요 😄

오늘은 Vue 3에 대한 글을 작성합니다. 퇴근하자마자 인프런 질의 게시판에 올라온 질문들을 보니 빨리 정리해서 올려야겠다는 생각이 들어서 글을 쓰게 되었어요. 아마 제 강의나 학습 자료로 Vue.js를 배우고 실무에서 또 사용하고 계시는 분들이 많을 텐데요. 이제 막 Vue.js를 배우시는 분들 그리고 실무에서 오랜만에 뷰 CLI로 프로젝트를 생성하실 분들께 좋은 참고 자료가 되었으면 좋겠습니다 😄

그럼 시작할게요!

## Vue.js 커뮤니티에 일어난 큰 변화

22년 2월 7일인 오늘부터 Vue.js 커뮤니티 진영에 큰 변화가 생겼습니다. 바로 라이브러리 기본 버전과 공식 문서의 주소인데요. 어떤 내용인지 하나하나 차근히 살펴보겠습니다 😄

## 주목해야 할 첫 번째 변화 - CDN 주소

오늘부터 Vue.js로 개발하실 때는 Vue.js 라이브러리 버전을 주의하셔야 합니다. 만약 이제 막 Vue.js를 배우기 시작하셨다면 아마 HTML 파일에서 CDN으로 아래와 같이 라이브러리를 들고 오실 텐데요.

```html
<body>
  <div id="app">
    <p>{{ message }}</p>
  </div>

  <script src="https://unpkg.com/vue"></script>
  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue 2'
      }
    })
  </script>
</body>
```

여기서 `script` 태그의 소스 주소인 `https://unpkg.com/vue`는 더 이상 Vue 2 라이브러리 소스를 가져오지 않습니다. Vue 3를 기본으로 바라보게 되어 있습니다. 그래서 가급적 위와 같은 주소보다는 아래와 같이 버전을 명시한 CDN 주소를 사용하시는 것을 추천드릴게요 😄

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.min.js"></script>
<script src="https://unpkg.com/vue@2.6.14/dist/vue.js"></script>
<script src="https://unpkg.com/vue@2"></script>
```

Vue 2 라이브러리 CDN 주소와 관련된 글은 아래 링크를 참고하세요 😄

- [Vue 2 CDN 주소](https://v2.vuejs.org/v2/guide/installation.html#CDN)

## 주목해야 할 두 번째 변화 - NPM 패키지 버전

뷰의 기본적인 개념을 학습하시고 나면 대부분 NPM과 Vue CLI를 이용해서 프로젝트를 생성하고 라이브러리들을 npm 명령어 기반으로 설치하실 텐데요. 기존에 Vue 2로 학습하고 이미 개발을 하고 계셨던 분들은 아래 명령어가 익숙하실 겁니다.

```sh
npm i vue
npm i vue-router
npm i vuex
```

오늘부터는 Vue, VueRouter, Vuex 라이브러리 모두 Vue 3를 기준으로 설치가 됩니다. 원래 우리가 실무에서 사용하고 있는 버전은 아마 대부분 아래와 같을 텐데요.

```json
{
  "dependencies": {
    "vue": "^2.6.14",
    "vue-router": "^3.5.3",
    "vuex": "^3.6.2"
  }
}
```

이제 위 버전은 단순히 라이브러리 이름만 적는다고 해서 기본 값으로 설치되지 않습니다. 이제는 Vue 3를 기준으로 한 뷰 라우터와 뷰엑스의 라이브러리 버전이 설치됩니다. 아래와 같이 말이죠.

<img src="{{ site.url }}/images/posts/web/vuejs/vue3-default/install-vue.png">
<img src="{{ site.url }}/images/posts/web/vuejs/vue3-default/install-router.png">
<img src="{{ site.url }}/images/posts/web/vuejs/vue3-default/install-vuex.png">

```json
{
  "dependencies": {
    "vue": "^3.2.30",
    "vue-router": "^4.0.12",
    "vuex": "^4.0.2"
  }
}
```

따라서, 이미 Vue 2 버전으로 뷰를 배우고 있거나 프로젝트를 진행하고 계신 분들은 뷰 코어 라이브러리들을 설치하실 때 아래와 같이 꼭 버전을 명시해 주셔야 합니다.

```sh
npm i vue@2.6.14
npm i vue-router@3.5.3
npm i vuex@3.6.2
```

## 주목해야 할 세 번째 변화 - 공식문서 주소

Vue.js를 오랫동안 개발해 오신 분이라면 vuejs.org가 공식 문서 주소라는 걸 알고 계실 겁니다. 20년 9월에 Vue 3가 정식 릴리즈 되고 나서도 Vue 2에서 Vue 3로 소프트 랜딩 시키기 위해 꽤 오랜 기간 Vue 2를 기존 공식 문서로 유지해 왔는데요.

오늘부터는 공식 문서의 기준 버전이 Vue 3가 되었습니다. 

<figure>
  <a target="_blank" href="https://vuejs.org/">
    <img src="{{ site.url }}/images/posts/web/vuejs/vue3-default/vue3-doc.png">
  </a>
	<figcaption>Vue 3 공식 문서</figcaption>
</figure>

그렇다고 해서 Vue 2의 문서를 보지 못하는 것은 아니구요. 아래의 주소를 통해서 기존 자료들을 보실 수 있습니다.

- [Vue 2 공식 문서](https://v2.vuejs.org/)
- [Vue 2에 호환되는 Vue Router 공식 문서](https://v3.router.vuejs.org/)
- [Vue 2에 호환되는 Vuex 공식 문서](https://v3.vuex.vuejs.org/)

## Vue 3가 기준 버전이 되었는데 왜 Vue 2를 안내하나요?

실무에서는 여전히 Vue 2를 많이 사용하고 있고 커뮤니티 라이브러리 생태계도 아직은 Vue 2가 더 크고 성숙합니다. 뷰 창시자 에반 입장에서는 커뮤니티가 Vue 2에서 Vue 3로 부드럽게 넘어갈 수 있도록 배려해서 Vue 2를 꽤 오랜 기간 동안 공식 라이브러리로 유지해 준 것 같습니다.

그러다 보니 막상 Vue 3로 이동하는 움직임보다 기존 라이브러리 버전인 Vue 2를 고수하는 사용자들이 많았던 것 같습니다. 특히, Vue 3라고 부를 수 있는 가장 큰 특징인 [composition api](https://github.com/vuejs/composition-api)는 Vue 2에서도 사용할 수 있어서 Vue 3로 이동하는 수요가 적었던 것 같아요.

<figure>
	<img src="{{ site.url }}/images/posts/web/vuejs/vue3-default/npm-download.png">
	<figcaption>NPM 다운로드량 비교 Vue 2 vs Vue 3(22년 2월 7일 기준)</figcaption>
</figure>

마지막으로, 실무자 입장에서는 Vue, VueRouter, Vuex와 같은 코어 라이브러리 이외에도 Vuetify, BootstrapVue, VueChart, VueDatepicker, VueTable 등의 커뮤니티 라이브러리를 이용해서 개발을 진행하는데 아직 이 커뮤니티 라이브러리들이 여전히 Vue 3를 제대로 지원하지 못하고 있는 실정입니다.

뷰 코어팀 입장에서는 Vue 3를 기반으로 한 커뮤니티가 충분히 성숙되기를 바라며 시간을 주었는데도 여전히 격차가 크다고 느끼자 Vue 3를 기본 라이브러리로 선택하는 강수를 둔 것으로 보입니다. 이번 변화가 Vue.js 커뮤니티에 긍정적인 영향을 줄 수 있으면 좋겠네요.

## FAQ

아마 이 글을 읽고 궁금해 하실 만한 부분들을 정리해 보았습니다 :)

##### Q. Vue 2는 그럼 더 이상 쓰면 안되는거 아닌가요?

[지난번 RFC](https://github.com/vuejs/rfcs/discussions/296)에서 에반이 Vue 3의 주요 특징을 Vue 2에서도 사용할 수 있게 라이브러리 지원을 강화한다고 했습니다. 기준 라이브러리가 Vue 3가 되었다고 해서 커뮤니티의 대다수를 차지하는 라이브러리 버전을 포기하진 못할 겁니다. 점진적으로 커뮤니티 중심 버전이 3이 되도록 기존 Vue 2 사용자들도 지원해 줄 것이라고 봅니다.

##### Q. 뷰 CLI로 프로젝트를 생성할 때 그럼 Vue 3만 선택할 수 있는 건가요?

`vue create 프로젝트이름` 명령어를 입력하시면 보통 아래와 같이 `Manually select features`를 선택해서 서비스에 맞게 프로젝트를 
구성하실텐데요. 이 때 Vue.js 버전을 2 버전으로 선택하시면 됩니다.

![vue-cli-guide]({{ site.url }}/images/posts/web/vuejs/vue3-default/cli-commands.png)

##### Q. Vue 2로 뷰를 배웠는데 그럼 Vue 3를 다시 배워야 할까요?

Vue 2로 학습하신 내용 모두 Vue 3에서 사용하실 수 있습니다. 반응성, 컴포넌트, 라우터, 뷰엑스 모두 Vue 2와 Vue 3 동일한 개념을 기반으로 하고 있기 때문에 오히려 교육 레퍼런스가 많은 Vue 2로 배우시는게 더 수월하실 거예요. Vue 3는 `setup()` 이라는 API 하나 정도만 더 알고 계시면 됩니다.

Vue 2와 Vue 3의 차이점이 궁금하시다면 제가 작년 11월에 발표한 아래 영상을 참고해 보세요 :)

<iframe width="560" height="315" src="https://www.youtube.com/embed/Z0OG00YQeMg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<!-- - <a target="_blank" href="https://www.youtube.com/watch?v=Z0OG00YQeMg">Can I use... Vue 3? 2021 페이스북 프런트엔드 개발자 그룹 컨퍼런스</a> -->

## 마무리

새해가 된지 얼마 안돼서 새로운 프레임워크나 기술을 열심히 학습하고 계신 것 같은데요. 개념을 배우고 지식을 쌓아가는 것도 중요하지만 관심 있게 학습하는 기술의 주요 동향이나 커뮤니티 변화를 관찰하는 것도 중요한 것 같습니다. 

오늘 정리한 내용이 여러분의 Vue.js 학습과 개발에 도움이 되었으면 좋겠네요. 그럼 다음에 또 새로운 컨텐츠로 찾아뵙겠습니다. 읽어주셔서 감사합니다 :)

## 참고 자료

<a target="_blank" href="https://blog.vuejs.org/posts/vue-3-as-the-new-default.html">Vue 3 as the New Default</a>

## 캡틴판교의 온라인 강의

프런트엔드 개발과 Vue.js를 배우고 싶은 분들께 추천드립니다 😄

<figure class="third">
	<a href="https://www.inflearn.com/course/Age-of-Vuejs?inst=72986832&utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/lv1.png"></a>
	<a href="https://www.inflearn.com/course/vue-pwa-vue-js-중급?inst=dd3b6c65&utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/lv2.png"></a>
	<a href="https://www.inflearn.com/course/vue-js?inst=c76b3a50&utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/lv3.png"></a>
	<figcaption>인프런 온라인 강의 : Vue.js 시작하기 / Vue.js 중급 / Vue.js 완벽 가이드</figcaption>
</figure>

<figure class="third">
	<a href="https://www.inflearn.com/course/vue-js-끝내기-캡틴판교?inst=2071ec73&utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/lv4.png"></a>
	<a href="https://www.inflearn.com/course/프런트엔드-웹팩?inst=747606f7&utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/webpack.png"></a>
	<a href="https://www.inflearn.com/course/pwa?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/pwa.jpg"></a>
	<figcaption>인프런 온라인 강의 : Vue.js 끝장내기 / 프런트엔드 개발자를 위한 웹팩 / PWA 시작하기</figcaption>
</figure>

<figure class="third">
	<a href="https://www.inflearn.com/course/타입스크립트-입문?inst=f1ae9299&utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/ts1.png"></a>
  <a href="https://www.inflearn.com/course/타입스크립트-실전?inst=e5a8f85e&utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/ts2.png"></a>
  <a href="https://www.inflearn.com/course/vue-ts?inst=0ced8395&utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/vue-ts.png"></a>
	<figcaption>인프런 온라인 강의 : 타입스크립트 입문 / 실전 프로젝트로 배우는 타입스크립트 / Vue.js + TypeScript 완벽 가이드</figcaption>
</figure>
