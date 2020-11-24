## Vue 3 Composition

## Table of Contents

- 컴포지션 API를 쓰는 이유?
- 컴포지션 설명

## setup

- 컴포넌트가 생성되기 전에 실행된다. 라이프 사이클 `created` 이전에 실행.
- `setup()` 함수 안에서는 `this`를 사용할 수 없다. `setup()`함수의 인자로 넘겨 받은 `props`, `context`를 제외하고는 컴포넌트(인스턴스) 옵션 속성에 접근할 수 없다는 의미
- `setup()` 함수에서 아래와 같이 반환한 결과는 해당 컴포넌트의 인스턴스 옵션 속성과 템플릿 표현식에서 활용이 가능하다.

```js
export default {
  components: {
    // ...
  },
  setup() {
    var a = 10;

    return {
      a
    }
  },
  methods: {
    logText() {
      console.log(this.a); // 10
    }
  }
}
```

```html
<template>
  <div>
    <!-- 
      뒤에 나오는 `reactive`, `ref` 속성이 적용되었다고 가정하고 
      아래 값이 10이 될 것이라고 먼저 쉽게 생각하자.
    -->
    <p>{{ a }}</p>
  </div>
</template>
```

- `setup` 함수 안에서 정의한 변수를 템플릿 표현식이나 다른 컴포넌트 인스턴스 옵션 속성에서 제대로 활용하려면 아래와 같이 선언해줘야 합니다.

```js
export default {
  setup() {
    var a = ref(10);
    console.log(a); // { value: 10 }

    return {
      a
    }
  },
}
```

<p class="notice-success">ref는 Reactive Reference의 준말입니다</p>

## setup의 인자들

setup 함수의 인자로 `props`와 `context`가 있습니다.

#### props

프롭스는 아래와 같이 컴포넌트(인스턴스) 옵션 속성에 정의한 뒤 `setup` 함수의 첫 번째 인자로 접근합니다.

```js
export default {
  props: {
    items: Array
  },
  setup(props) {
    console.log(props.items);
  }
}
```

`setup` 함수의 인자로 넘어온 `props`에는 ES6 디스트럭처링을 사용하면 안됩니다. `props`의 반응성이 깨질 수도 있기 때문이죠.
대신 아래와 같은 문법으로 디스트럭처링을 할 수 있습니다.

```js
import { toRefs } from 'vue'

export default {
  props: {
    items: Array
  },
  setup(props) {
    const { items } = toRefs(props);
  }
}
```

#### context

컨텍스트는 컴포넌트 속성 3개를 접근할 수 있는 인자입니다.

```js
export default {
  setup(props, context) {
    // 애트리뷰트(반응성 없는 객체)
    console.log(context.attrs)

    // 슬롯(반응성 없는 객체)
    console.log(context.slots)

    // 이벤트 에밋
    console.log(context.emit)
  }
}
```

컨텍스트의 3가지 속성에는 모두 반응성이 없으므로 아래와 같이 디스트럭처링 해서 사용합니다.

```js
export default {
  setup(props, { attrs, slots, emit }) {
    ...
  }
}
```

## setup 안에서 접근 가능한 컴포넌트 속성들

`setup` 함수가 실행됐을 때는 아직 컴포넌트가 생성된 것이 아니기 때문에 위에서 살펴봤던 4가지 속성만 접근할 수 있습니다.

- `props`
- `attrs`
- `slots`
- `emit`

`setup` 함수 바깥에 정의된 아래 속성들은 `setup` 함수 안에서 접근할 수 없습니다.

- `data`
- `computed`
- `methods`

## setup의 반환 값

`setup` 함수에서 반환한 객체는 템플릿 표현식에서 사용할 수 있습니다.

```html
<template>
  <div>
    <p>{{ counter }}</p> <!-- counter.value로 접근하지 않아도 라이브러리 내부적으로 화면에 value 값을 엮어줍니다 -->
    <p>{{ book.title }}</p>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  setup() {
    const counter = ref(0);
    counter.value++; // 1
    const book = reactive({ title: 'Vue 3 Guide' });

    return {
      counter,
      book
    }
  }
}
</script>
```

## template refs

Vue 3에서 가장 유의해야 할 문법입니다. 뷰 이전 버전을 사용하셨던 분들은 익숙해진 습관 때문에라도 컴포지션에서의 ref 문법을 좀 유심히 살펴봐야 할 필요가 있습니다.
이전까지는 ref 속성을 아래와 같이 접근했었습니다.

```html
<template>
  <button ref="myButton">click me</button>
</template>

<script>
export default {
  mounted() {
    console.log(this.$refs.myButton); // <button>click me</button>
  }
}
</script>
```

컴포지션 API에서 템플릿 표현식의 `ref`를 접근할 때는 아래의 문법을 활용합니다.

```html
<template>
  <button ref="myButton">click me</button>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const myButton = ref(null)

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      console.log(myButton.value) // <button>click me</button>
    })

    return {
      myButton
    }
  }
}
</script>
```

위 코드에서 알 수 있는 점은 템플릿 표현식의 `ref`도 여태까지 살펴봤었던 `ref()` API와 동일한 속성으로 취급된다는 것입니다.