---
layout: article
title: "FCM 과 GCM 차이"
date: 2016-11-30 16:28:13 +0900
categories: web_dev
image:
  teaser: posts/web/fcm.png
  credit: Google #name of the person or site you want to credit
  creditlink: https://firebase.google.com/docs/cloud-messaging/
  #url to their site or licensing
locale: "ko"
# 리플 옵션
comments: true
tags: fcm
---
{% include toc.html %}

> GCM 으로 Mobile Push 하는데 익숙한 나는 FCM 을 이용한 Web Push 에서 GCM 과 FCM 에 대한 개념에 혼동이 생겼다. 이 글에서는 GCM 과 FCM 의 차이점에 대해서 알아본다.

## FCM 과 GCM 용어
- 먼저 간단히 용어부터 정리하자.
- GCM 이란?

  - Google Cloud Messaging 의 약자
  - 구글에서 제공하는 Server 와 Client app 간에 푸쉬 메시지를 보낼 수 있는 서비스
  - Android & iOS 를 지원


- FCM 이란?

  - Firebase Cloud Messaing
  - GCM 의 새 버전을 의미하는데 단지 Firebase 진영에 속하는 것 뿐이다.
  - GCM 의 주요 구조를 그대로 갖고 있으며 Android & iOS & Mobile Web 등의 다양한 플랫폼을 모두 커버한다.

## FCM 과 GCM 유래
- 모바일 개발자에게는 GCM 이라는 용어가 익숙하다. 국내의 많은 모바일 앱의 Push 가 GCM 을 사용하고 있는 상황
- Google 에서는 Google Cloud 를 이용한 Push 서비스 기반을 GCM 으로 닦아온 상황이며, Mobile Web 의 중요도가 높아짐에 따라 Mobile Application 뿐만 아니라 Mobile Web 등 모든 플랫폼에서 사용 가능한 FCM 서비스를 내놓았다.

## FCM 과 GCM 차이
- GCM 의 Client 단 구현시에 번거로웠던 등록 및 구독 로직을 FCM 라이브러리 안에 포함시켜 개발자가 별도로 개발하지 않아도 된다.
- 또한, Firebase Analytics insight 의 기능을 활용하여 특정 타겟층에 push 전송이 가능해졌다.
- 앞으로 구글에서는 새로운 기능들을 모두 FCM 쪽에만 추가하고, GCM 에는 추가하지 않을 것이라고 한다. 따라서, FCM SDK 사용을 강력히 권장하고 있다.
- GCM 은 결국 FCM 의 일부이며 GCM 으로 기 구현된 서비스들도 FCM 으로 동일하게 구현이 가능하다고 한다.
