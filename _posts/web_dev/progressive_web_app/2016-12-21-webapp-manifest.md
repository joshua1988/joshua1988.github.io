---
layout: article
title: "Web App Manifest 소개 및 사용법"
date: 2016-12-21 17:44:13 +0900
categories: web_dev
image:
  teaser: posts/web/progressive_web_app/webapp_manifest.png
  credit: google #name of the person or site you want to credit
  creditlink: https://developers.google.com/web/updates/2015/08/using-manifest-to-set-sitewide-theme-color
    #url to their site or licensing
locale: "ko"
# 리플 옵션
comments: true
---
{% include toc.html %}

## 왜 주목 받는가?
- App Store 가 생긴 이후로 웹 개발자들은 어떻게 하면 Web Application 을 Mobile Application 의 느낌으로 보이게 할지 연구해왔다.
- Apple, Chrome, IE (Microsoft) 등이 Web App Manifest 파일을 차례로 도입하면서, Mobile Icon과 Launch Screen (Splash Screen) 등을 Mobile 에 등록할 수 있게 하면서 Web Application 이 점점 Mobile Application 의 형태를 띄게 된다.

## 구현? 사용법?
- Web App 에 Native 느낌을 더하기 위해 Apple 이 추가한 몇 가지 태그는 아래와 같다.

  {% highlight html %}
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
  <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon-57x57.png">
  <link rel="apple-touch-startup-image" href="/splash-startup.png">
  {% endhighlight %}

- 그리고 이후에 Google 이 다음과 같은 태그를 추가한다.

  {% highlight html %}
  <meta name="mobile-web-app-capable" content="yes">
  <link rel="icon" sizes="72x72"href="/icon72.png">
  <link rel="icon" sizes="114x114"href="/icon114.png">
  <link rel="icon" sizes="192x192"href="/icon.png">
  <link rel="icon" sizes="57x57"href="/icon57.png">
  {% endhighlight %}

- 결국 이들의 종착지는 바로 [Web App Manifest File](https://w3c.github.io/manifest/) 이다.

  {% highlight html %}
  <link rel="manifest" href="manifest.json">
  {% endhighlight %}

## Building Manifest File
- 메니페스트 파일은 JSON 파일과 비슷한 형태를 갖고 있다.

  {% highlight javascript %}
  {
    "name": "Super Racer 2000",
    "short_name": "Racer2K",
    "icons": [{
          "src": "icon/lowres.png",
          "sizes": "64x64",
          "type": "image/webp"
        }, {
          "src": "icon/hd_small.png",
          "sizes": "64x64"
        }, {
          "src": "icon/hd_hi.png",
          "sizes": "128x128",
          "density": 2
        }],
    "scope": "/racer/",
    "start_url": "/racer/start.html",
    "display": "fullscreen",
    "orientation": "landscape"
  }
  {% endhighlight %}

- 위의 속성들을 설명하자면,

  - `name` : icon 에 표시되는 이름
  - `short_name` : Web Application 이름의 짧은 버전. 공간이 충분하지 않아 full name 이 나올 수 없을 때 사용된다.
  - `start_url` : 실행시에 시작되는 URL 주소
  - `display` : 앱이 어떤식으로 실행될지 정하는 속성 (옵션 : *fullscreen, minimul-ui, standalone, browser*)
  - `orientation` : 웹 어플리케이션의 화면 방향을 정의 (옵션 : *any, landscape, portrait, ...*)

### Icon
- 아이콘은 앱을 표시하기 위한 이미지
- 아이콘에는 앱 표시에 사용되는 여러가지의 이미지들의 특성이 포함되어 있다.

  - `src` : 이미지 위치를 가리킨다
  - `type` : 아이콘 파일 유형을 정한다
  - `sizes` : 이미지 크기를 정한다
  - `density` : 기기의 pixel density 에 맞춰 어떤 아이콘이 사용될지 정한다. (지정하지 않을 경우 default 값은 1.0)

### Scope & Navigation Scope
- Navigate outside the app : 앱 유효범위의 밖으로 이동하려고 하면 (a 태그 클릭시) 새로운 브라우저를 실행한다.
- Navigate into the app : *deep linking* 이라고 불린다. 매니페스트 파일 내의 유효범위에 있는 URL로 이동하면, 앱 밖으로 벗어나지 않는다. 웹 페이지 뿐만 아니라 네이티브 앱에서도 웹 앱을 여는 것이 가능하다.

## Lesson & Learned
- iOS 에서 즐겨찾기로 추가한 아이콘으로 웹 앱을 실행하면, 웹 내에서 href 태그 접근 시 새로운 브라우저를 띄우면서 scope 이 바뀐다.
- 해결책 : `<a href="#">` 없앤다.


#### Reference
[Understanding the Manifest for Web App](https://thishereweb.com/understanding-the-manifest-for-web-app-3f6cd2b853d6#.njt00wk6c)
