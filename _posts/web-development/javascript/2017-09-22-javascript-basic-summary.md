---
layout: article
title: "간단히 훑어보는 자바스크립트 기본기 다지기"
date: 2017-09-22 16:54:13 +0900
categories: [web-development, javascript]
excerpt: "(기본) 자바스크립트 입문자부터 숙련자까지 간단히 보기 좋은 요약본"
image:
  teaser: posts/web/javascript/js-basic-summary/js-keep-calm.jpeg
  credit: Raymond Camden #name of the person or site you want to credit
  creditlink: https://www.keepcalm-o-matic.co.uk/p/keep-calm-and-learn-javascript/
  #url to their site or licensing
locale: "ko"
# 리플 옵션
comments: true
tags:
- 자바스크립트
- 자바스크립트 클로져
- 클로져
- 내부함수
- 자바스크립트 arguments
- 실행 컨텍스트
- 자바스크립트 실행컨텍스트
- 자바스크립트 스코프체인
- 자바스크립트 프로토타입
- 프로토타입 체인
- 자바스크립트 연산자
- 자바스크립트 호이스팅
- 호이스팅
- 자바스크립트 입문
- 자바스크립트 초급
- 자바스크립트 시작하기
- 자바스크립트 코딩 면접
- javascript 코딩 면접
- 코딩면접 질문
- 프론트엔드 면접
- 프론트엔드 개발
- 프론트엔드 개발자
- 프론트엔드 개발자 자바스크립트
- 자바스크립트 면접
- 자바스크립트 개발
- 자바스크립트 중급
- 자바스크립트 면접질문
---

{% include toc.html %}

## 자바스크립트 타입
기본 타입
1. Number - 실수, 부동소수점 64비트(double)
2. String - 문자열
3. Boolean - True, False
4. undefined - 변수에 값이 할당되지 않을 때 인터프리터가 undefined 로 할당. 값이자 타입
5. null - 개발자가 의도적으로 할당하는 값. typeof 값이 Object 로 반환. 따라서 === 로 확인

```js
var nullCheck = null;
console.log(typeof nullCheck === null); // false
console.log(nullCheck === null); // true
```

참조 타입(객체 타입)
1. Object
2. Array - 배열도 객체로 취급
3. Function - 함수도 객체로 취급

## NaN (Not a Number)
수치 연산을 해서 정상적인 값을 얻지 못할 때 발생하는 에러

```js
console.log(1 - 'hello'); // NaN

var foo = {
  name: 'foo',
  major: 'cs'
};
foo['full-name'] = 'ffoo';
console.log(foo['full-name']); // 'ffoo'
console.log(foo.full-name); // NaN, 프로퍼티명이 연산자를 포함할 경우
```

## delete 연산자
객체 프로퍼티를 삭제하는 기능. 객체 삭제는 불가능

```js
// 1. 객체 프로퍼티를 삭제
var foo = {
  name: 'foo',
  nickname: 'pangyo'
};

delete foo.nickname;
console.log(foo.nickname);
console.log(foo); // {name: "foo"}
```

```js
// 2. delete 로 객체를 삭제할 경우 (변화 없음)
var foo = {
  name: 'foo',
  nickname: 'pangyo'
};

delete foo;
console.log(foo); // {name: "foo", nickname: "pangyo"}
```

## 객체의 모든 연산은 참조 값을 처리
값 비교시에 사용하는 == 를 적용한 예제를 보자.

```js
var a = 10;
var b = 10;

var objA = {
  value: 100
};
var objB = {
  value: 100
};
var objC = objB;

console.log(a == b); // true
console.log(objA == objB); // false
console.log(objB == objC); // true
```

## Array 랑 Object 구분 방법

```js
var arr = [];
var obj = {};

arr.constructor.name; // "Array"
obj.constructor.name; // "Object"
```

## delete & splice 연산자 in 배열
배열에서 delete 를 사용하면 요소의 값만 undefined 로 변경하고, 해당 요소 index 를 지우지는 않는다.

```js
var arr = [1, 2, 3];
delete arr[1];
console.log(arr); // [1, undefined × 1, 3]
```

반대로 splice 는 해당 요소 전체를 아예 잘라내서 없앤다.

```js
var arr = [1, 2, 3];
arr.splice(1, 1);
console.log(arr); // [1, 3]
```

## typeof 연산자
각 데이터 타입에 대한 typeof 수행결과는 다음과 같다.

```js
var num = 10;
var str = "a";
var boolean = true;
var obj = {};
var undefined;
var nullValue = null;
var arr = [];
function func() {};

console.log(typeof num); // number
console.log(typeof str); // string
console.log(typeof boolean); // boolean
console.log(typeof obj); // object
console.log(typeof undefined); // undefined
console.log(typeof nullValue); // object (null 은 object)
console.log(typeof arr); // object (배열도 object)
console.log(typeof func); // function
```

## == 연산자와 === 연산자
== 와 === 의 가장 큰 차이점은 값 뿐만 아니라 타입까지 체크하느냐이다.
또한 == 는 수행시에 타입이 다를 경우 타입을 일치시켜 값을 비교하는 특징이 있다.

```js
console.log(1 == '1'); // true
console.log(1 === '1'); // false
```

## 함수 호이스팅

```js
add(2, 3); // add is not a function
var add = function (a, b) {
  return a + b;
};
add(4, 5);
```

위 코드의 실행 결과는 **add is not a function** 이다.
위 코드를 실행할 때 자바스크립트 엔진 관점에서 호이스팅을 적용하여 코드 순서를 변경해보면 아래의 결과가 된다.

```js
var add;
add(2, 3);
add = function (a, b) {
  return a + b;
};
add(4, 5);
```

## 함수의 length 속성

```js
function func1(a) { return a; }
function func2(a, b) { return a + b; }
function func3(a, b, c) { return a + b + c; }

console.log('func1 length : ' + func1.length); // func1 length : 1
console.log('func2 length : ' + func2.length); // func2 length : 2
console.log('func3 length : ' + func3.length); // func3 length : 3
```

## 내부 함수
함수의 내부에 정의한 함수

```js
function parent() {
  var a = 10;
  var b = 20;

  function child() {
    var b = 30;
    console.log(a);
    console.log(b);
  }
  child();
}
parent(); // 10, 30
child(); // child is not defined
```

## 생성자 함수
일반 객체 선언과 다르게 여러 개의 객체를 찍어낼 수 있는 함수.
함수명 맨 앞 글자는 대문자, 호출 시에 new 사용.

```js
function Developer(name, stack, city) {
  this.name = name;
  this.stack = stack;
  this.city = city;
}
var dev = new Developer('captain', 'web', 'pangyo');
var devops = new Developer('hulk', 'devops', 'seoul');
console.log(dev); // Developer {name: "captain", stack: "web", city: "pangyo"}
console.log(devops); // Developer {name: "hulk", stack: "devops", city: "seoul"}
```

위에서 생성한 dev 객체는 아래와 같이 constructor(생성자)가 Developer이다.

![생성자 함수 확인]({{ site.url }}/images/posts/web/javascript/js-basic-summary/constructor-dev.png)

## instaceof 를 활용한 생성자 함수 구분법
자바스크립트는 생성자 함수 형식이 별도로 없기에 기존 함수에 new만 붙여주면 생성자 함수 생성이 가능하다.
따라서, 생성자 함수가 아닌데 new 를 붙이는 경우를 대비해서 아래와 같은 기법을 적용할 수 있다.
**대부분의 오픈소스 라이브러리에서 사용하는 패턴**

```js
function Func(arg) {
  // instanceof 로 생성자 함수임을 확인
  if (!(this instanceof arguments.callee)) // 'this instanceof 함수명' 도 가능
    return new Func(arg);
  this.value = arg || 0;
}

var a = new Func(100);
var b = Func(200);
console.log(a.value);
console.log(b.value);
```

## prototype & constructor

```js
function func() {
  return true;
}
console.log(func.prototype);
console.log(func.prototype.constructor);
```

## 프로토타입 체이닝
해당 함수에 존재하지 않는 속성, 메서드를 부모 객체(프로토타입 객체)를 찾음

```js
var obj = {
  name: 'captain',
  printName: function () {
    console.log(this.name);
  }
};
obj.printName(); // 'captain'
obj.hasOwnProperty('name'); // true
obj.hasOwnProperty('city'); // false
```

obj에서 사용한 printName() 메서드는 obj에 선언되었기 때문에 사용이 가능하다.
하지만 hasOwnProperty() 메서드는 선언되지도 않았는데 사용할 수 있다.
왜냐면 obj의 프로토타입 객체가 Object이고, Object에 내장된 메서드가 hasOwnProperty() 이기 때문에,
obj에서 프로토타입 객체의 hasOwnProperty() 를 호출한다.

![prototype-chaining]({{ site.url }}/images/posts/web/javascript/js-basic-summary/prototype-chaining.png)

참고로, 자바스크립트 모든 객체의 최상위 부모 객체는 Object 객체다.

## Object, String, Number 프로토타입 객체 메서드 재정의
자바스크립트에서 기본으로 제공하는 Object, String, Number 등의 표준 객체에
사용자가 원하는 기능을 재정의하여 사용할 수 있다.

```js
String.prototype.printText = function (text) {
  console.log("Print this text out " + text);
};
var name = "captain";
name.printText('pangyo'); // 'Print this text out pangyo'
```

## 즉시 실행 함수
함수를 정의함과 동시에 바로 실행하는 함수. 함수를 다시 호출할 수 없다는 특징이 있다.
따라서, 최초 한 번의 실행만 요구되는 초기화 코드에 적합하다.
jQuery 와 같은 오픈소스 라이브러리들의 구조.

```js
(function (name) {
  console.log('This is the immediate function : ' + name);
})('foo');
```

## 클로져
실행이 끝난 함수의 스코프를 참조할 수 있는 함수 **(정의 더 가다듬을 필요 있음)**

```js
function parent() {
  var a = 'Parent is done';
  function child() {
    console.log(a);
  }
  return child;
}
var closure = parent();
closure();
```

위 내부함수의 정의대로라면 parent 의 내부함수인 child() 는 외부에서 접근이 불가능하다.
하지만 return 값에 child 를 넘김으로써 외부에서도 child 를 호출할 수 있게 된다.
따라서, child() 에서 parent 의 값을 참고하고 있다면, child() 를 밖에서 호출함으로써
parent() 의 변수에 접근이 가능하게 된다. 이것이 **클로져**

## map() 구현

```js
// definition
Array.prototype.myMap = function(callback) {
    arr = [];
    for (var i = 0; i < this.length; i++)
        arr.push(callback(this[i], i, this));
    return arr;
};

//tests
var arrs = ['dic tanin', 'boo radley', 'hans gruber'];
var numbers2 = [1, 4, 9];

var goodT = arrs.myMap(function(n) {
    return n;
});

var squareRoot = numbers2.myMap(function(num) {
    return Math.sqrt(num);
});

console.log(goodT); // [ 'dic tanin', 'boo radley', 'hans gruber' ]
console.log(squareRoot); // [ 1, 2, 3 ]
```

## 실행 컨텍스트를 이해하기 위한 자바스크립트 동작과정
1. 변수, 함수 선언, arguments 을 가진 활성 객체(Variable Object) 생성
2. Scope Chain 생성 및 초기화
  1. 변수 초기화 : 변수 값에 undefined 할당
3. this 바인딩
4. 코드 해석 및 실행
  1. 변수 값 할당 : 변수에 실제 값 할당

## 변수 초기화 과정
1. 변수 선언 - 변수를 활성 객체에 할당
2. 변수 초기화 - 변수 값에 undefined 할당
3. 변수 실제 값 할당 - 변수에 실제 값을 할당

## 실행 컨텍스트를 이해하기 위한 문제
비동기 실행 방식인 setTimeout 를 이용한 예제이다.

```js
console.log("1");
function exec() {
  setTimeout(function() {
    console.log("2");
  }, 3000);
  setTimeout(function() {
    console.log("3");
  }, 0);
  console.log("4");
  setTimeout(function() {
    console.log(5);
  }, 1000);
}
console.log(exec());
// 위 코드 실행 결과 : 1, 4, 3, 5, 2
```

setTimeout 이 지연시간이 0 이라고 할지라도 실행 컨텍스트가 다르기 때문에 1,4 가 먼저 출력된다.

이번엔 for 문과 setTimeout 이다.

```js
var i;
for (i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // 5, 5, 5, 5, 5
  }, 1000);
}
```

위 코드를 실행시켰을 때, 이 코드가 실행되는 메인 컨텍스트와 setTimeout 이 실행되는 컨텍스트가 다르기 때문에
일반 프로그래밍 지식 관점에서는 0,1,2,3,4 이라고 추측하겠지만, 실제로는 for 문의 실행이 모두 끝난 후에
setTimeout 의 콜백 함수가 실행되기 때문에 숫자 5가 다섯 번 출력된다.

## arguments 객체
함수 호출시에 넘겨진 실제 인자 값을 가진 배열

```js
// 아래 함수 정의에 포함된 인자 값은 2개
function add(a, b) {
  console.dir(arguments);
}
console.log(add(1)); // Arguments(1), 0: 1
console.log(add(1, 2)); // Arguments(2), 0: 1, 1: 2
console.log(add(1, 2, 3)); // Arguments(3), 0: 1, 1: 2, 2: 3
```

arguments 의 활용 : 메서드에 넘겨 받을 인자의 개수를 모를 때 유용

```js
function sum() {
  for (var i = 0, result = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}
console.log(sum(1,2,3)); // 6
console.log(sum(1,2,3,4,5,6)); // 21
```

**참고: arguments는 length 속성과 `arguments[i]`와 같은 index를 지니지만 배열은 아니다. 이러한 객체를 배열과 비슷한 객체(array-like object)라고 한다.**

## apply() & call()
위에서 배운 arguments에 apply(), call()을 이용하여 실제 배열 메서드를 사용할 수 있다.

```js
// apply() 적용 전
function sum() {
  console.log("arguments length : " + arguments.length);
  arguments.push(100); // Uncaught TypeError: arguments.push is not a function
  console.dir(arguments); // Arguments(3)
}
sum(1,2,3);

// apply() 적용 후
function sum() {
  var args1 = Array.apply(arguments);
  args1.push(100); // 0: 100
  console.dir(args1); // Array(1)

  var args2 = Array.prototype.slice.apply(arguments);
  args2.push(100); // 3: 100
  console.dir(args2); // Array(4)
}
sum(1,2,3);
```

```text
함수명.apply(대상, 인자 배열);
```

apply(), call() 메서드는 결국 .apply()를 호출하는 함수를 실행하는 것이다.
그리고 호출하는 함수의 인자 값에 apply() 로 넘긴 인자 배열을 넣어서
마지막 실행 결과만 대상에 연결한다라고 보면 되겠다.

```js
function user(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
}
user.apply(window, ['pangyo', 'captain']); // user.call(window, 'John', 'Doe'); 와 같음

console.log(window.firstName); // 'pangyo'
console.log(window.lastName); // 'captain'
```

## this 바인딩
일반적으로 함수 내부에서 this를 사용하면 전역 스코프(window)에 접근한다.

```js
// 함수 선언식
var text = 'global';
function binding() {
  var text = 'local';
  console.log(this.text); // 'global'
  console.log(this); // Window {stop: ƒ, open: ƒ, alert: ƒ, confirm: ƒ, prompt: ƒ, …}
}
binding();

// 함수 표현식
var text = 'global';
var binding = function() {
  var text = 'local';
  console.log(this.text); // 'global'
  console.log(this); // Window {stop: ƒ, open: ƒ, alert: ƒ, confirm: ƒ, prompt: ƒ, …}
}
binding();
```

객체의 속성에서 함수를 선언하고 this를 사용하면 해당 객체를 접근한다.

```js
var text = 'global';
var binding = {
  text: 'local',
  printText: function () {
    console.log(this.text); // 'local'
    console.log(this); // {text: "local", printText: ƒ}
  }
};
binding.printText();
```

함수의 내부함수에서 this를 사용하면 전역 객체(window)에 접근한다.

```js
var text = 'global';
var binding = {
  text: 'local',
  printText: function () {
    console.log(this.text); // local
    var innerFunc = function () {
      console.log(this.text); // global
    };
    innerFunc();
  }
};
binding.printText();
```


## 스코프 체인을 이해하기 위한 예제
아래는 전역 스코프와 함수 스코프를 구분하면 된다.

```js
// ex.1
var a = 1;
var b = 2;
function func() {
  var a = 10;
  var b = 20;
  console.log(a); // 10
  console.log(b); // 20
}
func();
console.log(a); // 1
console.log(b); // 2
```

아래는 내부함수 innerfunc 에서 외부함수인 func 의 변수에 접근하고 있다.

```js
// ex.2
var a = 1;
function func() {
  var a = 2;
  function innerfunc() {
    return a;
  }
  console.log(innerfunc());
}
func();
```

아래 예제는 func1 의 실행 컨텍스트가 전역이라는 것에 주목한다.

```js
// ex.3
var a = 1;
function func1() {
  return a;
}
function func2(func1) {
  var a = 2;
  console.log(func1());
}
func2(func1);
```

## 클로져 정의 및 코드 예시
- 외부 함수의 실행이 종료되어 컨텍스트가 반환되더라도, 내부 함수로 종료된 외부 함수의 스코프(변수)에 접근이 가능한 기법:스코프 체이닝
- 이미 생명주기가 끝난 외부 함수의 변수를 참조하는 함수

```js
function func() {
  var a = 1;
  var cl = function () {
    console.log(a);
  };
  return cl
}
var result = func();
console.dir(result); // [[Scope]] 에서 Closure 함수임을 확인 가능
result();
```

![closure]({{ site.url }}/images/posts/web/javascript/js-basic-summary/closure.png)

일정한 형식을 가진 템플릿에서 입력된 값에 따라 다른 결과물을 내는 코드

```js
var str = [
  'hello ',
  '',
  ' world'
];

function completeSentence(name) {
  str[1] = name;
  return str.join('');
}
completeSentence('js');
```

위 코드에 클로져를 적용하면

```js
function completeSentence(name) {
  var str = [
    'hello ',
    '',
    ' world'
  ];
  return function () {
    str[1] = name;
    return str.join('');
  };
}
var result = completeSentence('js');
result();
```

위 함수를 좀 더 기능 단위로 분할해보면

```js
function completeSentence(name) {
  var str = [
    'hello ',
    '',
    ' world'
  ];
  // 입력된 문자열로 문장을 완성하는 기능
  var complete = function () {
    str[1] = name;
    return str.join('');
  };
  // 문장 완성 기능을 클로져로 빼는 역할
  var closure = function () {
    return complete();
  };
  return closure;
}
var result = completeSentence('js');
result();
```

## 클로져 활용
클로져를 활용하여 Java나 기타 언어처럼 속성 및 메서드의 범위를 정할 수 있다.

```js
// 클로져로 Java 클래스와 유사하게 모듈화한 예제
var Module = (function() {
    var privateProperty = 'foo';
    function privateMethod(args) {
      console.log('private method');
    }

    return {
        publicProperty: '',
        publicMethod: function(args) {
          console.log("public method");
        },
        privilegedMethod: function(args) {
          return privateMethod(args);
        }
    };
})();

Module.privilegedMethod();
```
