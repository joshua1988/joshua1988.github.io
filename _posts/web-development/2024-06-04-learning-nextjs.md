---
layout: article
title: "Next.js 학습 방법"
date: 2024-06-04 14:30:32 +0900
categories: web-development
excerpt: "실무에서 바라본 Next.js와 React. 이 둘의 차이점과 유용한 학습 자료"
image:
  teaser: thumbnails/learning-next.jpeg
  credit: 캡틴판교
  creditlink: https://joshua1988.github.io/
  #url to their site or licensing
locale: "ko_KR"
# 리플 옵션
comments: true
tags:
- 캡틴판교
- Next.js란?
- Next.js 강의
- Next.js 학습 방법
- Next.js 학습
- Next.js 시작하기
- next react 차이
- react nextjs 차이
- react nextjs 적용
- react nextjs 프로젝트 생성
- ssr
- nextjs ssr
- nextjs
- 서버 사이드 렌더링
- 서버 사이드 렌더링이란?
- next.js ssr 구현
- ssr next
- ssr next.js
- ssr next js example
- 나는 네이버 프런트엔드 개발자입니다
- Next.js 14 강의
- 캡틴판교 타입스크립트
- 캡틴판교 블로그
- 프론트엔드 개발 학습 로드맵
- 신입 개발자 학습 방법
- 신입 개발자
- 프론트엔드 개발
- 프론트엔드 개발 상담소
- 프론트엔드 개발 상담소
- 프론트엔드 공부 순서
- 프론트엔드 로드맵
- 프론트엔드 면접 질문
- 프론트엔드 포트폴리오
- 프론트엔드 온라인 강의
- 웹 프론트엔드 공부
- 웹 개발 공부
- 캡틴판교
- 쉽게시작하는 타입스크립트
- 장기효
---
{% include toc.html %}

## 들어가며

오랜만의 글이네요. 오늘은 현업에서 핫한 키워드 Next.js에 대해서 얘기해 보고 어떻게 학습하면 좋을지 생각을 공유합니다. 

- React도 잘 모르겠는데 Next.js는 또 뭐지?
- React는 좀 할 줄 알겠는데 덩치 큰 프레임워크 하나 또 배워야 하네..
- 취업하고 싶은데 자격요건에 계속 Next.js가 보인다. 이게 뭐지?

비슷한 상황에 계신 분들께 제가 전달드리는 지식이 도움이 되길 바라며 글을 시작해 보겠습니다 😁

## Next.js란?

[Next.js](https://nextjs.org/)는 공식 문서에 "The React Framework for the Web" 이라고 되어 있습니다. 웹 개발을 위한 리액트 프레임워크라는 소리죠. 좀 재밌는 게 원래 얘가 리액트 프레임워크라는 느낌보다는 리액트 [서버 사이드 렌더링(Server Side Rendering)](#잠깐-용어-정리부터) 프레임워크 같은 느낌이었는데 언제 이렇게 바뀌었는지 모르겠습니다. 감쪽같네요.

용어가 많이 튀어나왔죠? 하나씩 살펴볼까요.

## 잠깐 용어 정리부터

**프레임워크(Framework)**라는 친구를 먼저 얘기하기 전에 라이브러리부터 볼게요. 왜냐하면 리액트(React)가 라이브러리니까요. 라이브러리는 쉽게 얘기해서 개발자들이 편하게 기능을 가져다 개발할 수 있도록 만들어놓은 도구입니다. 그럼 이 리액트가 라이브러리라면 리액트 프레임워크(React Framework)는 뭘까요? <br/>
바로 라이브러리에 규칙을 더하고 기능을 좀 더 보완해 둔 게 프레임워크입니다. 프레임워크를 쓰면 초반에 알아야 할게 좀 많지만 그래도 여러 명이 협업하기 좋고 나름 환경 구성에 들어가는 시간이 적어 선호하는 조직이 많아요.

**서버 사이드 렌더링(Server Side Rendering)**은 말 그대로 보통 화면 그리는 걸 담당하는 브라우저가 아니라 서버에서 화면을 그리는 행위를 의미합니다. 리액트, 뷰와 같은 프런트엔드 라이브러리는 보통 브라우저에서 화면을 그리는데 이걸 서버에서 그릴 수 있게 도와주는게 바로 Next.js 프레임워크입니다.

## Next.js랑 React랑 무슨 관계죠?

리액트를 오랫동안 써온 개발자들은 모두 알고 있습니다. Next.js는 SSR(Server Side Rendering) 목적의 프레임워크다 라는 걸 말이죠. 그런데 요즘에는 이 SSR이라는 개념을 크게 알지 않아도 일단 React를 시작하는 사람들이 모두 Next.js로 프로젝트를 시작합니다. 왜 그럴까요?

그 이유는 최근에 개편된 리액트 공식 문서(최근이라고 하기엔 좀 됐습니다.. 😎)에서 리액트 프로젝트를 시작할 때 [Next.js를 추천하기 때문이죠](https://react.dev/learn/start-a-new-react-project#production-grade-react-frameworks). 초창기에는 이미 구시대의 유물이 되어 버린 것 같은 CRA(Create React App)로 프로젝트 생성을 많이 했어요. 그런데 요게 프로젝트 생성한 이후에 커스텀하기가 장난아니게 귀찮습니다. 그렇게 돌아올 수 없는 강을 건너고.. 리액트 팀에서는 프로젝트 생성 경험이 더 높은 Next.js를 택한 것 같아요. (Vite도 충분히 괜찮은데 Vue.js 제작자가 만든 도구라 밀어주지 않는 느낌적인 느낌? ㅋㅋ)

그리하여 요즘 React를 시작하는 분들께는 Next.js가 프로젝트 생성 도구이자 그냥 선택해야 되는 길이 된 것 같아요.

## Next.js를 그럼 얼마나 알아야 하나요?

Next.js에는 정말 많은 편의 기능이 제공됩니다. 라우팅(Routing), 데이터 호출(Data Fetching), 성능 최적화(Performance Optimzation) 등등. 그리고 앞에서 살펴본 SSR이라는 개념 말고도 SSG, ISR, 서버 컴포넌트, 클라이언트 컴포넌트, 앱 라우터 등.. 여러분의 정신 건강을 위해 이 용어들을 모두 설명하지는 않겠습니다. 암튼 뭐가 제공되는게 많고, 쓰면 좋다 이거죠.

자 그럼 질문으로 다시 돌아와서 실무에서 Next.js를 얼마나 알아야 할까요? 애플리케이션을 구현하는데 필요한 최소한의 지식과 기본 동작 원리 정도만 알고 있으면 됩니다. 실무라고 해서 모든 기술들을 헤비하게 사용하지 않아요. 그리구 위에서 말한 것처럼 리액트 공식 문서에서 Next.js를 프로젝트 생성 도구로 안내한지도 그렇게 오래되지 않았거든요. 아직은 Next.js를 쓰는 사람보다 쓰지 않는 사람이 훨씬 많습니다.

## Next.js를 어떻게 배워야 할까요?

React의 기본 문법을 익힌 상태로 Next.js가 제공하는 기능들을 구분할 수 있는 시야를 기르는게 좋습니다. 그렇지 않고 한번에 다 배우려고 하면 나중에는 Next.js가 해주는 건지 React가 해주는 건지 헷갈려서 정작 제일 중요한 React의 핵심을 놓치게 될거예요.

그리고 Next.js를 시작할 때는 최소한의 필수 지식과 동작 원리를 빠르게 파악할 수 있는 자료를 추천드려요. 마침 제가 이번에 열심히 정리해 둔 자료가 있어서 공유합니다. 처음 시작하시는 분들께는 제가 만든 [Next.js 학습 사이트 - Cracking Next.js](https://cracking-next.vercel.app/docs/intro)를 보시라고 권해 드리고 싶네요.

<figure>
  <a href="https://cracking-next.vercel.app" target="_blank">
    <img src="{{ site.url }}/images/posts/web/next/cracking-next.png">
  </a>
  <figcaption>Cracking Next.js</figcaption>
</figure>

만약 영어가 더 편하고 학습할 시간이 많다면 Next.js 공식 문서를 차근히 보셔도 됩니다. 왜냐하면 가장 정확한 기준과 답은 공식 문서에 있으니까요. 

## 사이트보다 더 쉽게 배우고 싶어요

글보다 영상을 선호하시는 분들이라면 제가 이번에 각 잡고 만든 Next.js 시작하기 강의를 들어보시는 걸 추천해 드려요.

<figure>
  <a href="https://inf.run/eTqGZ" target="_blank">
    <img src="{{ site.url }}/images/posts/web/next/learn-next-thubmnail.png">
  </a>  
  <figcaption>인프런 Next.js 시작하기 강의</figcaption>
</figure>

위에서 안내해 드린 학습 사이트를 어떤 순서로 보면 좋을지 감을 잡을 수 있을 거예요. 학습 사이트는 덤일뿐 진짜 알맹이는 강의에서 함께 만드는 실전 프로젝트입니다. 따라가면서 같이 만들다 보면 어느새 머리 속에 최소한의 필수 지식과 동작 원리가 들어와 있을 거예요 ❤️

## 마무리

실무에서 자주 언급되는 Next.js와 React에 대해서 가볍게 알아봤습니다. 어떤 기술을 쓰느냐보다 중요한 건 왜 그 기술을 쓰는지 알고 적재적소에 활용하는 것인 거 같아요. 오늘 안내해 드린 사이트와 강의 정보가 여러분께 도움이 되었으면 좋겠네요. 그럼 전 또 좋은 콘텐츠와 글로 다시 찾아뵙겠습니다. 감사합니다 😁

P.S : 혹시 강의 내용이 궁금하신 분들은 아래 홍보 글을 확인해 보세요 :) <br/>
<a href="https://x.com/jangkeehyo/status/1797403869405970493" target="_blank">강의 홍보 영상 링크</a>
