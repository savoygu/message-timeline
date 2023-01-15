<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  currentPage: number
  totalPage: number
  pageRange?: number
  edgePages?: number
}>(), {
  pageRange: 5,
  edgePages: 1,
})

const emit = defineEmits<{
  (e: 'change', page: number): void
}>()

const quickprevIconName = ref('tm-icon-more')
const quicknextIconName = ref('tm-icon-more')
const showPrevMoreRef = ref(false)
const showNextMoreRef = ref(false)
const pagers = ref<number[]>([])

watch(() => props, () => {
  const { currentPage, totalPage, pageRange, edgePages } = props
  const pagerCount = pageRange + edgePages * 2
  let showPrevMore = false
  let showNextMore = false
  if (totalPage > pagerCount) {
    const half = Math.ceil(pagerCount / 2) - 1
    if (currentPage > pagerCount - half)
      showPrevMore = true

    if (currentPage < totalPage - half)
      showNextMore = true
  }
  const pages = []
  if (showPrevMore && !showNextMore) {
    const startPage = totalPage - (pagerCount - 2)
    for (let i = startPage + 1; i <= totalPage - edgePages; i++)
      pages.push(i)
  }
  else if (!showPrevMore && showNextMore) {
    for (let i = edgePages + 1; i <= pagerCount - edgePages; i++)
      pages.push(i)
  }
  else if (showPrevMore && showNextMore) {
    const offset = Math.ceil(pagerCount / 2) - 1 - edgePages
    const endPage = pagerCount % 2 === 1
      ? currentPage + offset
      : currentPage + offset + 1
    for (let i = currentPage - offset; i <= endPage; i++)
      pages.push(i)
  }
  else {
    for (let i = edgePages + 1; i <= totalPage - edgePages; i++)
      pages.push(i)
  }

  showPrevMoreRef.value = showPrevMore
  showNextMoreRef.value = showNextMore
  pagers.value = pages
}, {
  immediate: true,
  deep: true,
})
const leftPagers = computed(() => {
  const { totalPage, edgePages } = props
  const pages = []
  if (totalPage < edgePages) {
    for (let i = 1; i <= totalPage; i++)
      pages.push(i)
  }
  else {
    for (let i = 1; i <= edgePages; i++)
      pages.push(i)
  }
  return pages
})
const rightPagers = computed(() => {
  const { totalPage, edgePages } = props
  const pages = []
  if (totalPage < edgePages * 2) {
    for (let i = edgePages + 1; i <= totalPage; i++)
      pages.push(i)
  }
  else {
    for (let i = totalPage - edgePages + 1; i <= totalPage; i++)
      pages.push(i)
  }
  return pages
})

// Methods
function setCurrentPage(pager: 'prev' | 'next' | 'prevMore' | 'nextMore' | number) {
  const { currentPage, totalPage: pageSize, pageRange } = props
  let page = currentPage

  switch (pager) {
    case 'prev':
      page--
      break
    case 'next':
      page++
      break
    case 'prevMore':
      page -= pageRange
      break
    case 'nextMore':
      page += pageRange
      break
    default:
      page = pager
      break
  }

  if (page < 1)
    page = 1

  else if (page > pageSize)
    page = pageSize

  if (page !== currentPage)
    emit('change', page)
}
</script>

<template>
  <ul class="mt-pagination">
    <li class="mt-pagination__item" :class="{ 'is-disabled': 1 === currentPage }" @click="setCurrentPage('prev')">
      <slot name="prev">
        <i class="tm-icon-arrow_left" />
      </slot>
    </li>
    <li
      v-for="pager in leftPagers" :key="pager" class="mt-pagination__item"
      :class="{ 'is-active': pager === currentPage }" @click="setCurrentPage(pager)"
    >
      {{ pager }}
    </li>
    <li
      v-if="showPrevMoreRef" class="mt-pagination__item" @mouseenter="quickprevIconName = 'tm-icon-db-arrow_left'"
      @mouseleave="quickprevIconName = 'tm-icon-more'" @click="setCurrentPage('prevMore')"
    >
      <i class="mt-pagination__icon" :class="quickprevIconName" />
    </li>
    <li
      v-for="pager in pagers" :key="pager" class="mt-pagination__item" :class="{ 'is-active': pager === currentPage }"
      @click="setCurrentPage(pager)"
    >
      {{ pager }}
    </li>
    <li
      v-if="showNextMoreRef" class="mt-pagination__item" @mouseenter="quicknextIconName = 'tm-icon-db-arrow_right'"
      @mouseleave="quicknextIconName = 'tm-icon-more'" @click="setCurrentPage('nextMore')"
    >
      <i class="mt-pagination__icon" :class="quicknextIconName" />
    </li>
    <li
      v-for="pager in rightPagers" :key="pager" class="mt-pagination__item"
      :class="{ 'is-active': pager === currentPage }" @click="setCurrentPage(pager)"
    >
      {{ pager }}
    </li>
    <li
      class="mt-pagination__item" :class="{ 'is-disabled': totalPage === currentPage }"
      @click="setCurrentPage('next')"
    >
      <slot name="next">
        <i class="tm-icon-arrow_right" />
      </slot>
    </li>
  </ul>
</template>

<style lang="scss">
@import "../../styles/message/pagination.scss";
</style>
