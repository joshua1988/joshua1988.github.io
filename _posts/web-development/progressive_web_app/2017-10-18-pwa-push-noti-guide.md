---
layout: article
title: "프로그레시브 웹앱 푸시 알람 A to Z"
date: 2017-10-18 18:25:13 +0900
categories: [web-development, pwa]
excerpt: "프로그레시브 웹앱의 주요 기능인 푸시 알람의 옵션과 사용법에 대해서 알아보기"
image:
  teaser: posts/web/progressive_web_app/push-noti/push-notification-teaser.png
  credit: mobify #name of the person or site you want to credit
  creditlink: https://www.mobify.com/platform/progressive-web-apps/
    #url to their site or licensing
locale: "ko"
# 리플 옵션
comments: true
tags:
- 프로그레시브 웹앱
- progressive web app
- 프로그레시브 웹앱 튜토리얼
- 프로그레시브 웹앱 입문
- 프로그레시브 웹앱 시작하기
- 프로그레시브 웹앱 푸시 알람
- 푸시 알람
- 웹앱 푸시 알람
- 웹 푸시 알람
- 웹 푸시
- 웹 푸시 알람 구현방법
- 구현 방법
- 웹 푸시 구현
- web push notification
- pwa push notification
- pwa web push
- 푸시 알람 옵션
- 푸시 알람 사용법
- 푸시 알람 속성
---
{% include toc.html %}

## 들어가며
이 글은 프로그레시브 웹앱에서 구현하는 푸시 알람(Push Notification)에 대해 알아보고 옵션과 사용법을 정리한 글입니다.

최근에 PWA(Progressive Web App: 프로그레시브 웹앱)의 핵심 기술 중 하나인 서비스워커(Service Worker)를 사파리에서 지원하도록 애플사에서 개발을 시작했는데요. 그와 더불어 기존의 맥에서의 크롬 푸시 알람 또한 [브라우저 기반에서 OS 기반으로 업데이트](https://blog.izooto.com/chrome-59-os/) 되었습니다. 이제 점점 프로그레시브 웹앱으로 애플사 계열의 제품 아이폰, 맥에서 자유롭게 사용하는 날이 점점 가까워지고 있는 것 같습니다 :)

여튼 기존에 서비스하는 PWA 푸시 알람이 윈도우 크롬에서는 잘 되었었는데, 맥의 크롬에서는 잘 안돌아가더군요. 그래서, 관련 정보를 뒤지다 보니 푸시 알람에 대해 모두 이해할 수 있는 좋은 사이트를 발견하였습니다. 이번 글은 그 사이트와 기타 자료들을 함께 정리하여 요약하였습니다. 그럼 PWA 푸시 알람 구현하실 때 많은 도움 되시길 바라며..!

## 프로그레시브 웹앱이란?
프로그레시브 웹앱은 사용자 경험 향상을 목적으로 푸시와 같은 모바일 기능과, URL 입력 없이 간편하게 아이콘을 눌러 웹 사이트를 접속할 수 있는 최신 웹 애플리케이션입니다. 더 상세한 내용은 아래의 자료들을 참고하세요.

- [Progressive Web App 소개](https://www.slideshare.net/GihyoJoshuaJang/the-future-of-web-progressive-web-app)
- [현대 웹앱의 미래 - PWA 소개](https://joshua1988.github.io/web-development/opinions/where-are-we-and-where-are-we-heading/#자바스크립트가-현대웹에서-지배적으로-쓰이는-이유)

## PWA 푸시 알람은 뭔가요?
Javascript로 구현하여 웹과 모바일에 모두 전송 가능한 PWA 기능입니다.
Java, Objective-C와 같은 모바일 언어로 푸시 알람을 구현하여 모바일 앱으로 보내는 것과 달리, PWA는 자바스크립트로만 구현이 가능하다는 점이 모바일 앱 개발지식이 없는 웹 개발자에게 또 하나의 무기를 장착시켜주는 것과 같습니다.

자 그럼 여기까지 소개는 간단히 마치고, 본격적으로 푸시 알람 옵션들에 대해서 알아보겠습니다.

## Title & Body
푸시 알람을 구성하는 가장 기본적인 옵션입니다.
- Title : 푸시 알람의 제목
- Body : 알람 본문에 표시될 내용

코드는 아래와 같습니다.

```js
var title = 'Simple Title';
var options = {
  body: 'Simple piece of body text.\nSecond line of body text :)'
};
registration.showNotification(title, options);
```

모양은 이러합니다.

![notification-title-body]({{ site.url }}/images/posts/web/progressive_web_app/push-noti/title-body.png)

## Icon
푸시 알람에 표시될 앱 아이콘을 의미합니다. 보통 웹 사이트의 로고나 정체성을 나타내는 아이콘을 넣습니다. 전 파비콘 넣었어요.

코드는 아래와 같습니다.

```js
var title = 'Icon Notification';
var options = {
  icon: '/images/demos/icon-512x512.png'
};
registration.showNotification(title, options);
```

모양은 이러합니다.

![push-notification-icon]({{ site.url }}/images/posts/web/progressive_web_app/push-noti/icon.png)

<p class="notice">참고로 안드로이드에서 실행하는 경우 최소 64dp 이미지 사용하셔야 합니다. 일반적으로 192px 라고 보면 되겠네요..!</p>

## Badge
배지는 모바일에서만 동작하는 속성입니다. 모바일에서 알람을 받을 때 상단 상태 바에 알람이 표시되는데, 어디서 알람이 알 수 있는 조그만아이콘을 의미하죠. 아래처럼 말이죠.

![push-notification-badge1]({{ site.url }}/images/posts/web/progressive_web_app/push-noti/badge1.png)

아무것도 설정 안하시면 아래처럼 브라우저 모양이 표시됩니다.

![push-notification-badge2]({{ site.url }}/images/posts/web/progressive_web_app/push-noti/badge2.png)

코드는

```js
var title = 'Badge Notification';
var options = {
  badge: '/images/demos/badge-128x128.png'
};
registration.showNotification(title, options);
```

<p class="notice">배지의 권장 크기는 72px 입니다.</p>

## Image
예전엔 이런 옵션 없었는데 최근에 나온 기능이네요. 알람 창 안에 이미지를 표시하는 역할을 합니다.

코드는 아래와 같습니다.

```js
var title = 'Image Notification';
var options = {
  image: '/images/demos/unsplash-farzad-nazifi-1600x1100.jpg'
};
registration.showNotification(title, options);
```

모양은 이렇네요.

![push-notification-image]({{ site.url }}/images/posts/web/progressive_web_app/push-noti/image.png)

<p class="alert">크롬이랑 파이어폭스 이미지 배율이 다르니 주의하세요..!</p>

## Actions
알람에 특정 동작을 수행하는 버튼을 추가할 수 있습니다.
코드는 아래와 같습니다.

```js
var title = 'Actions Notification';
var options = {
  actions: [
    {
      action: 'coffee-action',
      title: 'Coffee',
      icon: '/images/demos/action-1-128x128.png'
    },
    {
      action: 'atom-action',
      title: 'Atom',
      icon: '/images/demos/action-4-128x128.png'
    }
  ]
};

registration.showNotification(title, options);
```

모양은 이렇습니다.

![push-notification-actions]({{ site.url }}/images/posts/web/progressive_web_app/push-noti/actions.png)

<p class="notice">액션을 구분하기 위한 유니크 아이디는 action 속성 자체로 활용하세요.</p>

## Tag
태그는 새로운 알림이 뜰 때 이전 알림의 태그 값을 참고하여 이전 알림은 지우고,
새로운 알림을 띄우게 하는 역할을 합니다.

코드는 이러합니다.

```js
// 1.
var title = 'Notification 1 of 3';
var options = {
  body: 'With \'tag\' of \'message-group-1\'',
  tag: 'message-group-1'
};
registration.showNotification(title, options);

// 2.
var title = 'Notification 2 of 3';
var options = {
  body: 'With \'tag\' of \'message-group-2\'',
  tag: 'message-group-2'
};
registration.showNotification(title, options);
```

위 코드 결과는

![push-notification-tag]({{ site.url }}/images/posts/web/progressive_web_app/push-noti/tag.png)

만약 여기서 코드를 이렇게 바꾸면

```js
// 1.
var title = 'Notification 3 of 3';
var options = {
  body: 'With \'tag\' of \'message-group-1\'',
  tag: 'message-group-1'
};
registration.showNotification(title, options);

// 2.
var title = 'Notification 2 of 3';
var options = {
  body: 'With \'tag\' of \'message-group-2\'',
  tag: 'message-group-2'
};
registration.showNotification(title, options);
```

요렇게 동작할 겁니다.

![push-notification-tag2]({{ site.url }}/images/posts/web/progressive_web_app/push-noti/tag2.png)

<p class="notice">모바일에서는 tag값에 renotify를 한번 줘보세요. 그럼 갱신될 때 알아차리기 수월합니다.</p>

## Vibrate
알람이 표시될 때 진동 패턴을 정의합니다. 진동이니 아무래도 모바일에만 해당되겠죠. 그리고 무음 모드가 아니어야 합니다.
코드는 아래와 같습니다.

```js
var title = 'Vibrate Notification';
var options = {
  vibrate: [500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500]
};
registration.showNotification(title, options);
```

## Sound
알람이 표시될 때 나는 소리를 지정합니다. 위 진동과 마찬가지로 폰에만 해당됩니다.

코드는

```js
var title = 'Sound Notification';
var options = {
  sound: '/demos/notification-examples/audio/notification-sound.mp3'
};
registration.showNotification(title, options);
```

---
여기서부터는 푸시 알람을 받고 알람을 조작하는 방법들에 대해 알아보겠습니다.

## 알람 클릭 시 윈도우 창 띄우기
알람을 클릭했을 때 가장 흔한 처리 방법으로 윈도우나, 새 탭을 띄우는 방법입니다. `clients.openWindow()` 를 사용하면 됩니다.
코드상으로 이렇게 구현하시면 됩니다.

```js
var examplePage = '/demos/notification-examples/example-page.html';
var promiseChain = clients.openWindow(examplePage);
event.waitUntil(promiseChain);
```

## 알람 클릭 시 이미 열려있는 창에 집중시키기
제목 그대로, 클릭 했을 때 만약 이미 해당 사이트가 열려 있으면 그쪽으로 사용자 시선을 집중시키는 속성입니다. 위 방법보다는 조금 더 완성도 있게 알람을 구현할 수 있죠.

```js
// new URL() : url이 products/10 이런식이면 http://products/10 와 같이 바꿔줍니다.
var urlToOpen = new URL(examplePage, self.location.origin).href;

var promiseChain = clients.matchAll({ // matchAll() 은 탭만 반환하고, 웹 워커는 제외합니다.
  type: 'window',
  includeUncontrolled: true // 현재 서비스워커 이외의 다른 서비스워커가 제어하는 탭들도 포함합니다. 그냥 default로 항상 넣어주세요.
})
.then((windowClients) => {
  // windowClients 는 현재 열린 탭들의 값입니다.
  var matchingClient = null;

  for (var i = 0; i < windowClients.length; i++) {
    var windowClient = windowClients[i];
    if (windowClient.url === urlToOpen) {
      matchingClient = windowClient;
      break;
    }
  }

  if (matchingClient) {
    return matchingClient.focus();
  } else {
    return clients.openWindow(urlToOpen);
  }
});

// promiseChain은 위 matchingClient.focus()의 실행이 끝난 후 waitUntil()을 수행하기 위한 프로미스 체인입니다.
event.waitUntil(promiseChain);
```

## 알람에 특정 데이터 추가하기
푸시 알람에 아래와 같이 데이터를 추가할 수 있습니다.

```js
var options = {
  body: 'This notification has data attached to it that is printed ' +
    'to the console when it\'s clicked.',
  tag: 'data-notification',
  data: {
    time: new Date(Date.now()).toString(),
    message: 'Hello, World!'
  }
};
registration.showNotification('Notification with Data', options);
```

그리고 위 데이터는 클릭 이벤트 처리시에 아래와 같이 받아낼 수 있습니다.

```js
var notificationData = event.notification.data;
console.log('The data notification had the following parameters:');
Object.keys(notificationData).forEach((key) => {
  console.log(`  ${key}: ${notificationData[key]}`);
});
console.log('');
```

## 마무리
네 여기까지 PWA 푸시 알람에 대해서 알아봤습니다. 여러 개의 푸시 알람을 결합하는 고급 패턴에 대해서는 다루지 않았지만, 궁금하신 분들을 위해 아래 참고로 넣어봤습니다. 아무쪼록 PWA 푸시 알람 구현시에 도움이 많이 됐으면 좋겠네요. 감사합니다 :)

## 참고
- [Notification Push Books](https://web-push-book.gauntface.com/demos/notification-examples/)
- [Noticication Generator](https://tests.peter.sh/notification-generator/)
- [Merging Notification 고급 패턴](https://web-push-book.gauntface.com/chapter-05/04-common-notification-patterns/#merging-notifications)
