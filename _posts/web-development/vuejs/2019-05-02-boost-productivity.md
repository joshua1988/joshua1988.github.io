---
layout: article
title: 'Vue.js 개발 생산성을 높여주는 도구 3가지'
date: 2019-05-02 17:25:32 +0900
categories: [web-development, vuejs]
excerpt: '뷰로 개발할 때 반복적인 코드 작성을 줄이고 코드 리뷰를 편하게 해주는 도구 알아보기'
image:
  teaser: posts/web/vuejs/logo.png
  credit: Evan You
  creditlink: https://vuejs.org/
  #url to their site or licensing
locale: 'ko_KR'
# 리플 옵션
comments: true
tags:
  - Vue.js 정복 캠프
  - Vue.js 책
  - do it! Vue.js 입문
  - do it! vue.js
  - vue.js 입문서
  - vue.js 시작하기
  - vue.js 장점
  - vue.js 예제
  - vue.js 온라인 강의
  - vue.js 교육
  - vue.js 강좌
  - vue.js 강의
  - vue.js 입문
  - eslint
  - prettier
  - vue eslint
  - vue prettier
  - vue.js 프론트엔드 개발자
  - 패스트캠퍼스 vue.js 강의
  - 인프런 장기효
  - 장기효
  - 캡틴판교
  - captain pangyo
---

{% include toc.html %}

## 들어가며

실무에서 프런트엔드 개발을 하다 보면 늘 효율과 생산성에 대해서 고민하게 됩니다. 어떻게 하면 팀 전체가 일관된 형식으로 코드를 작성할 수 있을지, 매번 반복적으로 치는 코드들을 줄일 수 있을지 고민하죠.

오늘은 이런 고민들을 해결해줄 수 있는 몇 가지 도구를 소개하려고 합니다. 바로 ESLint, Prettier, Vue VSCode Snippets 입니다. 도구들에 대한 간단한 설명부터 프로젝트에 바로 적용해서 사용할 수 있는 가이드를 짧은 호흡으로 적어보겠습니다. 그럼 이 글이 여러분의 업무 시간을 줄여줄 수 있길 바라며..

Enjoy your coding!

## Prettier

프리티어(Prettier)는 코드 스타일을 정리해주는 도구입니다. ESLint와 함께 사용하면 좀 더 개인 취향에 맞는 코드 스타일로 전체 코드를 정리할 수 있습니다. VSCode(Visual Studio Code), Atom, Sublime 등 대중적인 텍스트 편집기에서 이미 플러그인 형태로 지원하고 있으며 VSCode에서는 아래와 같이 확장 플러그인으로 설치할 수 있습니다.

![prettier on vscode]({{ site.url }}/images/posts/web/vuejs/productivity1/prettier.png)

## Prettier 적용하기

프리티어를 사용하는 가장 간단한 방법은 앞에서 언급한 플러그인을 활용하는 방법입니다. VSCode 기준으로 아래의 내용을 사용자 설정 파일인 settings.json 파일에 추가합니다.

```json
{
  "editor.formatOnSave": true,
  "editor.formatOnType": true
}
```

위 속성은 코드를 작성하고 저장 버튼을 눌렀을 때 자동으로 코드를 정리해줍니다. 아래와 같이 말이죠.

![prettier 동작 화면]({{ site.url }}/images/posts/web/vuejs/productivity1/prettier-demo.gif)

이렇게 플러그인으로 간단하게 코드를 정리할 수도 있지만 개인적으로는 ESLint와 결합하여 프로젝트 설정 파일로 관리하는 것을 추천합니다. 왜냐하면 팀원들이 모두 동일한 텍스트 편집기를 사용한다는 보장이 없으니까요 :)

ESLint와 프리티어를 함께 적용하는 방법은 다다음 섹션을 참고하세요.

## ESLint 소개

린트(ESLint)는 잘못된 코드 스타일로 인해 에러가 나지 않게 코드 문법을 잡아주는 문법 검사기입니다. 문장 뒤에 자동으로 세미콜론, 콤마를 붙여주기도 하고 의미 없는 변수, API 사용에 대해 경고해주는 등 여러 문법 오류에 대해서 미리 알려주죠. 가급적 덜 에러가 나는 코드를 작성하면 자연스럽게 버그도 줄어들기 때문에 서비스 품질을 높이는데도 도움이 됩니다.

## ESLint와 Prettier를 뷰 프로젝트에 적용하기

일단 Vue CLI 3.x 버전에서는 프로젝트를 생성할 때 ESLint와 Prettier를 추가할 수 있습니다. 아래와 같이 말이죠.

![Vue CLI 3.x로 ESLint & Prettier 설정하기]({{ site.url }}/images/posts/web/vuejs/productivity1/vue-eslint-project-init.gif)

하지만 이미 뷰 프로젝트를 생성하여 진행 중이신 분들은 아래와 같이 구성하시면 됩니다.

**1.**노드 패키지 매니저(NPM)로 린트 및 프리티어 라이브러리를 설치합니다.

```bash
npm i eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue --save-dev
```

**2.**프로젝트 루트 레벨에 린트 설정 파일인 `.eslintrc.js`를 추가합니다.

```js
// .eslintrc.js
module.exports = {
  // 현재 eslintrc 파일을 기준으로 ESLint 규칙을 적용
  root: true,
  // 추가적인 규칙들을 적용
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'prettier',
    'plugin:prettier/recommended',
  ],
  // 코드 정리 플러그인 추가
  plugins: ['prettier'],
  // 사용자 편의 규칙 추가
  rules: {
    'prettier/prettier': [
      'error',
      // 아래 규칙들은 개인 선호에 따라 prettier 문법 적용
      // https://prettier.io/docs/en/options.html
      {
        singleQuote: true,
        semi: true,
        useTabs: true,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
```

각 주요 속성에 대해서 간략히 알아보겠습니다.

- `root`: 현재 폴더 위치를 기준으로 하위의 파일에 린트를 적용합니다. 상위 폴더에 린트를 적용하지 않습니다.
- `extends`: 린트의 기본적인 문법 검사 규칙 이외에 추가적인 규칙들을 적용합니다. 이미 누군가에 의해 정해진 몇 개의 규칙을 추가한다고 보면 됩니다.
- `plugins`: NPM으로 설치하여 사용할 수 있는 확장 규칙입니다. 대중적인 라이브러리와 결합하여 린트를 사용할 수 있습니다.
- `rules`: 린트를 실행할 때 사용자가 임의로 규칙을 추가하여 검사에서 제외 또는 추가하는 속성입니다.

참고로 린트 설정 파일 대신에 `package.json` 파일에 `eslintConfig` 속성을 사용해도 되지만 규칙 적용에 대한 우선순위는 린트 설정 파일이 더 높기 때문에 설정 파일을 따로 만들어서 사용하시는 것을 추천드립니다.

**3.** NPM 설정 파일인 `package.json` 파일에 아래의 NPM 커스텀 명령어를 추가합니다.

```json
{
  "lint": "eslint --ext .js,.vue src"
}
```

콘솔 창에서 위 명령어를 수행하면 src 폴더 밑의 js, vue 파일에 대해서 린트 검사를 수행합니다. 앞에서 린트 설정에 프리티어 내용을 추가했기 때문에 린트의 기본 규칙과 함께 `rules`에 설정한 프리티어 규칙도 함께 적용되어 검사됩니다.

**4.**마지막으로 비주얼 스튜디오 코드의 프리티어 플러그인을 비활성화하고 `settings.json` 파일에 아래의 내용을 추가합니다.

```json
{
  ...
  "editor.formatOnSave": true,
  "eslint.autoFixOnSave": true,
  "eslint.alwaysShowStatus": true,
  "eslint.validate": [
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "javascript",
      "autoFix": true
    },
    {
      "language": "javascriptreact",
      "autoFix": true
    }
  ]
}
```

프리티어 플러그인을 비활성화하지 않으면 VSCode의 Formatter 기능과 린트 검사 기능이 겹치게 되어 코드가 일관되게 정리되지 않습니다. 꼭 프리티어 플러그인을 사용하지 않음으로 설정하고 VSCode의 오른쪽 아래에 있는 Formatting을 X로 전환해주세요.

![VSCode의 Formatting 기능 끄기]({{ site.url }}/images/posts/web/vuejs/productivity1/vscode-format-off.png)

## Vue VSCode Snippets

마지막으로 살펴볼 도구는 Vue VSCode Snippets이라는 VSCode 확장 플러그인입니다. Vue의 코어팀 멤버이자 마이크로소프트웨어 개발자인 Sarah Drasner가 제작하였습니다. 개인적으로 자주 사용하는 스니펫은 vdata, vimport, vmethods 정도가 있습니다. 관심 있으신 분들은 아래 링크로 접속해서 살펴보세요. 

[Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets)

![Vue VSCode Snippets Demonstration]({{ site.url }}/images/posts/web/vuejs/productivity1/vue-vscode-snippets.gif)

## 마무리

아무래도 이번 글은 개발 환경 구성과 관련된 글이다보니 따라서 적용하시는게 쉽진 않겠지만 그래도 구성하시는데 도움이 되었으면 좋겠습니다. 잘 구성하셔서 재밌고 편하게 코딩하세요! :)

## 글보다 더 쉽게 배우는 온라인 강좌
좀 더 친절하고 상세한 설명을 원하신다면 아래 강좌를 이용해보시는 것도 좋을 것 같아요 😄

<figure class="third">
	<a href="https://www.inflearn.com/course/vue-js-%EB%81%9D%EB%82%B4%EA%B8%B0-%EC%BA%A1%ED%8B%B4%ED%8C%90%EA%B5%90?utm_source=blog&utm_medium=githubio&utm_campaign=captianpangyo&utm_term=banner" target="_blank"><img src="{{ site.url }}/images/posts/web/inflearn/lv4.png"></a>
	<figcaption>인프런 온라인 강좌 : Vue.js 엔드게임</figcaption>
</figure>

## 밀착 지도를 받을 수 있는 오프라인 강의

강남역 패스트캠퍼스에서 2020년 2월부터 4월 초까지 두 달 동안 매주 월요일 수요일에 Vue.js 집중반 수업을 진행합니다. 관심 있으신 분들은 아래 이미지를 클릭해주세요 😄

<figure class="third">
	<a href="https://www.fastcampus.co.kr/dev_camp_vue/" target="_blank"><img src="{{ site.url }}/images/posts/web/fastcampus/vue.png"></a>
	<figcaption>패스트캠퍼스 Vue.js 정복 캠프(20.2.24 ~ 20.4.1)</figcaption>
</figure>