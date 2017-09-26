---
layout: article
title: "Webpack - Common Chunks Plugin"
date: 2017-09-26 14:46:13 +0900
categories: [web-development, webpack]
excerpt: "(입문) Webpack의 CommonChunksPlugin 소개 및 사용법"
image:
  teaser: posts/web/webpack/webpack-teaser.png
  credit: Tim Sebastian #name of the person or site you want to credit
  creditlink: https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31 #url to their site or licensing
locale: "ko_KR"
# 리플 옵션
comments: true
tags:
- webpack
- 웹팩 기본
- 웹팩 기초
- 웹팩 시작하기
- 웹팩 튜토리얼
- 웹팩 한글
- 웹팩 강의
- 웹팩 코드 스플리팅
- 웹팩 설치
- 웹팩 사용법
- 웹팩 설정
- common chunks plugin
- 웹팩 플러그인
- 웹팩 로더
- 웹팩 엔트리
- 웹팩 아웃풋
- 자바스크립트 성능 최적화
- 자바스크립트 성능
- 자바스크립트 성능 향상
- 자바스크립트 성능 개선
- js 성능
- 자바스크립트 튜닝
- javascript 튜닝
- 프론트엔드 개발
- 프론트엔드 개발 웹팩
---
{% include toc.html %}

## Common Chunks Plugin
여러 개의 Entry Point에서 사용하는 공통 모듈을 별도의 파일로 분리하는 플러그인
ex) jquery, lodash 등의 써드파티 라이브러리

분리된 공통 모듈은 초기에 한번만 로딩되고, 추후 사용할 때를 대비해 캐싱을 해놓는다.
이렇게 하면 브라우저가 페이지를 방문할 때마다 거대한 크기의 번들 파일을 불러오기 보다는,
캐싱된 공통 모듈을 빠르게 불러온 후, 기타 로직들만 요청해서 가져오기 때문에 페이지 속도가 빨라진다.

## Vendor Chunk
`vendor`라는 이름의 엔트리 포인트에 라이브러리를 지정하여 앱 로직과 유틸리티성 라이브러리를 분리할 수 있다.

```js
entry: {
  vendor: ['jquery', 'lodash']
},
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor"
  })
]
```

## Manifest File
Manifest 파일을 이용하면 Webpack의 초기화 코드를 별도로 분리할 수 있다.
entry에서 사용하지 않은 이름으로 정의해야 한다. 일반적으로 manifest 사용

```js
new webpack.optimize.CommonsChunkPlugin({
  name: "manifest",
  minChunks: Infinity
})
```

웹팩으로 빌드한 결과물은 `manifest.js`

## minChunks 속성
분할되는 청크의 숫자를 의미하는 속성으로 function 으로 넘길 경우 커스텀 로직 추가가 가능하다.

```js
entry: {
  vendor: ['jquery', 'lodash']
}
new webpack.optimize.CommonsChunkPlugin({
  name: "vendor",
  minChunks: function(module){
    // 위 entry의 vendor에 지정한 라이브러리가 모두 node_modules에 있다는 걸 명시적으로 선언
    return module.context && module.context.indexOf("node_modules") !== -1;
  }
});
```

function 인자는 다음과 같이 2개가 넘어온다.

```js
minChunks: function(module, count){ ... }
```

- **module** : name, names로 지정한 모듈을 의미한다.
- **count** : 해당 모듈이 몇 개의 chunks에서 사용되었는지 숫자로 표기

그리고 module 인자의 주요 속성으로는
- `module.resource` : 웹팩에서 번들링할 때 작업하는 파일의 폴더 이름. ex) `node_modules/jquery`
- `module.context` : 웹팩에서 번들링할 때 작업하는 파일 이름. ex) `node_modules/jquery/jquery.js`

## 기타 활용 방법
여러 개의 모듈을 각 역할별로 분리하여 그룹핑이 가능하다. [Webpack Repo 코드 참고](https://github.com/webpack/webpack/tree/master/examples/multiple-commons-chunks)
