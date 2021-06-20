<template>
  <div>example4</div>
  <div>
    <router-link :to="{ name: 'Example4List' }">List</router-link>
    <router-link :to="{ name: 'Example4Detail' }">Detail</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: 'Example4Layout'
}
</script>
