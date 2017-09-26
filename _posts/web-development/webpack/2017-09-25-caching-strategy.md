---
layout: article
title: "Webpack(웹팩) 캐싱 전략"
date: 2017-09-26 16:46:13 +0900
categories: [web-development, webpack]
excerpt: "(입문) Webpack CommonsChunkPlugin을 이용한 캐싱 전략 및 초기화 코드 분리법"
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
- 웹팩 캐싱
- 웹팩 캐싱 전략
- 캐싱
- webpack caching
- 코드 스플리팅
- code splitting
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

## Webpack Caching 전략
웹팩으로 빌드한 결과물이 변경되지 않았으면 계속 캐싱 상태로 남겨서,
별도의 HTTP 요청이 발생하지 않도록 하는 기법에 대해서 정리

## Output 파일 이름
브라우저가 파일의 변경 여부를 추적하는 가장 쉬운 방법은 파일 이름으로 확인하는 것이다.
[output.filename](https://webpack.js.org/configuration/output/#output-filename) 의 여러 옵션 중

- `[hash]` : 특정 빌드에 해당하는 해쉬 값
- `[chunkhash]` : 특정 chunk에 해당하는 해쉬 값

를 사용하는 것이 좋고, 가급적 chunk까지 구분해주는 `[chunkhash]` 를 이용하도록 한다.

```js
output: {
  // filename: 'bundle.js',
  filename: '[name].[chunkhash].js',
  path: path.resolve(__dirname, 'dist')
}
```

여기서 주의할 점은 파일 내용이 변경되지 않더라도 `[chunkhash]` 값이 변경되는데,
그 이유는 웹팩에서 빌드시에 항상 초기화 코드(runtime or manifest)를 포함하기 때문이다.

## 초기화 코드 분리
웹팩으로 빌드를 할 때 마다 발생하는 초기화 코드를 [CommonsChunkPlugin](https://joshua1988.github.io/web-development/webpack/common-chunk-plugin/)로 분리할 수 있다.

```js
entry: {
  app: './app/index.js',
  vendor: ['jquery', 'lodash']
}
plugins: [
  new CleanWebpackPlugin(['dist']),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  })
  // runtime이 vendor보다 순서상 뒤에 오는 것을 주의!
  new webpack.optimize.CommonsChunkPlugin({
    name: 'runtime' // entry에 지정한 이름과 중복되지 않도록 주의
  })
]
```

<p class="notice">주의 : entry 에 사용된 이름과 초기화 코드를 분리하는 플러그인의 이름이 중복되지 않도록 설정</p>

## 참고
- [CommonsChunkPlugin Official Doc](https://webpack.js.org/plugins/commons-chunk-plugin/)
- [CommonsChunkPlugin 사용법](https://joshua1988.github.io/web-development/webpack/common-chunk-plugin/)
