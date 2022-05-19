<template>
  <div class="mt-message">
    <mt-publish :total-count="totalCount" :emojis="emojis" @publish="handlePublish"></mt-publish>
    <template v-if="!loading">
      <template v-if="messages.length > 0">
        <mt-timeline :messages="messages" :total-count="totalCount"
                  :current-page="currentPage">
        </mt-timeline>
        <div class="mt-message__pagination">
          <mt-pagination :total-page="totalPage" :current-page="currentPage" @change="handlePageChange"></mt-pagination>
        </div>
      </template>
      <p v-else class="mt-message__empty">开始你的第一次留言吧！</p>
    </template>
    <div v-else class="mt-message__loading">
      <mt-loading :loading="effect"></mt-loading>
    </div>
  </div>
</template>

<script>
  import MtLoading from '../../components/loading.vue'
  import MtPublish from './publish.vue'
  import MtTimeline from './timeline.vue'
  import MtPagination from './pagination.vue'
  import { fetch } from '@/http'
  import { timeAgo } from '@/utils/date'
  import emojis from '@/utils/emoji'

  const PAGE_SIZE = 32

  export default {
    name: 'MtMessage',

    components: {
      MtPublish,
      MtTimeline,
      MtPagination,
      MtLoading
    },

    inject: ['imgURL'],

    provide: {
      PAGE_SIZE
    },

    data () {
      this.effect = Math.ceil(Math.random() * 10)

      return {
        totalPage: 0,
        currentPage: 1,
        totalCount: 0,
        messages: [],
        loading: false
      }
    },

    methods: {
      handlePublish ({ message }) {
        message.content = this.replaceEmoji(this.emojis, message.content)
        if (message.location) {
          const { province, city } = message.location
          message.location = province + (province === city ? '' : ' · ' + city)
        }
        this.messages.unshift(message)
        this.totalCount++
      },

      handlePageChange (page) {
        this.currentPage = page
        this.getMessages()
      },

      async getMessages () {
        this.loading = true
        if (!this.emojis.length) {
          await this.getEmojis()
        }
        try {
          const res = await fetch('/messages', {
            page_size: PAGE_SIZE,
            current: this.currentPage
          })
          if (res.code === '01') {
            const { count, rows } = res.result
            this.totalCount = count
            this.messages = rows.map(item => {
              if (!item.content) return item
              item.content = this.replaceEmoji(this.emojis, item.content)
              item.createTime = timeAgo(item.createTime)
              if (item.reply) {
                const { text, time } = item.reply
                item.reply.text = this.replaceEmoji(this.emojis, text)
                item.reply.time = timeAgo(time)
              }
              if (item.location) {
                const { province, city } = item.location
                item.location = province + (province === city ? '' : ' · ' + city)
              }
              return item
            })
            this.totalPage = Math.ceil(count / PAGE_SIZE)
          }
        } catch (err) {
          console.log('[get messages]: ', err)
        } finally {
          this.loading = false
        }
      },

      async getEmojis () {
        const res = await fetch('/emojis')
        if (res.code === '01') {
          this.emojis = res.result.rows
        }
      },

      replaceEmoji (emojis, content) {
        return content.replace(/\[q:(.{1,3})\]/g, (match, p, offset, string) => {
          const expression = emojis.filter(emoji => emoji.meaning === p)[0].expression
          // return `<img src=${this.imgURL + '/emoji/' + expression} title=${p} alt=${p}>`
          return `<img src=${require('../../assets/emoji/' + expression)} title=${p} alt=${p}>`
        })
      }
    },

    created () {
      // 网络原因：使用本地 emojis 数据
      this.emojis = emojis

      this.getMessages()
    }
  }
</script>

<style lang="postcss">
  @import "../../styles/postcss/message.css";
</style>
