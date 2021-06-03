<template>
  <a-checkbox v-model:checked="checked">Checkbox</a-checkbox>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      checked: ref(false)
    }
  }
})
</script>
