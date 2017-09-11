---
layout: article
title: "자바스크립트의 동작원리: 엔진, 런타임, 호출 스택"
date: 2017-09-11 15:40:32 +0900
categories: [web-development, translation, javascript]
excerpt: "(번역) 자바스크립트는 엔진에서 어떻게 돌아가나? 런타임과 호출 스택 해부"
image:
  teaser: posts/web/translation/vue-js.jpeg
  credit: Alexander Zlatkov
  creditlink: https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf
  #url to their site or licensing
locale: "ko_KR"
# 리플 옵션
comments: true
tags:
- 자바스크립트
- 자바스크립트 성능
- 자바스크립트 엔진
- 자바스크립트 동작
- 자바스크립트 동작 원리
- 자바스크립트 기초
- 자바스크립트는 어떻게 동작하는가
- 자바스크립트 성능 최적화
- 자바스크립트 엔진 분석
- 자바스크립트 호출 스택
- 자바스크립트 런타임
- 프론트엔드 개발
- 프론트엔드 개발자
- 자바스크립트 입문
- javascript runtime
- javascript call stack
- captain pangyo
- 캡틴판교
---
{% include toc.html %}

## 들어가기
이 글은 "How JavaScript works: an overview of the engine, the runtime, and the call stack" 를 번역한 글입니다.

요즘 자바스크립트를 웹 뿐만 아니라, 서버, IOT 등 전 분야에서 사용을 하고 있는데요.
프론트엔드 개발자로서 자바스크립트는 매일 만지게 되는 언어입니다.

기본적인 문법과 API 사용법에 대해서 익히는 것도 중요하지만, 고급 개발자가 되려면
자바스크립트 동작원리를 알아야 한다고 생각하는데요. 늘 여기 저기서 동작원리 관련된 글을 많이 접했지만,
이렇게 깔끔하고 쉽게 정리된 글은 처음이라 번역하였습니다. 많은 도움 되시길! :)

## 머릿말
자바스크립트의 인기가 날이 갈수록 높아짐에 따라, 많은 팀들이 프론트엔드, 백엔드, 하이브리드 앱, 임베디드 장치 등
많은 분야에서 자바스크립트 지원 범위를 확대하고 있습니다.

이 글은 자바스크립트의 동작원리 등 자바스크립트를 깊게 파보는 시리즈 물의 첫 번째 글입니다.
자바스크립트를 블락 단위로 구성하는 방법과 그리고 그 블락이 어떻게 동작하는지 알면 더 나은 코드와 앱을 제작할 수 있다고 생각합니다.

아래의 [GitHut stats](http://githut.info/) 에서 보실 수 있듯이,
자바스크립트는 Github 의 Active Repositories 와 Total Pushes 에서 가장 상위에 위치해있습니다.
다른 범주에서도 크게 뒤 떨어져 있지는 않죠.

![githut-stats]({{ site.url }}/images/posts/web/translation/how-js-works/githut-stats.png)

[Github 에서 사용되는 언어 순위](https://madnight.github.io/githut/)

만약 프로젝트에서 자바스크립트 의존성이 높아진다면, 개발자는 완성도 높은 소프트웨어 제작을 위해
자바스크립트의 언어적 특성과 내부 구조를 정확하게 이해해야 합니다.

밝혀진 바로는, 많은 자바스크립트 개발자들이 매일 자바스크립트를 사용하고 있지만
실제로 자바스크립트의 기본적인 동작원리에 대해서는 모르는 경우가 많다고 하네요.

## 개요
아마 모든 분들이 V8 엔진에 대해서 들어봤을 겁니다. 대부분 자바스크립트가 싱글 쓰레드 기반이고, 콜백 큐를 이용하는 것도 알거에요.

이 글에서는 방금 말씀드린 개념들에 대해서 더 자세히 알아보고, 어떻게 자바스크립트가 동작하는지 파헤쳐 볼거에요.
글을 다 읽고 나면, 자바스크립트 내장 API 를 효율적으로 사용하는 non-blocking 앱을 구현할 수 있을겁니다.

만약 자바스크립트에 익숙하지 않으시다면, 자바스크립트가 왜 다른 언어에 비해서 "특이한" 언어인 지 깨닫게 될겁니다.
자바스크립트 경험이 많은 개발자시라면, 여러분이 매일 사용하시는 자바스크립트 런타임 동작 방식에 대해 통찰력을 얻게 될겁니다.

## 자바스크립트 엔진
자바스크립트 엔진의 대표적인 예는 Google V8 엔진입니다. V8 은 크롬과 Node.js 에서 사용합니다.
아래는 엔진의 구조도를 간단히 표현해봤습니다.

![js-engine-structure]({{ site.url }}/images/posts/web/translation/how-js-works/js-engine-structure.png)

엔진의 주요 두 구성요소는

- Memory Heap : 메모리 할당이 일어나는 곳
- Call Stack : 코드 실행에 따라 호출 스택이 쌓이는 곳

## 런타임
거의 모든 자바스크립트 개발자들이 setTimeout 과 같은 브라우저 내장 API 를 사용합니다.
하지만, 이 API 를 자바스크립트 엔진에서 제공하지는 않습니다.

그럼 얘네들은 대체 어디서 오는 걸까요? 사실 현실은 좀 더 복잡합니다.

![js-engine-runtime]({{ site.url }}/images/posts/web/translation/how-js-works/js-runtime-engine.png)

위 그림처럼, 자바스크립트 엔진 이외에도 자바스크립트에 관여하는 다른 요소들이 많습니다.
DOM, Ajax, setTimeout 과 같이 브라우저에서 제공하는 API 들을 Web API 라고 합니다.
그리고 아래 쪽에 이벤트 루프와 콜백 큐도 있네요.

## 호출 스택(Call Stack)
자바스크립트는 기본적으로 싱글 쓰레드 기반 언어입니다. 호출 스택이 하나라는 소리죠.
따라서 한 번에 한 작업만 처리할 수 있습니다.

호출 스택은 기본적으로 우리가 프로그램 상에서 어디에 있는지를 기록하는 자료구조입니다.
만약 함수를 실행하면(실행 커서가 함수 안에 있으면), 해당 함수는 호출 스택의 가장 상단에 위치하는 거죠.
함수의 실행이 끝날 때(리턴 값을 돌려줄 때), 해당 함수를 호출 스택에서 제거합니다. 그게 스택의 역할입니다.

아래 예제 코드를 살펴볼까요.

```js
function multiply(x, y) {
    return x * y;
}
function printSquare(x) {
    var s = multiply(x, x);
    console.log(s);
}
printSquare(5);
```

처음 엔진이 이 코드를 실행하는 시점에는 호출 스택이 비어있습니다.
하지만 코드가 실행되면서 호출 스택은 아래와 같이 변합니다.

![call-stack]({{ site.url }}/images/posts/web/translation/how-js-works/call-stack.png)

호출 스택의 각 단계를 스택 프레임(Stack Frame) 이라고 합니다.

그리고 보통 예외가 발생했을 때 콘솔 로그 상에서 나타나는 스택 트레이스(Stack Trace)가 스택 프레임입니다.
간단히 말해서 에러가 났을 때의 호출 스택의 단계를 의미하는 거죠.

아래 코드도 살펴봅시다.

```js
function foo() {
    throw new Error('SessionStack will help you resolve crashes :)');
}
function bar() {
    foo();
}
function start() {
    bar();
}
start();
```

위 코드가 foo.js 에 있다고 하고 크롬에서 실행하면

![stack-trace-error]({{ site.url }}/images/posts/web/translation/how-js-works/stack-trace-error.png)

호출 스택이 최대 크기가 되면 **"스택 날려 버리기"** 가 일어납니다.
이는 반복문 코드를 광범위 하게 테스트 하지 않고 실행 했을 때 자주 발생합니다.
아래 코드를 보시면

```js
function foo() {
    foo();
}
foo();
```

엔진에서 이 코드를 실행할 때, foo() 에 의해서 foo 함수가 호출됩니다.
그런데 여기서 foo 함수가 반복적으로 자신을 다시 호출하는 재귀 호출을 수행합니다.
그래서 매번 실행할 때마다 호출 스택에 foo() 가 쌓이게 됩니다. 아래와 같이 말이죠.

![maximum-call-stack]({{ site.url }}/images/posts/web/translation/how-js-works/maximum-call-stack.png)

그러다가 특정 시점에 함수 호출 횟수가 Call Stack 의 최대 허용치를 넘게 되면
브라우저가 아래와 같은 에러를 발생시킵니다.

![maximum-call-stack-error]({{ site.url }}/images/posts/web/translation/how-js-works/maximum-call-stack-error.png)

싱글 스레드에서의 코드 실행은 멀티 스레드 환경에서 제기되는 복잡한 문제나 시나리오를
고민하지 않아도 되기 때문에 상당히 쉽습니다. 예를 들면, 데드락 같은게 있겠죠.

허나 싱글 스레드에서 코드를 실행하는 건 상당히 제약이 많습니다.
한 개의 호출 스택을 갖고 있는 자바스크립트의 실행이 느려지면 어떻게 될까요?

## 동시성(Concurrency) & 이벤트 루프(Event Loop)
호출 스택에 처리 시간이 어마어마하게 오래 걸리는 함수가 있으면 무슨 일이 발생할까요?
예를 들어, 브라우저에서 자바스크립트로 매우 복잡한 이미지 프로세싱 작업을 한다고 합시다.

*이게 대체 어때서?* 라고 의문이 생길지도 모르지만, 여기서 문제는 호출 스택에서 해당 함수가 실행되는 동안
브라우저는 아무 작업도 못하고 대기 상태가 됩니다.
이 말뜻은 **브라우저는 페이지를 그리지도, 어느 코드도 실행을 못한다는 거죠, 말 그대로 그냥 가만히 있는 겁니다.**
만약 매끄럽고 자연스러운 화면 UI 를 가진 앱을 원한다면 위 부분은 문제가 됩니다.

문제는 이뿐만이 아닙니다. 브라우저가 호출 스택의 정말 많은 작업들을 처리하다 보면,
화면이 아마 오랫동안 응답하지 않게 됩니다. 이 경우에 대부분의 브라우저가 아래와 같은 에러를 띄우면서
페이지를 종료할건지 물어봅니다.

![terminate-page-popup]({{ site.url }}/images/posts/web/translation/how-js-works/terminate-page-popup.jpeg)

이건 사용자 경험을 저해하는 행위죠, 맞나요?

자 그렇다면 어떻게 페이지 렌더링 동작을 방해하지 않고 브라우저의 응답도 끊지 않으면서
연산량이 많은 코드를 실행할 수 있을까요? 정답은 바로 **비동기 콜백** 입니다.
비동기 콜백 관련 내용은 [V8 엔진에서 최적화 코드 짜는 5가지 팁](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e) 에서 자세히 다룰 예정입니다.

## 참고
원문 : [How JavaScript works: an overview of the engine, the runtime, and the call stack](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)
