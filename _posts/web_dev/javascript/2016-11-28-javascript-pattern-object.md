---
layout: article
title: "Javascript Pattern 요약 - 객체 생성 패턴"
date: 2016-11-28 22:16:13 +0900
categories: web_dev
image:
  teaser: posts/web/javascript/javascript_pattern.png
  credit: O'Reilly #name of the person or site you want to credit
  creditlink: http://blog.cakemail.com/jquery-spaghetti-tips-and-tricks-for-cleaner-code/
  #url to their site or licensing
locale: "ko"
# 리플 옵션
comments: true
tags:
- 자바스크립트 패턴
- 자바스크립트 디자인 패턴
- 자바스크립트 코딩 기법
- 자바스크립트 패턴 책
- 자바스크립트
- 프론트엔드 개발
- javascript pattern
- 자바스크립트 성능
- 자바스크립트 개발
- 자바스크립트 중급
- 자바스크립트 고급
---
{% include toc.html %}

> Javascipt Patterns 책의 5장 "객체 생성 패턴" 을 요약하였습니다.

## 네임스페이스 패턴
- 쉽게 구현할 수 있는 패턴이며 전역변수의 개수를 줄이고, 변수명이 불필요하게 길어짐을 방지한다.
- 전역 네임스페이스 객체는 흔히 대문자로 선언한다.

  ``` javascript
  // 안티패턴 : 수정 전
  // 전역변수 5개
  function Parent() {
  }
  function Child() {
  }
  var some_var = 1;
  var module1 = {};
  var module2 = {};

  // 수정 후
  var MYAPP = {};
  MYAPP.Parent = function() {

  };
  MYAPP.Child = function() {

  };
  MYAPP.some_var = 1;

  MYAPP.modules = {};
  MYAPP.modules.module1.data = {a:1, b:2};
  MYAPP.modules.module2 = {};
  ```

- 이 패턴의 단점은 다음과 같다.

  1. 모든 변수와 함수에 접두어를 붙이므로, 전체 코드량이 길어져 다운로드 파일의 크기가 증가
  2. 전역 인스턴스가 1개이기 떄문에 부분이 수정되면 다른 전역 인스턴스도 모두 수정됨
  3. 이름이 길어지므로, 프로퍼티 판별을 위한 검색작업이 오래걸린다. (샌드박스 패턴으로 해결)

#### 범용 네임스페이스 함수
- 프로그램 크기가 커져 복잡해지면, 네임스페이스 사용에 있어서 다음과 같이 점검이 필요하다.

  ``` javascript
  var MYAPP = {};
  // 1. 기본
  if (typeof MYAPP === "undefined") {
    var MYAPP = {};
  }
  // 2. *추천*
  var MYAPP = MYAPP || {};
  ```

- 위의 코드를 객체 생성시 마다 추가하는 것보다는 아래처럼 함수로 별도 생성하는 것이 효과적이다.

  ``` javascript
  var MYAPP = MYAPP || {};

  MYAPP.namespace = function(ns_string) {
    var parts  = ns_string.split('.'),
        parent = MYAPP,
        i;

    if (parts[0] === "MYAPP") {
      parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i += 1) {
      if (typeof parent[parts[i]] === "undefined") {
        parent[parts[i]] = {};
      }

      parent = parent[parts[i]];
    }

    return parent;
  }
  ```

- 위 코드를 아래처럼 사용할 수 있다.

  ``` javascript
  MYAPP.namespace("MYAPP.modules.module2");
  // 위 코드는 아래와 같다.
  var MYAPP = {
    module : {
      module2 : {}
    }
  };

  var module2 = MYAPP.namespace("MYAPP.modules.module2");
  module2 === MYAPP.modules.module2; // true
  ```

## 의존 관계 선언
- *함수*나 *모듈*내의 최상단에 의존 관계가 있는 모듈을 선언하는 것이 좋다.

  ``` javascript
  var myFunction = function () {
    var event = YAHOO.util.Event,
        dom   = YAHOO.util.Dom;
  };
  ```

- 위 패턴의 장점은 다음과 같다.

  1. 의존 관계가 명시적이기 때문에, 페이지 내에 반드시 포함시켜야 하는 스크립트 파일을 알기 쉽다.
  2. 지역변수 값 탐색은 yahoo.util.dom 과 같은 중첩 프로퍼티 보다 훨씬 빠르다.
  3. **고급 Compressor 는 전역변수명 변경은 위험하기 때문에 축약하지 않고, 위의 event 같은 지역변수는 a로 축약한다.**

- 위 3번에서 설명한 코드 압축 예제를 보자면

  ```javascript
  // 1.
  function test1() {
    alert(MYAPP.modules.m1);
    alert(MYAPP.modules.m1);
  }
  // 위 코드 압축 결과
  // alert(MYAPP.modules.m1);alert(MYAPP.modules.m2);

  // 2.
  function test2() {
    var modules = MYAPP.modules;
    alert(modules.m1);
    alert(modules.m2);
  }
  // 위 코드 압축 결과 :
  // var a=MYAPP.modules;alert(a.m1);alert(a.m2);
  ```

## 비공개 프로퍼티와 메서드
- 클로저를 이용한 비공개 멤버는 다음과 같이 구현한다.

  ``` javascript
  // 생성자를 이용하는 경우
  function Gadget() {
      var name = "iPhone";
      this.getName = function() {
        return name;
      };
  }
  var toy = new Gadget();
  console.log(toy.name); // undefined
  console.log(toy.getName()); // "iPhone"

  // 객체 리터럴을 이용하는 경우 1
  var myobj;
  (function () {
    var name = "Android";

    myobj = {
      getName: function() {
        return name;
      }
    };
  }());

  myobj.getName(); // "Android"

  // 객체 리터럴을 이용하는 경우 2
  var myobj = (function () {
    var name = "Android";
    return {
      getName: function() {
        return name;
      }
    };
  }());

  myobj.getName(); // "Android"
  ```

- 비공개 멤버 구현방법 : 함수 내에서 지역변수로 선언한 프로퍼티를 함수로 감싼다.
- 생성자를 이용하여 비공개 멤버를 만드는 경우에는 생성자로 새로운 객체를 만들 때 마다 비공개 멤버가 재 생성되는 단점이 있다.
- 위와 같은 단점은 프로토타입으로 보완이 가능하다.

  ``` javascript
  function Gadget() {
    var name = "Android";
    this.getName = function () {
      return name;
    };
  }

  Gadget.prototype = (function () {
    var browser = "Mobile";
    return {
      getBrowser : function() {
        return browser;
      }
    };
  }());

  var toy = new Gadget();
  console.log(toy.getName()); // 객체 인스턴스의 비공개 멤버
  console.log(toy.getBrowser()); // 프로토타입의 비공개 멤버
  ```

## 모듈패턴
- 모듈 패턴을 이용하면 개별적인 코드를 느슨하게 결합이 가능하다.
- 많은 양의 코드를 구조화하고 정리하는 데 도움이 된다.
- 모듈 패턴은 아래 패턴들을 조합한 것이다.

  - 네임스페이스 패턴
  - 즉시 실행 함수
  - 비공개 멤버 & 특권 멤버
  - 의존 관계 선언

#### 모듈 패턴 적용을 위한 절차
- 1단계 : 네임스페이스 설정

  ``` javascript
  MYAPP.namespace("MYAPP.utilities.array");
  ```

- 2단계 : 모듈 정의

  ``` javascript
  MYAPP.utilities.array = (function () {
    return {
      inArray: function (needle, haystack) {
        // ...
      },
      isArray: function (e) {
        // ...
      }
    };
  }());
  ```

- 비공개 프로퍼티 및 메서드를 추가한 모듈의 모습

  ``` javascript
  MYAPP.utilities.array = (function () {

    // 의존 관계
    var uobj  = MYAPP.utilities.object,
        ulang = MYAPP.utilities.lang,

    // 비공개 프로퍼티
        array_string = "[object Array]",
        ops = Object.prototype.toString;

    // 공개 API
    return {
      inArray: function (needle, haystack) {
        // ...
      },
      isArray: function (a) {
        return ops.call(a) === array_string;
      }
    };
  }());
  ```

- 위의 모듈 내용을 모두 비공개로 바꾼 후 다음과 같이 몇개 API 만 공개로 변환이 가능하다.

  ``` javascript
  MYAPP.utilities.array = (function () {

    // 의존 관계
    var uobj  = MYAPP.utilities.object,
        ulang = MYAPP.utilities.lang,

    // 비공개 프로퍼티
        array_string = "[object Array]",
        ops = Object.prototype.toString,

    // 비공개 API
        inArray = function (needle, haystack) {
          // ...
        },
        isArray = function (a) {
          return ops.call(a) === array_string;
        };

    // 공개 API
    return {
      isArray : isArray
    };
  }());
  ```

## 샌드박스 패턴
- 샌드박스 패턴은 모듈 간의 서로 영향을 미치지 않고 동작할 수 있는 환경을 제공한다.
