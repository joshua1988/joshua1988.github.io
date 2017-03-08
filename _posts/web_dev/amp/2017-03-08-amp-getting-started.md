---
layout: article
title: "최신 웹 트렌드 AMP 시작하기"
date: 2017-03-08 14:36:32 +0900
categories: web_dev
excerpt: "AMP 소개, 동작원리, 입문용 튜토리얼"
image:
  teaser: posts/web/amp/amp.png
  credit: Brian Jackson
  creditlink: https://kinsta.com/blog/google-amp/
  #url to their site or licensing
locale: "ko_KR"
# 리플 옵션
comments: true
tags:
- AMP
- Accelarted Mobile Page
- web developement
- 웹 최신 트렌드
- 웹 개발
- Google AMP
- AMP 소개
- AMP 튜토리얼
---
{% include toc.html %}

## AMP (Accelarated Mobile Page)
- 모바일 기기에서 웹 사이트의 접근성을 높이기 위한 가속화 모바일 페이지
- 거의 즉시에 가까운 페이지 로딩을 위해 여러 기법들로 최적화 하였고, AMP HTML / JS / CSS 로 구성되어 있다.

## AMP 동작 원리
- AMP 에 포함되는 모든 자바스크립트를 비동기 방식으로 실행합니다.
  - 개발자는 AMP에 별도의 자바스크립트를 삽입할 수 없습니다.
  - 페이지 동작과 관련된 부분은 커스텀 AMP 요소를 통해 구현할 수 있습니다.
  - 별도로, iframe 안에 외부 자바스크립트 라이브러리 포함이 가능합니다. 하지만 이로 인해 메인페이지의 렌더링이 방해 받지는 않습니다.

- 이미지, 광고, iframe 과 같은 외부 리소스들의 사이즈와 위치를 지정해주어야 합니다.
  - 외부 리소스를 다운받기 전에 사이즈를 지정하면 리소스 다운로드를 기다릴 필요 없이 페이지 레이아웃을 정할 수 있습니다.
  - 폰트를 포함한 전체 문서의 레이아웃을 그리기 위해 단 한번의 HTTP 요청만 필요합니다.
  - 위와 같은 작업으로 리소스가 로딩될 때 레이아웃을 다시 그릴 필요가 없습니다. (브라우저에서 페이지 레이아웃 재조정과 스타일 재 계산은 고비용 작업)

- 커스텀 스크립트를 사용하는 경우 커스텀 태그를 지정해주어야 합니다.


``` javascript
<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
```


- 외부 라이브러리들이 렌더링 동작에 방해되지 않도록 합니다.
  - AMP 는 외부 자바스크립트 라이브러리를 iframes 안에서만 허용합니다. 이렇게 하면 메인 페이지 실행을 방해하지 않습니다.
  - iframes 에서 스타일 재계산이나 페이지 레이아웃 재조정이 일어나더라도, DOM 사이즈가 작아 작업 속도가 매우 빠릅니다.

- 모든 CSS 스타일은 인라인이어야 하고 사이즈가 정해져 있습니다.
  - 1 개의 인라인 CSS 스타일은 최소 1 개 이상의 HTTP 요청을 줄입니다.
  - 인라인 CSS 스타일의 최대 사이즈는 50kb 입니다.

- 웹 폰트 요청은 효율적으로 해야 합니다.
  - 웹 폰트의 크기는 일반적으로 큽니다.
  - 일반적인 웹 페이지에서는 폰트를 다운받기 전에 순차적으로 외부 자바스크립트와 스타일 시트를 로딩합니다. 그리고 나서 폰트를 다운받습니다.
  - AMP 에서는 폰트를 받기까지 외부 자바스크립트와 스타일 시트를 다운받는 HTTP 요청이 존재하지 않습니다.
  - 자바스크립트의 경우 async 속성을, 스타일 시트의 경우 인라인을 이용하기 때문이죠.

- 스타일 재계산 최소화하기
  - 페이지에서 요소 측정이 일어날 때마다, 스타일 재계산이 일어납니다. 그리고 이는 전체 페이지 레이아웃 재조정과 연결되기 때문에 많은 비용이 소모됩니다.
  - AMP 페이지에서는 모든 DOM 을 화면에 그리기 전에 읽기 때문에 한 프레임당 한번의 스타일 재 계산이 일어납니다.

- GPU 가속화 애니메이션만 사용합니다.
  - 빠른 성능을 위한 최적화 방법중 하나는 GPU 위에서 실행하는 것입니다.
  - GPU 의 단점은 페이지 레이아웃 재조정을 못하는 것인데 이 작업을 보통 브라우저에 위임합니다.
  - 애니메이션과 관련된 CSS 규칙은 GPU 에서 실행될 수 있도록 하는 것입니다.
  - 특히, AMP 는 애니메이션 작업과 변환 작업을 transform 과 opacity 에서 하도록 하여 레이아웃 조정이 필요없습니다.

- AMP 는 리소스 로딩 순서를 조정합니다.
  - AMP 는 리소스 다운로드를 모두 제어하여 중요도에 따라 순서를 정합니다.
  - 이미지나 광고는 필요한 경우 (스크롤 해서 보여지는 경우) 에만 재빨리 다운로드 합니다.
  - 레이지 로딩 관련 리소스의 경우에는 pre-fetch 를 해놓기 때문에, 로딩이 되어야 하는 시점에 더 빠르게 로딩되고 CPU 는 필요시에만 사용됩니다.

- 페이지 즉시 로딩하기
  - DNS Lookup, TCP Handshake 등을 미리 처리하는 [preconnect API](https://www.w3.org/TR/resource-hints/#dfn-preconnect) 로 HTTP 요청을 최대한 빨리 합니다.
  - prerending 의 경우 모든 웹 컨텐츠의 적용되며 많은 양의 대역폭과 CPU 를 소비합니다.
  - AMP 는 위의 단점들을 보완하는 최적화가 되어 있으며, CPU 가 많이 소비되는 rendering 의 경우에는 prerendering 을 하지 않습니다.

## AMP 시작하기
- AMP 의 기본적인 코드 구조는 다음과 같다.

```html
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello, AMPs</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
```

- 위 문서에서 AMP 와 관련된 부분은

```html
<!-- AMP 자바스크립트 라이브러리 로딩 -->
<script async src="https://cdn.ampproject.org/v0.js"></script>

<!-- AMP CSS 스타일 -->
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
```

## AMP 이미지 추가
- AMP 에서 이미지 태그는 아래와 같이 추가한다.

``` html
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
```

- AMP 에서 일반적인 HTML 태그들은 그대로 사용되지만, 위와 같이 img 태그는 amp-img 로 변환하여 사용한다.
- amp-img 와 같은 태그를 사용하는 이유는 해당 리소스가 로딩되기 전에 페이지 레이아웃을 정하고 레이지 로딩에 대한 네트워크 제어와 리소스 로딩 우선순위를 효율적으로 관리하기 위해서다. **(Foot Note 로 쓰면 좋을 듯)**
- embed, param 등등 몇 개의 HTML 표준 태그들은 AMP 에서 사용할 수 없다. [참고](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)

## AMP CSS 스타일링 추가
- AMP 의 요소에 대한 스타일링은 `<style amp-custom>` 태그를 이용한다.

```html
<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>
```

- AMP CSS 스타일링에 대해 주의할 점은 다음과 같다.
  - 모든 AMP 페이지는 `<style amp-custom>` 태그 한 개만 포함할 수 있다.
  - HTML 요소 인라인 속성을 사용할 수 없다. 모든 스타일 규칙은 head 안에 선언되어야 함.
  - `!important` 를 비롯하여 몇몇 표준 스타일 규칙을 사용할 수 없고, 외부 스타일 시트 참조도 불가능하다. (커스텀 폰트 제외)

## AMP 미리보기와 유효성 검사
- 일반 HTML 문서와 동일하게 브라우저에서 파일을 보거나, 간단한 웹서버로 미리 보기가 가능하다.
- 해당 문서가 AMP 규칙을 잘 따랐는지는 URL 끝에 `#development=1` 추가 하여 개발자 도구에서 콘솔에서 유효성 검사로 알 수 있다.

## AMP 검색과 배포
- 같은 웹 콘텐츠에 대해 AMP, non AMP 페이지 2 개를 모두 갖고 있는 경우가 있다.
- 이러한 경우 `<link>` 를 이용해서 두 페이지를 연결한다.
- 일반 HTML 페이지에는

```html
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
```

- AMP 페이지에는

```html
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
```

- 만약 구분없이 AMP 페이지만 가지고 있을 경우

```html
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
```

## 튜토리얼 결과 페이지
![위의 튜토리얼 코드를 붙여 만든 간단한 AMP]({{ site.url }}/images/posts/web/amp/getting-started-result.png)
