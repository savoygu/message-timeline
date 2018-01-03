<template>
  <div class="tm-message">
    <publish :page-total="pageTotal" :emojies="emojies" @publish="handlePublish"></publish>
    <template v-if="!loading">
      <timeline :messages="messages" :page-total="pageTotal"
                :current-page="currentPage"
                :adding="adding"></timeline>
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
        adding: false,
        effect: Math.ceil(Math.random() * 10),
        emojies: []
      }
    },

    methods: {
      handlePublish ({message}) {
        message.content = this.replaceEmoji(message.content)
        this.messages.unshift(message)
        this.pageTotal++
        this.adding = true
        this.$nextTick(_ => {
          this.$children.filter(_ => _.$options.name === 'TmTimeline')[0].waterfall()
        })
      },

      handlePageChange (page) {
        this.currentPage = page
        this.getMessages()
      },

      getMessages () {
        this.loading = true
        fetch('/messages', {
          page_size: 32,
          current: this.currentPage
        }).then(res => {
          this.loading = false
          if (res.code === '01') {
            this.pageTotal = res.result.count
            this.messages = res.result.rows.map(item => {
              if (!item.content) {
                return item
              }
              item.content = this.replaceEmoji(this.emojies, item.content)
              if (item.reply) {
                item.reply.text = this.replaceEmoji(this.emojies, item.reply.text)
              }
              return item
            })
            this.pageCount = Math.ceil(this.pageTotal / 32)
            this.$nextTick(_ => {
              this.$children.filter(_ => _.$options.name === 'TmTimeline')[0].waterfall()
            })
          }
        })
      },

      getEmojies () {
        fetch('/emojies').then(res => {
          if (res.code === '01') {
            this.emojies = res.result.rows
          }
        })
      },

      replaceEmoji (emojies, content) {
        return content.replace(/\[q:(.{1,3})\]/g, function (match, p, offset, string) {
          let expression = emojies.filter(emoji => emoji.meaning === p)[0].expression
          return `<img src=${'//timeline.creation.gusaifei.com/emoji/expression/' + expression} title=${p} alt=${p}>`
        })
      }
    },

    mounted () {
      this.getEmojies()
      this.getMessages()
    }
  }
</script>

<style lang="postcss">
  @import "../styles/postcss/message.css";
</style>
