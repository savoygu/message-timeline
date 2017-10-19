<template>
  <div class="tm-message">
    <publish :page-total="pageTotal"></publish>
    <template v-if="!loading">
      <timeline :messages="messages" :page-total="pageTotal"
                :current-page="currentPage"></timeline>
      <div class="tm-message__pagination">
        <pagination :page-count="pageCount" :current-page="currentPage" @change="handlePageChange"></pagination>
      </div>
    </template>
    <div v-else class="tm-message__loading">
      <dw-loading :loading="effect"></dw-loading>
    </div>
  </div>
</template>

<script>
  import {fetch} from '@/http'
  import Loading from './loading.vue'
  import Publish from './message/publish.vue'
  import Timeline from './message/timeline.vue'
  import Pagination from './message/pagination.vue'

  export default {
    name: 'TmMessage',

    components: {
      Publish,
      Timeline,
      Pagination,
      'dw-loading': Loading
    },

    data () {
      return {
        pageCount: 0,
        currentPage: 1,
        pageTotal: 0,
        messages: [],
        loading: false,
        effect: Math.ceil(Math.random() * 10)
      }
    },

    methods: {
      handlePageChange (page) {
        this.currentPage = page
        this.getMessages()
      },

      getMessages () {
        this.loading = true
        fetch('/api/comment/message', {
          limit: 32,
          page: this.currentPage
        }).then(res => {
          this.loading = false
          if (res.code === 200) {
            this.pageTotal = res.data.count
            this.messages = res.data.list
            this.pageCount = Math.ceil(this.pageTotal / 32)
            this.$nextTick(_ => {
              this.$children.filter(_ => _.$options.name === 'TmTimeline')[0].waterfall()
            })
          }
        })
      }
    },

    mounted () {
      this.getMessages()
    }
  }
</script>

<style lang="postcss">
  @import "../styles/postcss/message.css";
</style>
