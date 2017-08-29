---
layout: article
title: "Angular 2 개념정리 (초급)"
date: 2016-11-21 18:51:13 +0900
categories: [web-development, angular]
excerpt: "Angular 2 개요 소개, Angular 1 과 차이점.."
image:
  teaser: posts/web/angular2/angular2.png
  credit: Axilis #name of the person or site you want to credit
  creditlink: http://www.slideshare.net/axilis/angular-2-49397263 #url to their site or licensing
locale: "ko"
# 리플 옵션
comments: true
tags: [앵귤러2, 앵귤러2 초급, 앵귤러2 입문, 앵귤러2 시작하기, 앵귤러2 시작, 앵귤러2 튜토리얼, 앵귤러2 개념정리, 프론트엔드 개발, angular2, angular, 타입스크립트, typescript]
# - 앵귤러2
# - 앵귤러2 초급
# - 앵귤러2 입문
# - 앵귤러2 시작하기
# - 앵귤러2 시작
# - 앵귤러2 튜토리얼
# - 앵귤러2 개념정리
# - 프론트엔드 개발
# - angular2
# - angular
# - 타입스크립트
# - typescript
---
{% include toc.html %}

> CodeSchool 의 Angular 2 강의 내용을 요약하였습니다.

## Angular 1 과 2 의 차이점?
- Speed : Angular 2 가 많은 면에서 더 빠르다
- Components : Angular 1 의 Controller, Scope 대신에 사용
- Simpler Directives : Custom Directives 를 생성하기 쉬워짐
- Intuitive Data Binding : HTML 요소나 버튼에 이벤트 리스너를 설치할 떄 더 직관적인 신택스 제공
- Services : 이제는 클래스로 선언

## Angular 2 에서는 어떤 언어를 사용하나?
- Javascript 로 코딩이 가능하지만 모든 브라우저에서 최신 버전의 자바스크립트를 지원하지는 않기 때문에. **Babel & TypeScript** 를 이용하여 Transpile (모든 브라우저에서 호환 가능한 Javascript 로 변환)한 후 사용한다.

## TypeScript
- 마이크로소프트에서 확장한 자바스크립트
- ES2015 피쳐 : 강력한 타입 체크와, 객체 지향 기능들을 지원
- 확장자명 .ts
- [타입스크립트 홈피](http://www.typescriptlang.org/)

## Transpiling 위치
- *브라우저에서 TypeScript 를 Javascript 로 변환하는 방법* 과 *브라우저에 보내기 전에 TypeScript 를 빌드하고 Javascript 로 변환하고 난 후 브라우저로 보내는 방법* 이렇게 두가지가 존재한다.
- 후자가 당연히 더 빠르고, 실제 서비스 할 때 권고하는 방법이다.

## Backtic
- Angular 2 에서는 Double Quote 대신에 Backtic 이라는 **\` \`** 를 사용하여 템플릿을 설정할 수 있다.

## Angular 2 라이브러리 로딩
- [사이트](http://go.codeschool.com/angular2start)를 참고하여 Angular 2 에 필요한 라이브러리 로딩에 대해서 알아본다.

## Part 1 Conclusion
- Angular 는 다이나믹 웹 앱을 위한 프레임워크
- TypeScript 를 이용하여 Angular 를 코딩할 수 있다. TypeScript 는 자바스크립트로 변환해주는 언어
- Decorator 는 플레인 TypeScript 클래스들을 Components 로 변환해준다
- Components are the building blocks of our application.

## Directives
- HTML 요소에 동적인 기능이나 동작을 추가할 수 있게 하는 Angular 구성요소
- 3가지 종류 : Component / Structural / Attribute

## Structural Directives
- *ngFor : Loop the array
- *ngIf : conditional statement

  ``` javascript
  <li *ngFor="let carPart of carParts">
  <p *ngIf="carPart.inStock > 0">{{carPart.inStock}} in Stock</p>
  <p *ngIf="carPart.inStock === 0">Out of Stock</p>
  ```

## Pipes & Methods
- Pipes : 템플릿의 데이터를 우리가 원하는 방식으로 가공해서 보여줄 수 있는 기능
  - ex) currency, lowercase, etc
- Methods : 클래스 안에 생성이 가능하고, `function` 키워드를 넣을 필요 없음 (ES2015 문법)

## ES 2015 Fat Arrow
- ES2015 에 등장하는 새로운 함수 정의법 `=>` 을 살펴보자.

  ``` javascript
  // Old Javascript
  totalCarParts() {
    return this.carParts.reduce(function(prev, current) {return prev + current.inStock; }, 0);
  }

  // ES2015 Fat Arrow Usage
  totalCarParts() {
    return this.carParts.reduce((prev, current) => prev + current.inStock, 0);
  }
  ```

## 파일 구조화 하기
- `main.ts` 파일을 다음 3개의 파일로 분할

  1. `main.ts` : 앱 초기화 및 첫번째 컴포넌트 로딩
  2. `app.component.ts` : 페이지 헤더
  3. `car-parts.component.ts` : car parts 리스트

## 분할된 파일의 클래스를 어떻게 접근하는가?
1. class 앞에 `export` 예약어 추가 : `export class`
2. main.ts 파일에서 `import` 로 파일의 클래스 접근 : `import { AppComponent } from './app.component';`
3. @NgModule 데코레이션에 해당 컴포넌트 추가

  ``` javascript
  @NgModule({
    declarations: [
      AppComponent,
      CarPartsComponent // 추가된 컴포넌트
    ],
  })
  ```

## CSS 의 컴포넌트 Scoping
- 특정 컴포넌트에 해당하는 CSS 스타일링이 가능하다. (아래 챕터에서 나온 구조화를 진행하면 별도의 지정어 없이도 Angular 에서 자동으로 컴포넌트에만 국한되는 스코핑을 한다)

  ``` html
  <p _ngcontent-dcy-2 class="description">
  <p _ngcontent-dcy-2 class="price">

  .description[_ngcontent-dcy-2] {
    color: #444;
    font-size: small;
  }
  .price[_ngcontent-dcy-2] {
    font-weight: bold;
  }

  <!-- 위 스타일링은 해당 클래스 중  _ngcontent-dcy-2 를 갖고 있는 태그에만 적용된다 -->
  ```

## Javascript & HTML & CSS 의 구조화
- 한개의 Component 안에 너저분하게 html, css 가 모두 들어가는 것 보단 아래와 같이 scalable 하게 구조화가 가능하다.

  ``` javascript
  import { Component } from '@angular/core';

  @Component({
    selector: "car-parts",
    templateUrl: "app/car-parts.component.html",
    styleUrls: ['app/car-parts.component.css']
  })
  ```

## Mocks & Models
- `const` : 해당 변수의 내용이 재정의 되지 않도록 설정 (ES2015)
- `ngOnInit()` : 해당 컴포넌트가 생성되고 나면 바로 실행된다. 따라서, 프로퍼티 값을 초기화하기에 가장 안성맞춤인 장소. 컴포넌트 내의 다른 장소에서 프로퍼티 값 초기화도 가능하지만, 테스트하기에 어려움이 있다. 따라서 ngOnInit 에서 초기화 하도록 한다.

## 현재까지의 Component 구조
1. index.html 로딩 : `<my-app>` 을 포함하고 있고, main.ts 를 호출
2. main.ts 로딩 : 첫번째 컴포넌트를 호출하고, 전체 앱을 부트스트래핑
3. app.component.ts : 첫번째 컴포넌트이자, 헤더를 로딩한다. 그리고 이하 컴포넌트들을 로딩한다.
  - `car-parts.component.ts` : javascript 로직
  - `car-part.ts` : 데이터 모델
  - `mocks.ts` : 가짜 데이터
  - `car-parts.component.html` : html 템플릿
  - `car-parts.component.css` : css 스타일


![구조 이미지]({{ site.url }}/images/posts/web/angular2/1.png)

## Best Practices about Mocks and Models
- TypeScript 에서는 클래스를 이용하여 데이터를 모델링한다.
- TypeScript 는 클래스의 속성 타입을 지정하여, 우리가 좋은 코드를 작성하고 있는지 컴파일러에게 확인시킨다.
- 가짜 데이터 작성은 별도의 파일로 분리해서 관리하는 것이 좋다.

## Property and Class binding
- one way binding : 컴포넌트 프로퍼티 값으로 DOM 속성을 변경할 수 있지만, 그 반대는 되지 않는다

## Event Binding
- 화면에서 발생하는 이벤트를 괄호() 로 묶고, 해당 이벤에 따라 수행되는 메서드 명을 지정한다 : `(click)="upQuantity(carPart)"`
- `$event` 객체는 화면에서 발생한 이벤트의 값을 저장한다 : `<input type="text" (keydown)="showKey($event)">`

## Two way Binding
- 투 웨이 바인딩을 하기 위해서는 2가지 방법이 있다.

  1. `<input [value]="carPart.quantity" (input)="carPart.quantity = $event.target.value">`
  2. *FormsModule* 임포트 후 추가

- Model 의 *Banana in a box* : 네모 괄호 안에 둥근 괄호를 넣으면 Model 이 양방향으로 바인딩 된다. **`[( )]`**

  ``` javascript
  [(ngModel)] = "cash"
  ```

## Services
- 서비스 : 앱의 코드를 공유하거나 구성하는데 사용되고, 주로 데이터 접근 메서드를 생성할 때 사용한다.

![서비스 그림]({{ site.url }}/images/posts/web/angular2/2.png)

- Dependency Injection 은 서비스를 생성하고 클래스에 보낼 때 사용된다.
- DI 에 Provider 를 제공함으로써 어떤 클래스가 서비스 생성이 필요한지를 알 수 있다.
- `class constructor` 에 서비스를 지정함으로써 DI 에게 클래스 생성 여부를 요청할 수 있다.
- **The injector knows how to inject our dependencies**
  - inject : Create (if needed) and send
  - dependencies : Classes we depend on

- DI 에 Providers 를 등록하는 법 (RacingDataService)

  1. 주입할 수 있는 데코레이터를 Service 에 추가
  2. 인젝터에 서비스를 프로바이더로 명명하여 알게한다
  3. 디펜던시를 ts 파일에 주입한다.

![DI Provider 등록]({{ site.url }}/images/posts/web/angular2/3.png)

#### 주입할 수 있는 데코레이터를 Service 에 추가

  ``` javascript
  import { Injectable } from '@angular/core';

  @Injectable()
  export class ~~ {

  }
  ```

#### 인젝터에 서비스를 프로바이더로 명명하여 알게한다

  ``` javascript
  import { RacingDataService } from `./racing-data.service`;

  @NgModule({
    providers: [ RacingDataService]
  })
  ```

#### 디펜던시를 ts 파일에 주입한다

  ``` javascript
  import { RacingDataService } from `./racing-data.service`;

  @Component({ ... })
  export class CapPartsComponent {
    carParts: CarPart[];

    // 서비스 생성
    constructor(private racingDataService: RacingDataService) { }

    // 위 문장은 다음과 같다.
    function CarPartsComponent(racingDataService) {
      this.racingDataService = racingDataService;
    }
  }
  ```

## HTTP
- HTTP 라이브러리 등록 절차

  1. JSON 파일 생성
  2. HTTP 라이브러리 포함
  3. Injector 에 http 프로바이더 전달
  4. http 디펜던시 주입 후, http get 요청
  5. 요청에 반환되는 데이터 대기

- main.ts 에 아래와 같이 포함

  ``` javascript
  import { HttpModule } from "@angular/http";

  @NgModule({
    imports: [HttpModule],
    providers: [],
    // http 모듈을 보면 이미 provider 리스트에 등록이 되어 있으므로, 프로바이더에 따로 등록할 필요는 없다.
  })
  ```

- service.ts 에 아래와 같이 포함

  ``` javascript
  import { Http } from "@angular/http";
  import "rxjs/add/operator/map";

  @Injectable()
  export class RacingDataService {

    constructor(private http: Http) { } // HTTP 디펜던시 주입

    getCarParts() {
      return this.http.get('app/car-parts.json').map(response => <CapPart[]>response.json().data);
    }
  }
  ```

  - 위 코드에 관한 설명은 다음 이미지 참조
  - ![http response]({{ site.url }}/images/posts/web/angular2/4.png)

- http 는 Observable 이라는 형태의 데이터로 반환해준다.
- 테스트나 오프라인시에는 RacingDataServiceMock 같은 서비스 명을 활용하여 테스트 하도록 한다.
