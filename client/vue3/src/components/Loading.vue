<script setup lang="ts">
const { type } = withDefaults(defineProps<{
  type?: number
}>(), {
  type: 1,
})
</script>

<template>
  <div class="mt-loading" :class="`mt-loading__preloader_${type}`">
    <template v-if="[1, 4, 8].includes(type)">
      <span v-for="i in 5" :key="i" />
    </template>
    <template v-if="[2, 5, 6].includes(type)">
      <span v-for="i in 4" :key="i" />
    </template>
    <template v-if="type === 7">
      <span />
      <span />
    </template>
    <template v-if="type === 10">
      <span v-for="i in 9" :key="i" />
    </template>
  </div>
</template>

<style lang="scss">
@import "../styles/components/loading.scss";
</style>
