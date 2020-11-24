## Vue 3 업그레이드 가이드

- 이벤트 버스 지원 중단. `$on`, `$off`, `$once` 등의 이벤트 버스 관련 API가 제거됨

```js
bus.$emit('pass');

bus.$on('pass', () => {
  alert('hi');
});
```

- `enumerated attributes` 열거형 속성이 일반 속성의 바인딩과 동일하게 취급된다.

```html
<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>

<template>
  <!-- 2.x 버전 -->
  <div v-bind:id="show"></div> <!-- <div></div> -->
  <div v-bind:draggable="show"></div> <!-- <div draggable="false"></div> -->
  <div v-bind:aria-selected="show"></div> <!-- <div></div> -->
  
  <!-- 3.x 버전 -->
  <div v-bind:id="show"></div> <!-- <div id="false"></div> -->
  <div v-bind:draggable="show"></div> <!-- <div draggable="false"></div> -->
  <div v-bind:aria-selected="show"></div> <!-- <div aria-selected="false"></div> -->
</template>
```

<p class="notice-success">열거형 속성이란 `draggable`, `contenteditable`, `spellcheck`와 같이 속성의 값이 정해져 있는 속성들을 의미합니다</p>

- 뷰 필터가 제거됨

```html
<template>
  <p>{{ 'hello' | capitalize }}</p> <!-- Hello -->
</template>

<script>
export default {
  filters: {
    capitalize(value) {
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>
```

- `Vue.component` 등의 `Vue` 생성자 관련 전역 API가 모두 사라졌음. `vue-test-utils` 등을 이용한 테스트 코드를 작성할 때 아래와 같은 방식으로 단위 테스팅을 작성했던 번거로움을 해결하기 위한 목적으로 보임

```js
import { createLocalVue, mount } from '@vue/test-utils'

// create an extended `Vue` constructor
const localVue = createLocalVue()

// install a plugin “globally” on the “local” Vue constructor
localVue.use(MyPlugin)

// pass the `localVue` to the mount options
mount(Component, { localVue })
```

뿐만 아니라 `Vue.~~` 전역 API를 이용하면 `new Vue()` 생성되는 모든 루트 인스턴스에 영향을 주기 때문에 인스턴스마다 별도의 설정(config 또는 setup)을 잡기가 어려움. 뷰 3에서는 아래와 같은 형태로 루트 인스턴스(앱)를 생성.

```js
import { createApp } from 'vue'

const app = createApp({
  // 인스턴스 옵션 속성
})
```

- `el` 속성이 사라지고 아래와 같이 컴포넌트를 마운트 하는 방식으로 변경

```js
import { createApp } from 'vue'
import MyApp from './MyApp.vue'

const app = createApp(MyApp)
app.mount('#app')
```

