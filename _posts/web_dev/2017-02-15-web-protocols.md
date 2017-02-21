---
layout: article
title: "웹 개발자를 위한 Web Protocols 정리"
date: 2017-02-15 18:00:32 +0900
categories: web_dev
# description: "웹 통신 프로토콜인 URL, HTTP, SMTP, MIME, FTP 을 정리"
excerpt: "웹 프로토콜 HTTP, SMTP, MIME, FTP 와 URL"
image:
  teaser: posts/web/http.png
  credit: Ibrahim #name of the person or site you want to credit
  creditlink: https://ibrahimabdelkareem.wordpress.com/2016/12/16/building-n-tier-restful-api-using-asp-net-web-api-2-part-2-more-about-http-protocol/
  #url to their site or licensing
locale: "ko_KR"
# 리플 옵션
comments: true
tags:
- web protocols
- web developer
- web development basic
- 웹 개발 기초
- 웹 개발자
- 웹 개발자를 위한
- 웹 개발자를 위한 웹 프로토콜
- 웹 프로토콜
- HTTP
- MIME
- SMTP
- URL
---
{% include toc.html %}

## URL (Uniform Resource Locator)
- 웹에서 웹 페이지를 정의하고 접근하기 위해 URL 을 사용한다.
- URL 의 일반적인 형식은

  ``` text
  protocol://computer_name:port/document_name?parameters
  ```

- 여기서 각 단위의 역할을 살펴보자.

  - protocol : 문서를 접근하기 위해 사용하는 프로토콜 이름
  - computer_name : 문서가 있는 컴퓨터의 도메인 이름
  - port : 서버가 어떤 포트 숫자를 바라보고 있는지 (선택 사항)
  - document_name : 서버 컴퓨터에 있는 특정 문서의 이름
  - parameters : 페이지에 넘기는 변수 (선택 사항)

- 위의 형식을 이용하여 예제를 보면

  ``` text
  http://www.netbook.cs.purdue.edu/toc/toc01.htm
  ```

- 위 URL 은 http 프로토콜을 이용하고, www.netbook.cs.purdue.edu 의 이름을 갖는 컴퓨터(서버)에서 toc/toc01.htm 파일을 접근한다.

## HTTP (Hyper Text Transfer Protocol)
- HTTP 는 브라우저가 웹 서버와 통신하기 위해 사용하는 주요 프로토콜이다.
- HTTP 4가지 요청 형식은 아래와 같다.

  - GET : 문서를 요청. 서버가 클라이언트에 상태 정보와 복제된 문서를 보냄으로써 응답을 함. (조회)
  - HEAD : 상태 정보를 요청. GET 과 동일한 형태로 응답을 하지만, 문서를 복제하지는 않는다.
  - POST : 데이터를 서버로 송신. 서버는 해당 데이터를 특정 아이템에 덧붙인다. (생성)
  - PUT : 데이터를 서버로 송신. 서버가 특정 아이템을 완전히 대체한다. (수정)

## HTTP GET 요청 동작과정
- URL 에 사이트 주소를 입력하고 확인을 누르면, 브라우저에서 GET 요청으로 서버에 페이지를 요청한다.
- GET 요청을 받은 서버에서는 *헤더, 빈 줄, 요청한 문서* 를 클라이언트로 보낸다.
- 이 때 GET 의 요청 형식은 다음과 같다.

  ``` text
  GET /item versionCRLF
  ```

- 위 형식을 해석해보면,

  - item : 요청한 문서의 URL
  - version : 프로토콜의 버전을 의미. 보통은 HTTP/1.0 이나 HTTP/1.1 이다.
  - CRLF : 텍스트 줄의 끝을 의미하는 2 개의 아스키 코드를 의미 (Carriage Return : 커서를 행의 맨 좌측 이동, Line Feed : 커서를 다음 행으로 이동)

- 여기서 version 이 중요한 이유가 클라이언트와 서버 모두 이해 가능한 버전으로 맞추어 호환하기 때문이다.
- 응답 헤더에서 상태 정보를 포함하기 때문에, 해당 요청이 서버에서 제대로 처리가 되었는지 확인할 수 있다.
- 자주 쓰이는 상태 정보로는 404 (해당 문서 못 찾음), 200 (요청 처리 완료) 등이 있다.

## HTTP 응답 헤더
- HTTP 응답 헤더의 일반적인 형태는 아래와 같다.

  ``` text
  HTTP/1.0 status_code status_string CRLF
  Server: server_identification CRLF
  Last-Modified : date_document_was_changed CRLF
  Content-Length : datasize CRLF
  Content-Type : document_type CRLF
  CRLF
  ```

- 위를 자세히 살펴 보면,

  - status_code : 상태를 나타내는 숫자 값
  - status_string : 사람이 식별 가능한 상태 문자 값
  - server_identification : 서버정보 설명
  - datasize : 데이터의 크기 (바이트 단위)
  - document_type : 문서 유형 (html 문서는 text/html, jpeg 파일은 image/jpeg)


## 브라우저에서 캐싱하기
- 웹 페이지 성능을 최적화 하려면 캐시를 이용한다.
- 예를 들어, 용량이 큰 이미지가 많은 사이트를 반복 접속하는 경우에 다운로드 시간과 HTTP GET 요청수를 줄이기 위해 해당 이미지를 사용자의 디스크에 저장하고 캐시로 사용한다.
- 브라우저는 캐시가 최신 버전인지 이전 버전인지 어떻게 확인할까?
- 바로 캐시를 사용하기 전에 서버에 HEAD 요청을 날려 Last-Modified Date 를 비교해 최신임을 확인한다.
- 여기서 주의할 점은 모든 파일에 대해 캐시를 만드는 것이 더 효율적일지 아니면, HEAD 요청을 만들어 날리는 값들을 고려했을 때 캐시로 만들지 않는 것이 더 효율적일지 고민해야 한다. (캐시하려는 파일의 크기가 매우 작은 경우)

## FTP (File Transfer Protocol)
- 파일이 문서, 이미지, 프로그램 등 다양한 형태의 데이터를 갖고 있을 수 있기 때문에 컴퓨터 간의 파일 교환시에 호환성을 보장하는 프로토콜이 필요하다.
- 컴퓨터 간의 호환성이라는 것은 예를 들어, 한 컴퓨터에서는 JPEG 이미지가 .jpg 로 저장되지만 다른 컴퓨터에서는 .jpeg 로 저장될 수 있다. 또한 어떤 컴퓨터는 파일 경로를 (/) 를 사용하지만 다른 컴퓨터는 (\) 를 사용할 수도 있다.
- 이렇기 때문에 파일 전송에 대한 규약인 프로토콜을 이용하여 상호 컴퓨터 간에 파일 전송이 가능하다.
- FTP 의 특성은 다음과 같다.

  - 어떤 형태의 데이터든 전송이 가능하다.
  - 파일을 다운로드 & 업로드 할 수 있다.
  - 파일에 대한 권한을 설정할 수 있다.
  - ASCII 문자로 메시지가 교환된다.
  - 파일을 검색하고 조회할 수 있다.

- 브라우저에서 파일을 다운로드 하게 되면 바로 FTP 프로토콜을 사용하게 된다.

## FTP 통신 방식
- HTTP 와는 다르게 FTP 는 클라이언트에서 서버로 한번 연결을 맺어놓은 상태에서 파일을 주고 받는 것이 아니라. 클라이언트에서 서버와의 연결이 맺어지면, 해당 연결은 명령어 입력을 위해 남겨놓고 (Control Connection), 파일을 보낼 때 새로운 연결을 추가하여 파일을 전송한다. (File Connection)

## SMTP (Simple Mail Transfer Protocol)
- 메일 전송 프로그램이 서버로 메일을 보낼 때 사용하는 프로토콜이다.
- 오직 텍스트만 전송이 가능한 것이 특징이고, 스트림 방식을 이용하여 전송한다.
- SMTP 는 한 개의 메시지를 해당 서버의 여러 수신자에게 보낼 수 있다는 특징이 있다.
- 상태 코드는 250 (수신 성공), 550 (수신자 못 찾음)

## MIME (Multi-purpose Internet Mail Extensions)
- SMTP 로 전송시 이메일에 텍스트 밖에 포함하지 못하는 단점을 보완하여, 메시지 안에 텍스트 이외의 데이터를 전송할 수 있는 프로토콜이다.
- 바이너리 파일을 출력 가능한 문자열 형태로 인코딩하고, 수신하는 부분에서 디코딩한다.
- Base64 로 인코딩 하기는 하지만, 다른 형태의 인코딩도 사용할 수 있다.
- 인코딩 방식은 메시지의 헤더 안에 정의한다.
- MIME 은 이메일 헤더에 2 줄을 추가하는데, 이메일에 MIME 이 사용되었는지 여부와 MIME 정보를 바디에 어떻게 포함시킬 건지 를 정의한다.

  ``` text
  MIME-Version : 1.0
  Content-Type : Multipart/Mixed; Boundary=Mime_separator
  ```

- 위의 MIME 버전은 1.0 이고, 각 메시지의 앞에 Mime_separator 가 나타남을 명시한다.
- 텍스트만 보내는 경우에 Content-Type 이 *text/plain* 이 된다.
- **결론적으로, MIME 은 이메일 메시지 안의 헤더에 추가 정보를 포함하여 비 텍스트 형의 데이터가 전송될 수 있도록 하는 프로토콜이다. 그리고 첨부된 데이터는 출력 가능한 형태의 문자열로 인코딩 되어 있고, 각 첨부 앞에 separator 로 구분되어 있다.**
