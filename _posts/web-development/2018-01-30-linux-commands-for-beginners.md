---
layout: article
title: "초심자를 위한 리눅스 기본 명령어"
date: 2018-01-30 16:44:32 +0900
categories: [web-development]
excerpt: "(기본) CLI, NPM과 같은 도구를 사용할 때 알아두면 좋은 리눅스 기본 명령어 안내"
image:
  teaser: posts/web/linux/terminal.jpeg
  credit: wikimedia commons
  creditlink: https://commons.wikimedia.org/wiki/File:Terminalicon2.png
  #url to their site or licensing
locale: "ko_KR"
# 리플 옵션
comments: true
tags:
- 웹 개발 콘솔 명령어
- 콘솔 명령어
- 리눅스 기본 명령어
- 웹 개발에 필요한 콘솔 명령어
- touch 명령어
- ls 명령어
- cd 명령어
- mkdir 명령어
- rm 명령어
- pwd 명령어
- 명령 프롬프트
- do it! Vue.js 입문
- 이지스 퍼블리싱
- vue.js 입문서
- vue.js 시작하기
- vue.js 튜토리얼
- vue.js 장점
- vue.js 강좌
- vue.js 예제
- vue.js 강의
- vuejs란
- vue.js
- vuejs
- vuejs vuex
- vuex 입문
- 시작하기
- 튜토리얼
- vue.js 입문
- vue.js 프론트엔드 개발자
- 패스트캠퍼스
- Vue로 구현하는 PWA 캠프
- 인프런
- 누구나 다루기 쉬운 Vue.js
- 캡틴판교
- 장기효
- captain pangyo
---
{% include toc.html %}

## 들어가며
최신 프런트엔드 프레임워크들로 웹 개발을 할 때 필연적으로 마주치게 되는 도구가 있습니다.
CLI(Command Line Interface)라는 도구인데요. 이 도구를 사용하면서 자연스럽게 윈도우의 명령 프롬프트나
맥의 터미널을 만지게 됩니다. 혹은 텍스트 편집기에서 제공하는 콘솔 창을 이용하여 명령어를 입력하죠.

학교에서 컴퓨터 공학을 전공했거나 리눅스에 대해 어느 정도 공부하신 분들에게는
명령어로 디렉터리를 조작하는 게 어렵지 않지만, 배경 지식이 없는 분들에게는
다소 불편한 방식일 수 있습니다.

이번 글에서는 웹 개발할 때 알아두면 좋은 리눅스 기본 명령어들을 알아보겠습니다.
P.S : 참고로 아래 모든 명령어가 윈도우의 명령 프롬프트에서 동작하지는 않습니다.
윈도우 사용자분들은 텍스트 편집기의 내장 콘솔 창 또는 [cmder](http://cmder.net/)을 이용해보세요.

## 현재 위치 확인하기 - pwd
`pwd`는 현재 폴더 위치를 확인하는 명령어입니다.
<figure>
	<img src="{{ site.url }}/images/posts/web/linux/commands/pwd.gif">
	<figcaption>pwd 명령어로 현재 폴더 위치를 확인</figcaption>
</figure>

## 현재 폴더 내의 파일과 폴더 확인 - ls
`ls`는 현재 폴더 내의 파일과 폴더를 표시합니다.
<figure>
	<img src="{{ site.url }}/images/posts/web/linux/commands/ls.gif">
	<figcaption>ls 명령어로 현재 폴더 아래에 파일이 있는지 확인</figcaption>
</figure>

## 특정 폴더로 이동하기 - cd
`cd`는 특정 폴더의 위치로 이동하는 명령어입니다. `cd 폴더 위치` 형식으로 콘솔 창에 입력하면 해당 폴더 위치로 이동합니다.
<figure>
	<img src="{{ site.url }}/images/posts/web/linux/commands/cd.gif">
	<figcaption>cd 명령어를 이용하여 folder1에서 folder2로 이동</figcaption>
</figure>

## 새로운 파일 생성하기 - touch
`touch`는 새로운 파일을 생성하는 명령어입니다. 마우스 오른쪽 클릭으로 '새로운 파일 생성하기' 대신에 명령어로 파일을 생성할 수 있습니다.
<figure>
	<img src="{{ site.url }}/images/posts/web/linux/commands/touch.gif">
	<figcaption>touch 명령어로 index.html 파일을 새로 생성</figcaption>
</figure>

## 새로운 폴더 생성하기 - mkdir
`mkdir`는 새로운 폴더를 생성하는 명령어입니다. 현재 폴더 내에 새로운 폴더를 생성합니다.
<figure>
	<img src="{{ site.url }}/images/posts/web/linux/commands/mkdir.gif">
	<figcaption>mkdir 명령어로 새 폴더 folder3을 생성</figcaption>
</figure>

## 파일 또는 폴더 지우기 - rm -r
`rm -r`는 대상 폴더 또는 파일을 삭제하는 명령어입니다. `rm`이 기본적으로 파일을 지우는 명령어이고 옵션으로 `-r` 붙이면 폴더도 삭제할 수 있습니다.
<figure>
	<img src="{{ site.url }}/images/posts/web/linux/commands/mkdir.gif">
	<figcaption>rm -r 명령어로 app.js 파일과 folder3 폴더를 삭제</figcaption>
</figure>
