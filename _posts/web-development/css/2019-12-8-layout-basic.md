---
layout: article
title: "CSS 레이아웃 기초"
date: 2019-12-8 18:00:32 +0900
categories: web-development
# description: "웹 통신 프로토콜인 URL, HTTP, SMTP, MIME, FTP 을 정리"
excerpt: "CSS로 레이아웃을 만들 때 알아야 할 display, position, 박스 레이아웃"
image:
  teaser: posts/web/layout.png
  credit: Google Developers
  creditlink: https://itnext.io/simple-web-layout-with-css-grid-ec6be5086531
  #url to their site or licensing
locale: "ko_KR"
# 리플 옵션
comments: true
tags:
- css 기초
- css 기초 문법
- css 기초 강좌
- css 레이아웃 예제
- css 레이아웃 소스
- css 레이아웃 정렬
- css 레이아웃 고정
- css 레이아웃 샘플
- css 레이아웃 나누기
- css 속성
- css border
- css position
- css 레이아웃
- css flex
- css float
- 프런트엔드 개발자
- 퍼블리싱
---
{% include toc.html %}

## 들어가며

오늘은 페이지 레이아웃을 구성할 때 알아야 하는 CSS 속성들에 대해 알아보겠습니다 😄

## display 속성

`display` 속성은 페이지의 레이아웃을 결정하는 속성입니다. 모든 HTML 엘리먼트는 `display` 값을 갖고 있으며 대부분 `block` 아니면 `inline` 입니다.

## display 속성 종류

자주 사용되는 `display` 속성은 다음 5가지가 있습니다.

- `block` : 블록 엘리먼트는 기본적으로 하나의 줄을 차지하고 가능한 최대의 가로 넓이를 가집니다. 대표적인 태그에는 `div`, `p`, `form`, `header`, `section` 등이 있습니다.
- `inline` : 인라인 엘리먼트는 특정 텍스트를 감싸는 형태의 디스플레이 속성입니다. 대표적인 태그에는 `span`, `a` 등이 있습니다.
- `inline-block` : 특정 엘리먼트 안에서 인라인으로 블록 모양을 갖는 디스플레이 속성입니다.
- `flex` : 화면의 비율을 기준으로 레이아웃을 구성할 수 있는 최신 레이아웃 속성입니다. 복잡한 레이아웃을 구성할 때 직관적인 속성들로 더 쉽게 구성할 수 있습니다.
- `none` : 논(none) 엘리먼트는 화면에 표시되지 않습니다. 대표적으로 `script` 태그가 있습니다. `visibility` 속성과는 다르게 논 엘리먼트는 화면에 해당 요소에 대한 공간을 차지하지 않습니다.

## 수평 중앙 정렬

특정 엘리먼트를 가로 방향으로 중앙에 놓고 싶다면 아래와 같이 할 수 있습니다.

```html
<div id="wrapper"></div>
```

```css
.wrapper {
  width: 600px;
  margin: 0 auto; /* 위 아래 마진은 0 좌우 마진은 auto */
}
```

다만 이렇게 하면 브라우저의 가로 넓이가 `width` 값 보다 작아졌을 때 가로로 스크롤이 생기는 문제가 생깁니다.

위 문제는 아래와 같이 `max-width`를 설정해주면 해결됩니다.

```html
<div id="wrapper"></div>
```

```css
.wrapper {
  max-width: 600px;
  margin: 0 auto;
}
</style>
```

## 박스 레이아웃

특정 엘리먼트의 넓이를 이용하여 레이아웃을 정하는 경우 아래와 같은 상황에 봉착할 수 있습니다.

```css
.strange {
  width: 500px;
  padding: 20px;
}
```

위 스타일에서 사용자가 기대하는 것은 넓이가 500px인 엘리먼트겠지만 실제로는 패딩 간격이 적용되어 넓이가 540px인 엘리먼트가 표시됩니다.

이와 같이 엘리먼트의 `width`와 함께 `padding`, `border` 등의 속성들이 추가되면 최종 넓이를 계산하기가 어려워집니다. 다행히 이럴 땐 아래와 같이 박스 레이아웃을 쉽게 지정할 수 있습니다.

```css
.strange {
  width: 500px;
  padding: 20px;
  box-sizing: border-box;
}
```

`box-sizing` 속성을 활용하면 패딩, 보더 등의 속성 값을 넓이에 반영하지 않습니다. 따라서, 위 코드의 결과는 넓이가 540px인 엘리먼트가 아니라 넓이가 500px인 엘리먼트입니다. 물론 `padding` 속성의 값은 넓이가 500px인 엘리먼트의 내부에 적용됩니다.

이러한 이유로 CSS 코드를 작성할 때 아래와 같은 코드를 추가하고 시작하는 경우가 많습니다.

```css
* {
  box-sizing: border-box;
}
```

페이지의 모든 엘리먼트에 동일한 박스 레이아웃 컨셉을 적용하면 레이아웃을 잡기가 더 수월해집니다.

## position

포지션(position) 속성은 해당 엘리먼트가 페이지에 어떻게 위치할지를 지정하는 속성입니다. 포지션 속성에는 다음 5가지가 있습니다.

- `static` : 스태틱(static)은 기본 값입니다. 엘리먼트에 따로 값을 지정하지 않는다면 스태틱 값을 갖게 됩니다. 스태틱 값은 위치가 지정되지 않았다는 의미이기도 합니다.
- `relative` : 랠러티브(relative)는 `top`, `right`, `left`, `bottom`과 같은 속성을 주지 않으면 스태틱과 동일하게 위치합니다. 만약 `top: -20px; left: 20px`과 같은 속성을 주면 위로 20px 왼쪽으로 20px 떨어진 곳에 엘리먼트가 위치하게 됩니다. 이때 생성된 간격은 다음 엘리먼트의 위치에 영향을 주지 않습니다.
- `fixed` : 고정(fixed) 엘리먼트는 사용자에게 비춰지는 화면을 기준으로 위치가 지정됩니다. 페이지가 스크롤 되거나 페이지 크기가 축소, 확대되어도 동일한 위치에 남아 있습니다. 만약 아래와 같이 스타일을 작성하면 페이지 우측 하단에 고정된 엘리먼트가 표시됩니다.

```css
.fixed-btn {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 50px;
  height: 50px;
}
```

- `absolute` : 앱솔루트(absolute)는 포지션 값이 설정된 가장 근접한 엘리먼트를 기준으로 `fixed`와 같이 위치가 설정됩니다. 만약 페이지에 포지션 값을 따로 설정한 엘리먼트가 없다면 document body를 기준으로 위치가 지정됩니다. 앱솔루트를 사용할 때는 꼭 근처 엘리먼트에 랠러티브를 지정해주세요.

## float

플롯은 텍스트 영역에 인라인 이미지를 표시할 수 있게 고안된 속성입니다. 다음과 같이 코드를 작성하면 오른쪽으로 이미지가 붕 떠 있는 것처럼 이미지의 위치가 지정됩니다.

```css
img {
  float: right;
  margin: 0 0 1rem 1rem;
}
```

아래와 같은 태그 구조에서 첫 번째 엘리먼트에 `float` 속성을 적용했을 때 후속 엘리먼트에 `float`의 영향을 주지 않는 방법이 있습니다. 바로 `clear` 속성을 사용하는 것입니다.

```html
<div class="main">...</div>
<section class="next-main">...</section>
```

```css
.main {
  float: left;
  width: 400px;
  height: 200px;
  margin: 1rem;
}
```

위 코드는 `section` 영역 안에 `div` 태그가 왼쪽에 띄워져(floating)있는 구조입니다. 이 때 `section` 영역에 `float`을 적용하고 싶지 않다면 아래의 코드를 추가합니다.

```css
.next-main {
  clear: left;
}
```

결과는 왼쪽으로 플로팅되어 있는 `div` 태그 다음 줄에 `section` 태그가 나타납니다.