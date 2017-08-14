---
layout: article
title: "Javascript Pattern 요약 - 디자인 패턴"
date: 2016-12-03 16:47:13 +0900
categories: [web_dev, javascript]
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

> Javascipt Patterns 책의 7장 "디자인 패턴" 을 요약하였습니다.

## 싱글톤 패턴
- 싱글톤 패턴은 특정 클래스의 객체를 한개만 유지하는 패턴이다.
- 자바스크립트에서는 이미 객체 리터럴을 이용한 객체 생성 방법이 싱글톤 패턴과 동일하다.

  ``` javascript
  var obj = {
    myprop : "my value"
  };

  var obj2 = {
    myprop : "my value"
  };
  obj === obj2; // false
  obj == obj2;  // false
  ```

## 팩토리 패턴
- 비슷한 객체를 공장에서 찍어내듯이 반복적으로 생성할 수 있게 하는 패턴
- 컴파일 시점에 구체적인 타입(클래스)을 몰라도 객체 생성이 가능하다
- 팩토리 패턴의 가장 흔한 사례는 Object() 를 이용한 객체 생성시, 주어지는 값의 타입에 따라 String, Boolean, Number 등으로 객체가 생성되는 것이다.

  ``` javascript
  // 팩토리 패턴 구현 예제
  function CarMaker() {}
  CarMaker.prototype.drive = function () {
    return "Vroom, I have " + this.doors + "doors";
  };
  CarMaker.factory = function (type) {
    var constr = type,
        newcar;

    // 생성자 존재하지 않으면 에러발생
    if (typeof CarMaker[constr] !== "function") {
      throw {
        name: "Error",
        message: constr + "doesn't exist"
      };
    }

    // 생성자 존재 확인 후 부모 상속
    if (typeof CarMaker[constr].prototype.drive !== "function") {
      CarMaker[constr].prototype = new CarMaker();
    }

    newcar = new CarMaker[constr]();

    return newcar;
  };

  CarMaker.Compact = function () {
    this.doors = 4;
  };
  CarMaker.Convertible = function () {
    this.doors = 2;
  };
  CarMaker.SUV = function () {
    this.doors = 24;
  };
  // --

  // 위 패턴을 이용한 결과
  var corolla = CarMaker.factory("Compact");
  var solstice = CarMaker.factory("Convertible");
  corolla.drive();  // "Vroom, I have 4 doors"
  solstice.drive(); // "Vroom, I have 2 doors"
  ```

## Iterator 패턴
- 객체의 내부구조가 복잡하더라도 개별 속성에 쉽게 접근하기 위한 패턴

  ``` javascript
  var element;
  while (element = agg.next()) {
    // ...
    console.log(element);
  }
  ```

- 위의 agg 객체 구현방법은 아래와 같다.

  ``` javascript
  var agg = (function () {
    var index = 0,
        data = [1, 2, 3, 4, 5],
        length = data.length;

    return {
      next : function () {
        var element;
        if (!this.hasNext()) {
          return null;
        }
        element = data[index];
        index += 1;
        return element;
      },
      hasNext : function () {
        return index < length;
      },
      rewind: function () {
        index = 0;
      },
      current: function () {
        return data[index];
      }
    };
  }());
  ```

## Decorator 패턴
- 런타임시 객체에 동적으로 부가기능을 추가할 수 있는 패턴
- Decorator 패턴의 예제는 아래와 같다.

  ``` javascript
  var sale = new Sale(100);
  sale = sale.decorate("fedtax");
  sale = sale.decorate("quebec");
  sale = sale.decorate("money");
  sale.getPrice(); // $112.88
  ```

- 구현 예제는 다음과 같다.

  ``` javascript
  function Sale(price) {
    this.price = price || 100;
  }
  Sale.prototype.getPrice = function () {
    return this.price;
  };

  Sale.decorators = {};
  Sale.decorators.fedtax = {
    getPrice: function () {
      var price = this.uber.getPrice(); // uber 는 상속된 객체
      price += price * 5 / 100; // 5% 세율 추가

      return price;
    }
  };
  Sale.decorators.money = {
    getPrice: function () {
      return "$" + this.uber.getPrice().toFixed(2);
    }
  };
  ```

- 위 decorators() 를 아래와 같이 구현할 수 있다.

  ``` javascript
  Sale.prototype.decorate = function (decorators) {
    var F = function () {},
        overrides = this.constructor.decorators[decorator],
        i, newobj;
    F.prototype = this;
    newobj = new F();
    newobj.uber = F.prototype;
    for (i in overrides) {
      if (overrides.hasOwnProperty(i)) {
        newobj[i] = overrides[i];
      }
    }
    return neweobj;
  };
  ```

## 프록시 패턴
- Lazy Initialization (게으른 초기화) 로 어플리케이션의 부하를 줄여준다.

  ``` javascript
  var $ = function (id) {
    return document.getElementById(id);
  };

  $("vids").onclikc = function (e) {
    var src, id;

    e = e || window.event;
    src = e.target || e.srcElement;

    if (src.nodeName !== "A") {
      return;
    }

    if (type of e.preventDefault() === "function") {
      e.preventDefault();
    }

    e.returnValue = false;
    id = src.href.split('--')[1];

    if (src.className === "play") {
      src.parentNode.innerHTMl = videos.getPlayer(id);
      return;
    }

    src.parentNode.id = "v" + id;
    videos.getInfo(id);
  };
  ```

- 위와 같이 클릭 이벤트에 대해서 이벤트 핸들링이 가능하다.
- 아래는 Proxy 를 이용하여 HTTP 라운드 트립을 줄일 수 있는 코드다.

  ``` javascript
  var proxy = {
      ids : [],
      delay: 50,
      timeout: null,
      callback: null,
      context: null,

      makeRequest: function (id, callback, context) {
        this.ids.push(id);

        this.callback = callback;
        this.context = context;

        if (!this.timeout) {
          this.timeout = setTimeout(function () {
            proxy.flush();
          }, this.delay);
        }
      },
      flush: function () {
        http.makeRequest(this.ids, "proxy.handler:");
        this.timeout = null;
        this.ids = [];
      },
      handler: function (data) {
        var i, max;
        if (parseInt(data.query.count, 10) === 1) {
          proxy.callback.call(proxy.context, data.query.results.Video);
          return;
        }

        for (i = 0, max = data.query.results.Video.length;
              i < max; i += 1) {
          proxy.callback.call(proxy.context, data.query.results.Video[i]);
        }
      }
  };
  ```

- HTTP 요청이 50 밀리 세컨 이내로 일어난다면, 각각 보낼 것이 아니라 setTimeout() 을 이용하여 요청을 잠시 보류한 후 한번에 보낸다.
- 그렇게 되면, HTTP 의 라운드 트립 횟수가 줄어들기 때문에 전체적으로 성능이 향상될 수 있다.

## Mediator 패턴
- 객체 간의 영향도 (결합도) 가 높은 상태에서는 어플리케이션의 리팩토링이 예기치 않은 결과를 나을 수 있다.
- 따라서, 결합도를 낮추기 위해 객체의 상태가 변경되면 Mediator 에게 먼저 전달하고 이를 Mediator 가 다른 객체에 전달하는 방식의 코딩이 가능하다.

## Observer 패턴
- 클라이언트 측 자바스크립트 프로그래밍에서 널리 사용되는 패턴이다.
- subscriber / publisher 패턴이라고도 한다.
- 예) mouseover, keypress 와 같은 브라우저 이벤트
- 이 패턴의 주요 목적은 객체간의 결합도를 낮추는 것이다.
