---
layout: article
title: "웹 개발자를 위한 웹 브라우저 동작 원리"
date: 2017-02-08 23:50:32 +0900
categories: web_dev
image:
  teaser: posts/web/browser.png
  credit: HTML5 Rocks #name of the person or site you want to credit
  creditlink: https://www.html5rocks.com/
  #url to their site or licensing
locale: "ko"
# 리플 옵션
comments: true
tags: web browser
---
{% include toc.html %}

## 브라우저의 주요 구성 요소
1. UI - 사용자에게 비춰지는 화면 (URL, 다음 / 이전 버튼, 등)
2. 브라우저 엔진 - UI 와 렌더링 엔진 동작을 제어
3. 렌더링 엔진 - HTML, CSS 를 파싱하여 화면에 표시
4. 통신 - HTTP 요청과 같은 네트워크 호출
5. 자바스크립트 해석기 - 자바스크립트 코드 실행 및 해석
6. UI 백엔드 - OS UI 체계를 따름 (플랫폼에서 명시하지 않음)
7. 자료 저장소 - 웹, 로컬 스토리지, 쿠키 와 같은 내용을 저장

## 렌더링 엔진
- Webkit : Safari, Chrome
- Gecko : Firefox
- 렌더링 엔진 동작방식 :
  1. HTML 문서를 파싱 후 태그를 DOM 으로 변환
  2. CSS 같은 스타일 문서를 파싱 후 DOM 에 추가하여 **렌더트리 형성**

## 파싱
- 요청한 문서의 내용을 브라우저가 이해할 수 있는 구조로 변환
- 파싱트리 라고 하는 트리구조로 형성


> 추가 내용 업데이트 예정 중입니다.
