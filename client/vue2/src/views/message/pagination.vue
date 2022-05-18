<template>
  <ul class="mt-pagination">
    <li class="mt-pagination__item"
        :class="{'is-disabled': 1 === currentPage}"
        @click="setCurrentPage('prev')">
      <slot name="prev">
        <i class="tm-icon-arrow_left"></i>
      </slot>
    </li>
    <li class="mt-pagination__item"
        :key="pager"
        v-for="pager in leftPagers"
        :class="{'is-active': pager === currentPage}"
        @click="setCurrentPage(pager)">
      {{pager}}
    </li>
    <li class="mt-pagination__item"
        v-if="showPrevMore"
        @mouseenter="quickprevIconName = 'tm-icon-db-arrow_left'"
        @mouseleave="quickprevIconName = 'tm-icon-more'"
        @click="setCurrentPage('prevMore')">
      <i class="mt-pagination__icon" :class="quickprevIconName"></i>
    </li>
    <li class="mt-pagination__item"
        :key="pager"
        v-for="pager in pagers"
        :class="{'is-active': pager === currentPage}"
        @click="setCurrentPage(pager)">
      {{pager}}
    </li>
    <li class="mt-pagination__item"
        v-if="showNextMore"
        @mouseenter="quicknextIconName = 'tm-icon-db-arrow_right'"
        @mouseleave="quicknextIconName = 'tm-icon-more'"
        @click="setCurrentPage('nextMore')">
      <i class="mt-pagination__icon"  :class="quicknextIconName"></i>
    </li>
    <li class="mt-pagination__item"
        :key="pager"
        v-for="pager in rightPagers"
        :class="{'is-active': pager === currentPage}"
        @click="setCurrentPage(pager)">
      {{pager}}
    </li>
    <li class="mt-pagination__item"
        :class="{'is-disabled': pageSize === currentPage}"
        @click="setCurrentPage('next')">
      <slot name="next">
        <i class="tm-icon-arrow_right"></i>
      </slot>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'MtPagination',

    props: {
      currentPage: Number,
      pageSize: Number,
      pageRange: {
        type: Number,
        default: 5
      },
      edgePages: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        quickprevIconName: 'tm-icon-more',
        quicknextIconName: 'tm-icon-more',
        showPrevMore: false,
        showNextMore: false
      }
    },
    watch: {
      showPrevMore (val) {
        if (!val) this.quickprevIconName = 'tm-icon-more'
      },
      showNextMore (val) {
        if (!val) this.quicknextIconName = 'tm-icon-more'
      }
    },
    computed: {
      pagers () {
        const pageRange = Number(this.pageRange)
        const edgePages = Number(this.edgePages)
        const currentPage = Number(this.currentPage)
        const pageSize = Number(this.pageSize)
        const pagerCount = pageRange + edgePages * 2
        let showPrevMore = false
        let showNextMore = false
        if (pageSize > pagerCount) {
          const half = Math.ceil(pagerCount / 2) - 1
          if (currentPage > pagerCount - half) {
            showPrevMore = true
          }
          if (currentPage < pageSize - half) {
            showNextMore = true
          }
        }
        const pages = []
        if (showPrevMore && !showNextMore) {
          const startPage = pageSize - (pagerCount - 2)
          for (let i = startPage + 1; i <= pageSize - edgePages; i++) {
            pages.push(i)
          }
        } else if (!showPrevMore && showNextMore) {
          for (let i = edgePages + 1; i <= pagerCount - edgePages; i++) {
            pages.push(i)
          }
        } else if (showPrevMore && showNextMore) {
          const offset = Math.ceil(pagerCount / 2) - 1 - edgePages
          const endPage = pagerCount % 2 === 1
            ? currentPage + offset
            : currentPage + offset + 1
          for (let i = currentPage - offset; i <= endPage; i++) {
            pages.push(i)
          }
        } else {
          for (let i = edgePages + 1; i <= pageSize - edgePages; i++) {
            pages.push(i)
          }
        }
        this.showPrevMore = showPrevMore
        this.showNextMore = showNextMore
        return pages
      },
      leftPagers () {
        const edgePages = this.edgePages
        const pageSize = this.pageSize
        const pages = []
        if (pageSize < edgePages) {
          for (let i = 1; i <= pageSize; i++) {
            pages.push(i)
          }
        } else {
          for (let i = 1; i <= edgePages; i++) {
            pages.push(i)
          }
        }
        return pages
      },
      rightPagers () {
        const edgePages = this.edgePages
        const pageSize = this.pageSize
        const pages = []
        if (pageSize < edgePages * 2) {
          for (let i = edgePages + 1; i <= pageSize; i++) {
            pages.push(i)
          }
        } else {
          for (let i = pageSize - edgePages + 1; i <= pageSize; i++) {
            pages.push(i)
          }
        }
        return pages
      }
    },
    methods: {
      setCurrentPage (pager) {
        let newPage = this.currentPage
        const pageRange = this.pageRange
        if (typeof pager === 'string' && isNaN(Number(pager))) { // 如果是 < 或 > 或 ...
          switch (pager) {
            case 'prev':
              newPage--
              break
            case 'next':
              newPage++
              break
            case 'prevMore':
              newPage -= pageRange
              break
            case 'nextMore':
              newPage += pageRange
              break
            default:
              break
          }
        } else {
          newPage = Number(pager)
        }
        if (!isNaN(newPage)) {
          if (newPage < 1) {
            newPage = 1
          }
          if (newPage > this.pageSize) {
            newPage = this.pageSize
          }
        }
        if (newPage !== this.currentPage) {
          this.$emit('change', newPage)
        }
      }
    }
  }
</script>

<style lang="postcss">
  @import "../../styles/postcss/pagination.css";
</style>
