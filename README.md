# [WIP]slintml

```html
<template>
  <VerticalBox>
    <Text>{{counter}}</Text>
    <Button @click="add">
      add
    </Button>
  </VerticalBox>
</template>

<script>
import {ref} from 'slintml'

export default {
  name: 'app',
  setup() {
    const counter = ref(40)
    function add() {
      counter.value++
    }
    return {
      counter,
      add
    }
  }
}
</script>
```
