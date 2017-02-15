---
layout: article
title: "Javascript Pattern 요약 - DOM 과 브라우저 패턴"
date: 2016-12-13 20:22:13 +0900
categories: web_dev
image:
  teaser: posts/web/javascript/javascript_pattern.png
  credit: O'Reilly #name of the person or site you want to credit
  creditlink: http://blog.cakemail.com/jquery-spaghetti-tips-and-tricks-for-cleaner-code/
  #url to their site or licensing
locale: "ko"
# 리플 옵션
comments: true
---
{% include toc.html %}

> Javascipt Patterns 책의 8장 "DOM 과 브라우저 패턴" 을 요약하였습니다.

## DOM 접근
- dom 접근은 최소화한다.
- 루프문 내에서 DOM 접근은 피한다.

  {% highlight javascript %}
  // 안티패턴
  for (var i = 0; i < 100; i += 1) {
    document.getElementById("result").innerHTML += i + ", ";
  }

  // 지역 변수를 이용한 개선
  var i, content = "";
  for (var i = 0; i < 100; i += 1) {
    content += i + ", ";
  }
  document.getElementById("result").innerHTML += content;
  {% endhighlight %}

- DOM 참조를 지역변수에 할당하여 사용한다.

  {% highlight javascript %}
  // 안티패턴
  var padding = document.getElementById("result").style.padding,
      margin = document.getElementById("result").style.margin;

  // 개선안
  var style = document.getElementById("result").style.
      padding = style.padding;
      margin = style.margin;

  document.querySelector("ul .selected");
  // 쿼리 셀렉터는 다른 DOM 메서드 선택방식보다 빠르다.
  {% endhighlight %}

- 자주 접근하는 엘리먼트에 id 속성을 추가하는 것도 성능 향상에 도움이 된다. 왜냐면, `document.getElementById("id")` 가 노드를 찾는 가장 빠른 방법

## DOM 조작
- DOM 업데이트는 최소화 하는 것이 좋다.
- 업데이트시에 화면을 repaint 하고, 엘리먼트를 reflow 하는데 비용이 많이 들어가기 떄문
- 서브트리를 추가할 시에는 서브 트리의 구성요소를 모두 생성한 후에 마지막에 한번만 추가해준다.

  {% highlight javascript %}
  // 안티 패턴
  var p, t;
  p = document.createElement("p");
  t = document.createTextNode("first paragraph");
  p.appendChild(t);
  document.body.appendChild(p);

  p = document.createElement("p");
  t = document.createTextNode("second paragraph");
  p.appendChild(t);
  document.body.appendChild(p);

  // 개선
  var p, t, frag;
  frag = document.createDocumentFragment();

  p = document.createElement("p");
  t = document.createTextNode("first paragraph");
  p.appendChild(t);
  frag.appendChild(p);

  p = document.createElement("p");
  t = document.createTextNode("second paragraph");
  p.appendChild(t);
  frag.appendChild(p);

  document.body.appendChild(frag);
  {% endhighlight %}

- 존재하는 트리를 변경하는 경우에는 서브트리의 루트를 복제해서 변경한 뒤 원래의 노드와 바꾼다.

  {% highlight javascript %}
  var oldnode = document.getElementById("result"),
      clone = oldnode.cloneNode(true);

  oldnode.parentNode.replaceChild(clone, oldnode);
  {% endhighlight %}

## 이벤트
- 이벤트 리스너는 아래와 같이 구현할 수 있다.

  {% highlight javascript %}
  var b = document.getElementById("clickme");
  if (document.addEventListener) {
    b.addEventListener("click", myHandler, false);
  } else if (document.attachEvent) {
    b.attachEvent("onclick". myHandler);
  } else {
    b.onclick = myHandler;
  }

  function myHandler(e) {
      var src, parts;

      e = e || window.event;
      src = e.target || e.srcElement;

      if (src.nodeName.toLowerCase() !== "button") {
        return ;
      }

      parts = src.innerHTML.split(": ");
      parts[1] = parseInt(parts[1], 10) + 1;
      src.innerHTML = parts[0] + ": " + parts[1];

      if (typeof e.stopPropagation === "function") {
        e.stopPropagation();
      }
      if (typeof e.cancelBubble !== "undefined") {
        e.cancelBubble = true;
      }

      if (typeof e.preventDefault() === "funtion") {
        e.preventDefault();
      }
      if (typeof e.preventDefault() !== "undefined") {
        e.returnValue = false;
      }

  }
  {% endhighlight %}

- `setTimeOut()` 이나 Web Worker 를 이용하여 쓰레드 같은 기능을 구현할 수 있다.

## XMLHttpRequest
- 자바스크립트에서 HTTP 요청을 생성하는 특별한 객체 (생성자 함수)
- 생성과정은 아래와 같다.

  1. XMLHttpRequest(XHR) 객체를 생성

  {% highlight javascript %}
  var xhr = new XMLHttpRequest();
  {% endhighlight %}

  2. 응답 객체의 상태 변경시 알림을 받기 위한 콜백함수 지정

  {% highlight javascript %}
  xhr.onreadystatechange = handleResponse;
  {% endhighlight %}

  3. 요청을 보낸다.

  {% highlight javascript %}
  xhr.open("GET", "page.html", true); // 마지막 true 값은 요청의 비동기 여부, 가급적 true 로 사용자 경험 올리기
  xhr.send();
  {% endhighlight %}

## JSONP
- JSON with padding
- 브라우저의 동일 도메인 정책의 제약을 받지 않는다.
- JSONP 의 요청 URL 형태

  {% highlight javascript %}
  http://example.org/getdata.php?callback=myHandler
  {% endhighlight %}

- 위에서 getdata.php 가 웹페이지 이거나 스크립트가 될 수 있다.
- getdata.php 파일이 수신되면, myHandler({"hello": "world"}) 같은 콜백함수가 실행된다.

## 웹 페이지 로딩 전략
- script 태그에 들어가는 엘리멘트를 살펴보자.

  - type="text/javascript" : HTML5 에서는 필수 속성이 아니고, 마크업 유효성 검사를 위한 경우가 아니라면 사용하지 않는다.
  - async (defer) : 비동기 스크립트 로딩으로, 스크립트를 받는 동안 다른 다운로드를 방해하지 않는다.
