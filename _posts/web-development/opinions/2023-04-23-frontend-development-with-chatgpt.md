---
layout: article
title: "ChatGPT를 대하는 프런트엔드 개발자의 자세"
date: 2023-04-23 12:52:32 +0900
categories: web-development
excerpt: "ChatGPT 소개와 사용방법. ChatGPT 잘쓰는 방법. ChatGPT를 실무에서 써본 후기. ChatGPT는 개발자를 대체할까?"
image:
  teaser: posts/web/chatgpt/chatgpt-with-fe.png
  credit: 캡틴판교
  creditlink: https://www.youtube.com/channel/@captainpangyo
  #url to their site or licensing
locale: "ko_KR"
# 리플 옵션
comments: true
tags:
- 프론트엔드 개발
- ChatGPT
- chatgpt 프론트엔드
- chatgpt 사용 예시
- chatgpt 사용 사례
- chatgpt 사용설명서
- chatgpt 소개
- chatgpt 프론트엔드 개발
- 프론트엔드 AI
- 프론트엔드 chatgpt
- 프론트엔드 개발 AI
- 프론트엔드 ai 대체
- 프론트엔드 온라인 강의
- 웹 프론트엔드 공부
- 웹 개발 공부
- 프론트엔드 개발 상담소
- 프런트엔드 개발 상담소
- 캡틴판교
- 장기효
---
{% include toc.html %}

## 들어가며

챗 지피티(ChatGPT)가 핫합니다. 커뮤니티와 언론에서 모두들 챗 지피티를 얘기하고 있죠. 우리 생활에 AI가 더 가까이 다가온 것이 반가울 수도 있지만 한편으로는 직업이 사라지는 게 아닐까 하는 걱정이 듭니다. 오늘은 챗 지피티를 사용하는 프런트엔드 개발자이자 실무자로서 챗 지피티에 대한 생각을 간단히 공유하겠습니다.

## ChatGPT란?

챗 지피티란 무엇일까요. 트렌드에 민감한 개발자라면 이미 사용하고 계실 거고 뉴스를 보시는 분들이라면 한 번쯤은 들어봤을 겁니다. 구글에 검색해 보면 아래와 같은 정의가 나옵니다.

"ChatGPT는 OpenAI가 개발한 프로토타입 대화형 인공지능 챗봇이다"

OpenAI라는 회사에서 만든 인공지능 챗봇이라고 하네요. 이제는 구글링보다 챗지피티로 질의하는 시대이기 때문에 챗지피티한테 물어보면 아래와 같은 답변을 줍니다.

"ChatGPT는 OpenAI에서 개발한 자연어 처리(NLP) 인공지능 모델입니다. GPT는 "Generative Pre-trained Transformer"의 약자로, 인간처럼 대화를 나눌 수 있도록 설계되었습니다. ChatGPT는 대화에 참여하고, 질문에 
대한 답변을 제공하며, 다양한 주제에 대해 정보를 제공할 수 있습니다."

뭔가 좀 더 알아듣기 쉽게 설명해 주네요. 인간과 대화하면서 정보를 제공해 주는 대화형 AI. 이게 챗 지피티입니다.

## ChatGPT 어떻게 사용하나요?

챗 지피티는 아래 사이트로 접속하면 무료로 사용할 수 있습니다.

[https://chat.openai.com/](https://chat.openai.com/)

지메일을 연동하면 쉽게 로그인하고 바로 이용할 수 있습니다. 주변에 은근히 챗 지피티를 어떻게 써야 하는지 접속은 어떻게 하는지 모르시는 분들이 많길래 간단한 소개와 사이트 접속 방법을 적어봤어요 😄

<figure>
	<img src="{{ site.url }}/images/posts/web/chatgpt/how-to-use-chatgpt.png">
	<figcaption>ChatGPT 잘쓰는 방법 물어보기. 궁금하면 직접 물어보세요 :)</figcaption>
</figure>

## ChatGPT 어떻게 쓰고 있나요?

요즘 업무할 때 챗 지피티를 끼고 삽니다. 최근에 올린 주요 기능 PR 몇 개는 챗 지피티가 90% 이상 만들어줬어요. 챗 지피티로 어떤 걸 할 수 있는지 궁금하시죠? 챗 지피티 질의 기록을 뒤져보니 아래와 같은 주제를 물어봤었네요.

- Vue.js, React Documentary 요약
- Nginx 명령어와 location 설정 방법
- 피그마 토큰을 타입 코드로 변환하기
- 타입스크립트 문법과 개념 질문
- FE 컴포넌트 설계 방식
- CSS 스타일링
- Rollup.js와 Vite 설정
- 깃헙 오픈 API 사용법

타입스크립트, CSS와 같은 언어부터 시작해서 빌드 도구, 서버, API 문서, 컴포넌트 설계까지 못해주는 게 없습니다. 과거 10년 동안 해왔던 구글 검색 중심의 정보 획득 -> 검증 -> 적용 과정을 매우 효과적으로 단축시켜줬어요. 심지어 기능과 컴포넌트 구현은 2개월 전에 챗 지피티가 나오기 전에 재밌게 시간 들여서 작업했었는데 이젠 챗 지피티로 빠르게 구현해서 PR을 올립니다. 덕분에 그날은 매우 정신없는 날이었음에도 빨리 퇴근하고 저녁에 치맥하러 갈 수 있었어요.

챗 지피티가 제 생산성을 올려주고 있는 건 확실합니다.

## ChatGPT가 나에게 준 변화

프런트엔드 개발에 흥미가 생긴 분들이라면 객체와 배열을 다루는 게 재밌고 더 잘하고 싶을 겁니다. 예를 들어, API 응답 값이 도서 목록이고 각 목록에서 특정 값을 뽑아 화면을 그린다고 해볼게요.

```js
const books = [
  { id: 1, name: 'TypeScript' },
  { id: 2, name: 'JavaScript' },
  { id: 3, name: 'CSS' },
];
```

이 배열 목록에서 이름만 뽑아서 화면에 그릴 수 있게 코드를 작성하는 건 일도 아닙니다.

```js
const bookNames = books.filter(book => book.name);
```

그런데 이 `books` 배열의 구조가 아래처럼 복잡하고 여러 속성을 조합해서 그려야 한다면요?

```js
const books = [
  { id: 1, name: 'TypeScript', address: { district: '서울' }, ... },
  { id: 2, name: 'JavaScript', address: { district: '부산' }, ... },
  { id: 3, name: 'CSS', address: { district: '광주' }, ... },
];
```

여기서부터는 고민을 좀 하게 됩니다. 과거였다면 말이죠. 근데 요즘은 챗 지피티에 아래와 같이 검색하고 결과를 기다립니다

<figure>
	<img src="{{ site.url }}/images/posts/web/chatgpt/chatgpt-question.png">
	<figcaption>코드를 가지고 구현할 내용을 ChatGPT에 질의하는 화면</figcaption>
</figure>

예전에는 중간에 결과 값이 제대로 들어가는지 디버깅도 해보고 콘솔도 찍어보면서 구현했었죠. 이제는 이런 과정을 거치는 것보다 ChatGPT에 더 정확한 질의문을 던져서 코드를 생성하는 게 더 간편하고 빠르다고 느껴집니다. 코드는 결국 비즈니스를 성공시키기 위한 수단이니까요. 우리는 아낀 시간 동안 비즈니스 가치에 집중할 수 있습니다. 물론 그렇다고 해서 챗 지피티가 다음과 같이 낮은 퀄리티의 코드를 생산하지도 않습니다. 질의문만 정확하다면요.

```js
var r = [];
for (var i = 0; i < books.length; i++) {
  var n = books[i].name
  r.push(n);
}
```

제가 경험해 본 챗 지피티는 적어도 읽을 수 있는 코드를 주는 것 같아요. 그래서 그런지 더 게을러졌습니다. 

질의문을 좀 더 정확하게 작성하면 내가 원하는 결과를 내가 스스로 짜는 것보다 더 빠르게 만들어주지 않을까 하는 기대감에 챗 지피티에게 물어보고 기다립니다. 저랑 동일한 증상을 겪고 계신 분 있으신가요?

<figure>
	<img src="{{ site.url }}/images/posts/web/chatgpt/waiting-chatgpt.gif">
	<figcaption>ChatGPT의 결과를 하염없이 기다리는 모습</figcaption>
</figure>

## ChatGPT로 바뀐 나의 업무 방식

ChatGPT로 확실히 일하는 방식이 바뀌었습니다. 과거에는 어떤 도구나 API에 대한 학습이 필요할 때 구글링부터 했습니다. 공식 문서나 깃헙 이슈 그리고 커뮤니티의 여러 글들을 보면서 정확한 정보를 취합했죠. 그리고 그 내용이 맞는지 직접 코드를 작성해 보거나 적용하면서 검증 과정을 거쳤습니다. 다음 3단계 과정처럼 말이죠.

<figure>
	<img src="{{ site.url }}/images/posts/web/chatgpt/3steps-before-chatgpt.png">
	<figcaption>ChatGPT 이전의 개발 지식을 얻는 과정</figcaption>
</figure>

이제는 챗 지피티 덕분에 다음 2단계로 줄었습니다.

<figure>
	<img src="{{ site.url }}/images/posts/web/chatgpt/2steps-after-chatgpt.png">
	<figcaption>ChatGPT 이후의 개발 지식을 얻는 과정</figcaption>
</figure>

더 이상 공식 문서와 스택 오버 플로우, 잘하는 개발자들의 블로그 글을 읽으며 정보를 요약하지 않아도 됩니다. UX만 생각해 봐도 이득입니다. 구글 검색하고 클릭하고 이 페이지 보고 다른 페이지 링크 클릭하고 또 확인하고 다른 사이트 찾고.. 이 과정들을 대폭적으로 축소해 주는 UX가 ChatGPT인 거 같아요.

단순히 편리하고 게을러서만은 아닙니다. 최근에 경험한 신세계는 깃헙 엔터프라이즈 오픈 API 사용 방법을 알아볼 때였어요. 오픈 API라면 나름 꽤 많이 써봤고 어떤 방식으로 접근해야 하는지 알고 있음에도 불구하고 특정 API 사용법을 익히기가 쉽지 않았습니다. 과거에 늘 해왔던 관성 때문에 당연히 공식 API 가이드 문서를 꽤 빠르게 스캔하고 필요한 정보와 명령어로 사용 방법을 알아보기 시작했죠. 그렇게 검색 -> 종합 -> 검증 과정을 거치니 1~2 시간이 훌쩍 지나갔습니다. 생각보다 시간이 오래 걸리길래 답답해서 이번엔 접근 방식을 바꿨습니다. 챗 지피티로 질의를 했죠. 

챗 지피티가 제시해 준 답변과 몇 개의 코드에서 실마리가 보였습니다. 그 실마리로 빠르게 원하는 기능을 구현했죠. 심지어 마지막엔 그 오픈 API로 직접 코드를 작성한 게 아니라 ChatGPT에게 Node.js 코드를 짜달라고 했습니다. 내가 원하는 결과만 정확하게 설명할 수 있다면 ChatGPT가 제가 직접 코드를 작성하고 디버깅하고 수정하는 시간보다 더 빠르게 작성해 줄 거라는 믿음에 말이죠.

챗 지피티가 제 일하는 방식을 바꿔놓은 것 같아요.

## ChatGPT를 사용할 때 주의할 점

여기까지 읽으신 분들은 슬슬 제가 너무 ChatGPT의 장점만 말하고 있는 건 아닌지 개발자라는 직업이 그럼 필요 없는 건 아닌지라고 생각하실 수 있습니다. "제가 ChatGPT 쓰세요. 이거 너무 좋아요."라는 메시지를 전하고 싶어서 이 글을 쓴 건 아닙니다. ChatGPT가 우리 삶에 주고 있는 변화를 한 명의 개발자로서 바라보고 느낀 점을 공유하고 싶었을 뿐이에요.

ChatGPT와 대화를 할 때는 절대 정보를 100% 신뢰하면 안 됩니다. 앞에서 말한 것처럼 검증과 적용은 여전히 우리 개발자들의 몫입니다. 얼마 전에 기획자 친구가 그러더군요. 챗 지피티로 코딩하는 수업이 생겨서 한번 들어봤는데 어떻게 생각하냐고. 저는 긍정적인 답변을 먼저 줬습니다. "업무에 꽤 도움이 많이 된다. 그런데 허언증 조심해라. 나 많이 당했다." 여기서 허언증이라는 단어를 아시는 분들은 이미 좀 당해보신 분들일 것 같아요.

허언증이 뭐냐면 ChatGPT가 잘못된 정보를 제공하는 특징입니다. 저도 AI를 잘 모르지만 들어보니까 ChatGPT가 대화 생성 모델이라 자기가 말한 정보가 맞는지 안 맞는지 스스로 구분을 못한다고 하더라구요. 결국에 그 허언증을 구분하는 건 여전히 개발자 몫입니다. 

<figure>
	<img src="{{ site.url }}/images/posts/web/chatgpt/chatgpt-hallucination.png">
	<figcaption>허언증을 남발하고 뉘우치는 ChatGPT</figcaption>
</figure>

<p class="notice">허언증에 대해 더 자세히 알고 싶다면 chatgpt hallucination이라고 검색해 보세요. AI 개발자들 사이에서는 할루시네이션이라고 한답니다.</p>

ChatGPT는 무료로도 충분히 사용할 만한 도구입니다. 그런데 전 정확하지 않은 정보를 계속 주는 특성 때문에 유료로 결제했습니다. 그랬더니 같은 질의문을 던지더라도 확실히 정확도가 조금 더 올라가는 게 느껴지더라구요. 뭔가 Open AI가 돈 벌고 싶어가지고 일부러 정확도에 장난질을 하는 건가 싶기도 하지만.. ㅋㅋ 유료로 사용하고 있는 지금도 허언증은 있다고 느낍니다. 최근에 몇 번 당했어요.

허언증을 조심하세요.

## ChatGPT가 개발자를 대체 할까요?

이 글의 하이라이트입니다. 어제 글을 쓰기 시작했는데.. 마침 또 유튜브 구독자분이 질문을 주셨네요. 어떻게 또 아시고.. 😄

<figure>
	<img src="{{ site.url }}/images/posts/web/chatgpt/youtube-comment.png">
	<figcaption>유튜브 구독자 이벤트 댓글 - https://www.youtube.com/@captainpangyo/community</figcaption>
</figure>

제 생각은 완전히 대체하지 못한다입니다. 과거에 나모 웹 에디터나 워드프레스나 요즘의 노 코드 툴이 아무리 나와도 결국 개발자가 기획의 요구사항을 받아 설계하고 개발하는 건 늘 있어온 일입니다. 앞에서 보신 예찬론은 ChatGPT를 하나의 도구로 바라본 개발자로서의 예찬론입니다. 이 도구 때문에 실제로 내 직업이 없어질 걱정을 하고 있다면 이런 글은 쓰지도 않겠죠.

하나의 기능을 구현하고 코드를 작성하는 건 웹 서비스 제작 전반의 매우 일부분에 속합니다. 이 서비스를 설계하기 위해 기획자와 대화를 하고 사용자를 이해하고 아이디어를 내는 과정은 챗 지피티가 단시간 내에 쉽게 따라오긴 어려운 영역이지 않을까요. 그리고, 결국 챗 지피티가 만들어내는 코드는 80%, 90%의 완성도이고 100%의 완성도를 올리기 위한 손길과 지식은 우리 개발자들의 몫이라고 생각합니다. 아까는 화면에 데이터를 단순히 표시하는 수준의 코드라서 냅둔거지 그게 수백만 사용자가 이용하는 사이트의 결제 코드였다고 생각해 보세요.. 난리 날 것 같습니다.

이제 막 개발자로서 부푼 꿈을 가득 안은 채 시작하는 분들께는 큰 우려가 될 수도 있습니다. 하지만, 알아야 질의를 합니다. 다음 두 질문의 차이점이 뭔지 보이시나요?

- 버튼 그룹 컴포넌트를 만들어줘
- 리액트와 타입스크립트 기반으로 버튼 그룹 컴포넌트를 만들어줘. 컴포넌트의 반환 타입은 JSX.Element로 자동 추론되게 해주고 여러 개의 버튼 컴포넌트를 받을 수 있도록 컴포넌트를 설계해줘. 컴포넌트의 래퍼는 forwardRef를 이용해서 컴포넌트 외부에서 접근할 수 있게해주고 컴포넌트의 props는...

아는 만큼 제대로 물어볼 수 있고 허언증을 제대로 구분할 수 있게 됩니다. 아직까지는 우리 개발자들 밥벌이에 영향을 주는 것 같진 않습니다.

## 마무리

오늘은 한 달 넘게 사용한 ChatGPT 후기와 간단한 생각을 적어봤습니다. 블로그 글도 참 오랜만에 썼네요. 1년이 넘는 기간 동안 블로그 글을 쓰지 못한 게 반성이 됩니다. 그렇다고 이 기간 동안 글을 안 쓰진 않았어요. 

곧 제 책 두 권이 출간됩니다. 거진 2년 동안 쓴 것 같아요. 5월과 6월에 각각 한 권씩 나올 것 같은데요. 두 책의 주제는 프런트엔드 개발 이야기와 타입스크립트입니다. 출간되면 또 집필 후기와 기념 이벤트로 찾아뵙겠습니다. 다들 건강하시구요 😄

## 글보다 더 쉽게 배우는 온라인 강의

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
