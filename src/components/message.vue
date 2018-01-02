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

  const EMOJI = [
    { expression: '1.gif', meaning: '发呆' },
    { expression: '2.gif', meaning: '可爱' },
    { expression: '3.gif', meaning: '憨笑' },
    { expression: '4.gif', meaning: '坏笑' },
    { expression: '5.gif', meaning: '发怒' },
    { expression: '6.gif', meaning: '折磨' },
    { expression: '7.gif', meaning: '撇嘴' },
    { expression: '8.gif', meaning: '流泪' },
    { expression: '9.gif', meaning: '晕' },
    { expression: '10.gif', meaning: '糗大了' },
    { expression: '11.gif', meaning: '困' },
    { expression: '12.gif', meaning: '害羞' },
    { expression: '13.gif', meaning: '惊恐' },
    { expression: '14.gif', meaning: '可爱' },
    { expression: '15.gif', meaning: '色' },
    { expression: '16.gif', meaning: '得意' },
    { expression: '17.gif', meaning: '睡' },
    { expression: '18.gif', meaning: '调皮' },
    { expression: '19.gif', meaning: '亲嘴' },
    { expression: '20.gif', meaning: '疑问' },
    { expression: '21.gif', meaning: '闭嘴' },
    { expression: '22.gif', meaning: '奋斗' },
    { expression: '23.gif', meaning: '鄙视' },
    { expression: '24.gif', meaning: '快哭了' }
  ]

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
        emojies: EMOJI
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
              item.content = this.replaceEmoji(item.content)
              return item
            })
            this.pageCount = Math.ceil(this.pageTotal / 32)
            this.$nextTick(_ => {
              this.$children.filter(_ => _.$options.name === 'TmTimeline')[0].waterfall()
            })
          }
        })
      },

      replaceEmoji (content) {
        return content.replace(/\[q:(.{1,3})\]/g, function (match, p, offset, string) {
          let expression = EMOJI.filter(emoji => emoji.meaning === p)[0].expression
          return `<img src=${'//timeline.creation.gusaifei.com/emoji/expression/' + expression} title=${p} alt=${p}>`
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
