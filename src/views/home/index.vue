<template>
  <a-button @click="handleClick">Test</a-button>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  methods: {
    handleClick() {
      this.$router.push({
        name: 'Example'
      })
    }
  }
}
</script>
