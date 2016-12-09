---
layout: article
title: "Tomcat HTTPS 설정하기"
date: 2016-12-09 10:20:13 +0900
categories: web_dev
image:
  teaser: posts/web/progressive_web_app/tomcat_https.png
  credit: tomcat #name of the person or site you want to credit
  creditlink: http://tomcat.apache.org/
    #url to their site or licensing
locale: "kr"
# 리플 옵션
comments: true
---
{% include toc.html %}

## 개요
- Progressive Web App 을 개발하기 위한 기본 환경은 HTTPS 통신을 이용한 웹 어플리케이션 접근이다.
- Tomcat 을 Web Application Server 로 활용하는 경우 기본 통신방식인 HTTP 에서 HTTPS 로 어떻게 변환하는지 알아본다.

## 1. KeyStore 생성
- 왜 keystore 가 필요한가? : private key, certificate 등을 저장할 수 있어 Client - Server 간의 Secured 통신을 위해 Tomcat에 설정이 가능하기 때문이다.
- keystore 란? : keystore 는 키를 저장하는 파일이다.
- JDK 를 이용한 keystore 생성은 커맨드 창에서 아래 명령어를 이용한다.

  ```
  // 윈도우의 경우
  "%JAVA_HOME%\bin\keytool" -genkey -alias tomcat_https -keypass changeit -storepass changeit -keyalg RSA -keystore c:\https_setup_for_push\.keystore
  ```

- 위를 해석해보면

  - **"%JAVA_HOME%\bin\keytool"** : 환경변수에 JAVA_HOME 이 Java 로 잡혀있을 때, Java bin 폴더의 keytool.exe 을 접근
  - **"-alias tomcat_https"** : tomcat_https 이라는 별칭을 생성
  - **"-keystore c:\https_setup_for_push\.keystore"** :  C 드라이브 밑의 https_setup_for_push 이라는 폴더에 .keystore 파일을 생성
  - **"-keypass, -storepass"** : key 와 store 의 비번 설정
  - **"CN"** : 사용할 도메인 주소 (ex. 192.168.222.23 또는 httpssetup.com)
  - **"OU"** : 조직 단위
  - **"O"**  : 조직 이름
  - **"L"**  : 구/군/시 선택
  - **"ST"** : 시/도 선택
  - **"C"**  : 국가 코드

- 이미지 첨부 ![키스토어 생성절차]()

## 2. 생성한 Keystore 를 인증서 cer 파일 형태로 저장하기
- 위에서 생성한 keystore 를 export 명령어를 이용하여 cer 파일의 형태로 저장할 수 있다.

  ```
  "%JAVA_HOME%\bin\keytool" -export -alias tomcat_https -storepass changeit -file c:\https_setup_for_push\server.cer -keystore c:\https_setup_for_push\.keystore
  ```

  - **"-file c:\https_setup_for_push\server.cer"** : 해당위치에 server 라는 이름의 cer 파일을 생성한다.

- 이렇게 생성한 cer 파일은 IE 브라우저에 인증서로 추가하여, chrome 에서도 제약없이 사이트 접근이 가능하다.

## 3. cer 인증서를 keystore 에 탑재하기
- cer 인증서는 아래와 같이 import 명령어를 이용하여 keystore 에 추가가 가능하다.

  ```
  "%JAVA_HOME%\bin\keytool" -import -v -trustcacerts -alias tomcat_https -file c:\https_setup_for_push\server.cer -keystore c:\https_setup_for_push\.keystore -keypass changeit -storepass changeit
  ```

## 4. tomcat 의 https 설정 및 keystore 등록
- cer 인증서까지 추가된 keystore 를 tomcat 에 설정해줄일만 남았다.
- tomcat 의 server.xml 에 아래의 내용을 추가한다.

  ``` xml
  <Connector SSLEnabled="true" clientAuth="false" keyAlias="tomcat_https" keystoreFile="C:/https_setup_for_push/.keystore" keystorePass="changeit" maxThreads="150" port="8443" protocol="HTTP/1.1" scheme="https" secure="true" sslProtocol="TLS"/>
  ```

## 기타) Keystore 의 cer을 txt 파일형태로 생성하는 법
- 아래의 명령어를 보자.

  ```
  "%JAVA_HOME%\bin\keytool" -certreq -alias tomcat_https -keyalg rsa -file csr.txt "-keystore c:\https_setup_for_push\.keystore"
  ```

  - **"-certreq -alias tomcat_https"** : tomcat_https 라는 별칭을 가진 keystore 를 접근
  - **"-file csr.txt"** : csr 이라는 이름의 txt 파일 형태로 생성
  - **"-keystore c:\https_setup_for_push\.keystore"** : 해당 주소의 keystore 를 접근

- 위 명령어를 입력하면 keystore 생성시에 입력한 암호를 요구한다. (여기서는 changeit)

## 참조 사이트
- [Tomcat SSL 설정](https://www.crosscert.com/symantec/board/tomcat5.pdf)
- [Keytool 을 이용한 Keystore 만들기](http://i5on9i.blogspot.kr/2015/10/keytool-keystore.html)
