<template>
  <div class="mt-loading" :class="`mt-loading__preloader_${loading}`">
    <template v-if="loading === 1 || loading === 4 || loading === 8">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </template>
    <template v-if="loading === 2 || loading === 5 || loading === 6">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </template>
    <template v-if="loading === 7">
      <span></span>
      <span></span>
    </template>
    <template v-if="loading === 10">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'MtLoading',
    props: {
      loading: {
        type: Number,
        default: 1
      }
    }
  }
</script>

<style lang="postcss">
  @import "../styles/postcss/loading.css";
</style>
