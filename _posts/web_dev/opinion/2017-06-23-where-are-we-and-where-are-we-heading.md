---
layout: article
title: "현대 웹의 주소와 미래"
date: 2017-06-23 11:15:32 +0900
categories: web_dev
excerpt: "유용한 UI Libraries, Javascript Framework, 그리고 내가 생각하는 웹의 현재 주소와 방향"
image:
  teaser: posts/web/opinion/pwa.jpg
  credit: Ido Green
  creditlink: https://www.slideshare.net/greenido/progressive-web-apps-tlv
  #url to their site or licensing
locale: "ko_KR"
# 리플 옵션
comments: true
tags:
- 화면 UI 라이브러리
- 화면 라이브러리
- 프론트엔드 개발 라이브러리
- 프론트엔드 라이브러리
- Javascript 라이브러리
- 자바스크립트 라이브러리
- vue.js
- angular js
- backbone js
- angular
- backbone
- pwa
- 프로그레시브 웹앱
- progressive web app
- 프로그레시브 웹앱 주소
- 웹의 현재와 미래
- 웹 현재
- 웹 미래
- 웹 현재 주소
---
{% include toc.html %}

## 들어가며
어제 문득 저희 팀 팀장님이 저에게 꽤 흥미롭고 심오한 질문을 주셨습니다.

"캡틴판교님 (가명), **왜 웹 개발에서 이렇게 자바스크립트가 많이 쓰일까요? 예전엔 그냥 화면의 작은 단위를 처리하려고 사용하던건데.. 어떻게 생각하세요?**"

어느정도 웹의 기원과 히스토리를 알고 계신분께는 정말 쉬운 대답일수 있습니다. 왜냐면 Javascript 의 비동기 처리 (Ajax) 가 나온 시점부터 자바스크립트가 앞 화면의 MVC Framework 으로 발전하고, 화면 뒷단에서 서버의 역할을 할 수 있는 Javascript Runtime Environment (Node.js) 을 거쳐, 이제는 모바일 영역의 기능들까지 넘보는 Progressive Web App 으로 꾸준히 진화해가는걸 알고 계실테니까요.

오늘 저는 이 글을 통해 제가 알고 있는 웹에 관한 몇가지 지식과 견해를 나누고자 합니다.
- UI Libraries
- Javscript MVC Frameworks
- 자바스크립트가 현대 웹에서 지배적으로 쓰이는 이유

**주의 : 아래는 저의 개인적인 의견과 지식을 공유한 것이므로 옳지 않은 정보가 있을 수 있습니다.**

## 화면 UI libaries
#### [Bootstrap](http://getbootstrap.com/)

트위터에서 시작된 Bootstrap 은 프론트엔드 개발에 첫 입문하시는, 마크업 기술이 상대적으로 미숙한 개발자들에게 사랑받는 라이브러리입니다.
화면 Layout 부터 다양한 컴포넌트와 기능들을 사용할 수 있어 사용성이 꽤 높고, 무엇보다 공식사이트의 잘된 문서화와 Stackoverflow 에 참조할 수 있는 자료가 많아
초기 진입장벽이 낮은 편이라고 생각합니다. 개인적인 Toy Project 나 Prototyping 에 적합할 것 같고, 실제 서비스에 적용하기에는 UI 가 좀 단순하여
별도의 커스터마이징 작업이 필요합니다. 특히 B2C 기업의 서비스에서 Bootstrap 으로 만든 사이트를 내놓은 것은 거의 본적이 없네요..

#### [Foundation](http://foundation.zurb.com/)
국내 입문 개발자들이 Bootstrap 쪽에 조금 더 관심이 많다면, Foundation 은 반대로 외국에서 애용하는 사이트입니다. HP, EA, Amazon, Disney, Washington Post, Ford, University of Cambridge 등등, 이미 적용된 브랜드만 봐도 라이브러리에서 전체적으로 주는 이국적인 느낌이 고스란히 나타나는 것 같습니다.
Bootstrap 과는 다르게 공식 사이트에서 UI 구현 관련 교육 동영상을 제공하고 있고, Bootstrap 이 UI 컴포넌트 별로만 예제와 설명을 제공한다면
Foundation 은 그보다 좀 더 큰 단위의 블록 형태 (여러개의 컴포넌트를 조합) 한 형태의 예제를 제공하여 어떻게 보자면 더 빠르게 프로토타이핑 할 수 있는 여지가 있을 것 같습니다.
개인적으로 토이 프로젝트에 사용해본 적이 있는데, 꽤 문서화와 샘플이 잘되어 있던 걸로 기억합니다.

#### [Materialize Design Lite](https://getmdl.io/started/)
2014 년 Google 에서 Material Design 을 공개하면서, 안드로이드 앱의 UI 가 천하통일 되었죠. 이처럼 Web 도 같은 느낌을 주고자 MDL (Materialize Design Lite) 가 나왔습니다.
이미 요즘에는 널리 보급화 되어 익숙해져버린 Materialize Design : "We challenged ourselves to create a visual language for our users that synthesizes the classic principles of good design with the innovation and possibility of technology and science" 라는 정의에서 볼 수 있듯이, 모두가 공감할 수 있는 시각적인 언어를 선과 색이 깔끔한 컴포넌트로 잘 표현해낸 라이브러리입니다. 공식 사이트의 쇼케이스 예제들을 보시면 알 수 있지만, 정말 깔끔하고 군더더기 없는 디자인입니다.
다만 사용성 측면에서 컴포넌트가 많이 부족합니다. (제가 보기엔 이거 그냥 Web 도 한번 Materialize Design 으로 가보자 해놓고, 추가적인 업데이트나 지속적인 커뮤니티 확장에 실패한 케이스 같아요). 실제로 저는 Google 기술들을 좋아하기 때문에? 뭐든지 개발할 때 Google 기술을 많이 활용하는 편인데요.
그럼에도 불구하고 이 컴포넌트를 이용해 사이트를 제작하다가 도중에 바꿔버렸습니다. 다른 UI 라이브러리에 비해서 정말 지원되는 컴포넌트가 적어 자체적으로 제작하셔야 할 부분이
많으실거에요. 그래서 대안으로 삼은 것이 바로 아래 라이브러리입니다.

#### [Materialize CSS](http://materializecss.com/)
Computer Science 로 유명한 학교인 카네기멜론의 학생 4명이서 만든 Materialize 디자인 기반의 UI 라이브러리입니다. (아마 저처럼 위에 Google MDL 쓰다가 빡쳐서 새로 하나 만든듯..) Github 코드 까보니까 확실히 만든 시기가 2014 년 MDL 나온 몇달 이후로 보여지네요. 일단 저의 개인적인 의견은 이게 짱입니다. 앞선 라이브러리들과 비교해봤을 때도, 컴포넌트 다양함이나 html class 속성의 직관적인 부분, 그리고 모바일과 웹을 다 아우르는 ease 한 레이아웃 등의 강점을 갖습니다. 사견으로는 실제 B2C 서비스에 적용해도 손색이 없을 것 같습니다. Toy Project 에서 부터 실제 서비스 까지 범용적으로 사용될 수 있는 라이브러리라고 생각합니다. 현재뿐만 아니라 앞으로의 발전 가능성을 봤을 때도, 가장 활성화된 커뮤니티를 보유하고 있어서 지속적으로 업데이트가 될 것 같아요. (Github Star : 28,000 개 정도)
Angular, Vue.js 같은 대중적인 Javascript MVC Framework 에도 결합될 수 있게 커뮤니티 멤버들이 늘 전용 라이브러리를 만들어서 제공해주고 있습니다. 저희 입장에서는 갖다가 쓰면 될 것 같아요.

## 자바스크립트가 현대웹에서 지배적으로 쓰이는 이유
**사용자 경험, 그리고 Rich Experience**

처음 자바스크립트가 나왔을 당시 브라우저에서 작은 단위를 처리하는 스크립트로 사용되었습니다. 초기 웹의 탄생 배경만 봐도, 논문을 서로 쉽게 공유하기 위한 플랫폼으로써 정적인 텍스트를 원격지에서 쉽게 보기 위해서 고안되었죠. 그렇게 공유하는 데이터의 유형이 텍스트 -> 이미지 -> 미디어로 진화함에 따라 웹 페이지의 성격이 동적으로 변화하게 됩니다. HTML 의 정적인 텍스트 데이터와 DB 의 동적인 데이터를 결합하여 화면에 표시하기 위해, 서블릿 기반의 Server Side Rendering 이 주를 이루다가 이제는 앞단 화면에서 자바스크립트를 이용한 비동기 처리로 화면을 동적으로 구성 (Cliet Side Rendering) 할 수 있게 되었습니다.

예전 웹 사이트와 현대 웹 사이트를 보면 기능에서 많은 차이가 납니다. Airbnb 를 예를 들자면, 사용자의 입력을 받아 달력을 표시하고, 일정을 선택하면 해당 숙소의 사용여부를 체크 및 숙소의 위치정보를 맵으로 표시하는 등의 많은 처리가 한 화면에서 일어납니다. 결국 이 과정들을 페이지별로 쪼개어 사용자에게 표현해주는 것이 아니라, 한 화면이나 특정 화면 범위 안에서 유동적이면서도 즉각적으로 반응을 해줘야 사용자 입장에서는 불필요한 대기시간을 줄이게 되는 것이죠.
이러한 동적인 화면처리가 사용자에게 제공하는 Rich Experience (풍부한 경험) 이라고 볼 수 있을 것 같습니다. 달리 말해 화면의 불필요한 깜빡거림을 줄이거나 매끄러운 화면전환등을 의미합니다.

자 그럼 그렇게 화면에서의 사용자 경험 향상 이외에 더 편하게 웹을 사용하기 위해 또 어떠한 노력들이 현재 진행되고 있을까요?
바로 Progressive Web Apps 입니다. Google 에서 2015 년에 발표한 새로운 형태의 진보한 웹 앱 인데요. 한 문장으로 요약하자면 "최적화된 웹 성능에 모바일의 Native 기능을 결합한 최신 웹 앱" 입니다. 모바일 기기가 보급화되면서 PC Web 보다는 Mobile Web 으로 접속하는 사용자들이 훨씬 많아 졌는데요. 이 사용자들이 웹에서 더 머무르고 다시 웹을 접속하기 수월하게끔, 웹 사이트에 App Icon & Install Banner & Push Notification 을 추가하여 모바일 앱을 설치하지 않고도 웹을 모바일 앱처럼 접근할 수 있는 편이성을 제공해주고 있습니다. 모바일 앱의 "개발 -> 배포 -> 검색 -> 설치 -> 접속" 의 싸이클을 "개발 -> 배포 -> 검색 (설치 & 접속)" 으로 간편화 하여, 개발자 입장에서나 사용자 입장에서 앱스토어에 올리고 검색해서 다운로드 하는 번거로운 시간들을 줄여주는 거죠.

모바일 기능을 가졌다 하더라도, 일단은 웹 사이트이기 때문에 브라우저 특성을 타게 됩니다. 따라서, Safari (iOS) 같이 미지원하는 브라우저가 있지만 (Mac OS 는 동작함), Chrome & Firefox & Opera & Samsung Browser 등 모던 브라우저는 다 지원하고 있으며, 최근 [Twitter Lite](https://blog.twitter.com/official/en_us/topics/product/2017/introducing-twitter-lite.html) 이나 [Airbnb Roadmap](https://medium.com/airbnb-engineering/rearchitecting-airbnbs-frontend-5e213efc24d2), [Lyft : 6분 8초](https://www.youtube.com/watch?v=m-sCdS0sQO8&t=604s) 를 봐도 이미 현재 웹의 방향 자체가 웹 페이지 안에서의 사용자 경험 뿐만 아니라 웹 페이지를 쉽게 접근하고 편하게 다시 찾을 수 있는 관점에서 전반적인 사용자 경험을 향상 시키는 방향으로 나아가고 있다고 생각합니다.

## Javascript MVC Frameworks
#### [Backbone JS](http://backbonejs.org/)
2012 년 쯤 혜성같이 등장한 Javascript MV* 프레임워크 입니다. 나름 Angular 1 초창기에 대립구조를 가지다가 지금은 인지도가 많이 떨어진 프레임워크죠.
전통적인 웹 개발 패러다임인 MVC 에서 Controller 를 별도로 구분하지 않고, View 에다가 뷰 이벤트 로직을 다 처리할 수 있는 구조로 구성이 되어있죠. 기본적으로 화면 뒷단과의 통신은 JSON 기반의 REST API 를 지원하고 있으며, 별도의 라이브러리들을 함께 구성하여 확장이 되게 편한 형태로 프레임워크가 구성되어 있습니다. 특히 Server Side 통신은 화면에서 간단히 Javascript API 사용했을 때, 기본적인 HTTP Request 요청을 모두 내부적으로 처리하여 Data Model 에 담아주기 때문에, 서버쪽에 관한 지식이 없는 프론트엔드 개발자 분들에게 더 편한 부분도 있는 것 같습니다. 저희 회사에서도 Backbone 을 이용하여 커스텀 MVC 프레임워크를 제작하였고, 배달의 민족이죠 우아한형제들 에서도 Woowahan JS 를 Backbone 기반으로 제작한 것으로 알고 있습니다.

#### [Angular JS 1](https://angularjs.org/) & [2](https://angular.io/)
말이 필요할까요. Google 이 만든 Javascript MVC Framework 입니다. 아래에서 이제 언급드릴 View 단 라이브러리 React & Vue.js 와는 다르게, 기본 Core 라이브러리에 서버쪽으로 통신할 수 있는 인터페이스 기능과, 라우터 등 이미 라이브러리 자체에 탑재된 기능들이 많아 별도의 플러그인을 구성하지 않고도 충분히 서비스 개발이 가능한 라이브러리 입니다.
2 Way Data Binding 나, Custom Directives 는 당시 웹 개발자들에게 신선한 충격이었죠. 1 에서는 페이지를 한 View 의 단위로 보는 형태로 가져가다가, 2 에서는 요즘 React 나 Vue 에서 추구하는 Component 형태로 진화했습니다. 성능 개선을 위한 노력들도 Typescript 도입이나 라이브러리 안쪽의 로직을 개선함으로써 부단히 다른 경쟁자들을 앞서기 위해 꾸준히 개선하고 있는것 같습니다.

#### [Vue JS](https://vuejs.org/)
일단 [이글](https://joshua1988.github.io/web_dev/vuejs-tutorial-for-beginner/) 참고



**한번에 다적기 힘드네요, 추가로 연재하겠습니다..**

**To Be Continued ...**
