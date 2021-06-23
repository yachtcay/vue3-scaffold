<template>
  <a-button @click="handleClick">Test</a-button>
</template>

<script>
import { throttle } from '@/utils/helper'

export default {
  name: 'Home',
  components: {
  },
  created() {
  },
  methods: {
    handleClick: throttle.call(this, function () {
      console.log(this)
    })
  }
}
</script>
