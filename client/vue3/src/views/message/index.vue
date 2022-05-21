
<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import MtLoading from '../../components/Loading.vue'
import MtPublish from './Publish.vue'
import MtTimeline from './Timeline.vue'
import MtPagination from './Pagination.vue'
import { fetch } from '../../http'
import { timeAgo } from '../../utils/date'
import emojis from '../../utils/emoji'
import { MessageItem, Response, ResponseResultWithCount, EmojiItem } from '../../types'

const effect = Math.ceil(Math.random() * 10)

const loading = ref(false)
const messages = ref<MessageItem[]>([])
const totalPage = ref(0) // 总页数
const totalCount = ref(0) // 总条数
const currentPage = ref(1) // 当前页
const emojisRef = ref<EmojiItem[]>([])

const PAGE_SIZE = inject<number>('PAGE_SIZE')

function handlePublish(message: MessageItem) {
  message.content = replaceEmoji(emojis, message.content)
  message.createTime = timeAgo(message.createTime)
  messages.value.unshift(message)
  totalCount.value++
}

function handlePageChange(page: number) {
  currentPage.value = page
  fetchMessages()
}

fetchMessages()
async function fetchMessages() {
  loading.value = true
  if (!emojis.length) {
    await fetchEmojis()
  }
  try {
    const res = await fetch<Response<ResponseResultWithCount<MessageItem>>>('/messages', {
      page_size: PAGE_SIZE,
      current: currentPage.value
    })
    if (res?.code === '01') {
      const { count, rows } = res.result
      totalCount.value = count
      messages.value = rows.map(item => {
        if (!item.content) return item
        item.content = replaceEmoji(emojis, item.content)
        item.createTime = timeAgo(item.createTime)
        if (item.reply) {
          const { text, time } = item.reply
          item.reply.text = replaceEmoji(emojis, text)
          item.reply.time = timeAgo(time)
        }
        return item
      })
      totalPage.value = Math.ceil(count / PAGE_SIZE!)
    }
  } catch (err) {
    console.log('[get messages]: ', err)
  } finally {
    loading.value = false
  }
}

async function fetchEmojis() {
  const res = await fetch<Response<ResponseResultWithCount<EmojiItem>>>('/emojis')
  if (res?.code === '01') {
    emojisRef.value = res.result.rows
  }
}

function replaceEmoji(emojis: EmojiItem[], content: string) {
  return content.replace(/\[q:(.{1,3})\]/g, (match, p, offset, string) => {
    const emoji = emojis.find(emoji => emoji.meaning === p)
    // return `<img src=${this.imgURL + '/emoji/' + expression} title=${p} alt=${p}>`
    return `<img src="${getImageUrl(emoji!)}" title=${p} alt=${p}>`
  })
}

function getImageUrl(emoji: EmojiItem) {
  return new URL(`/src/assets/emoji/${emoji.expression}`, import.meta.url).href
}
</script>

<template>
  <div class="mt-message">
    <MtPublish :total-count="totalCount" :emojis="emojis" @publish="handlePublish"></MtPublish>
    <template v-if="!loading">
      <template v-if="messages.length > 0">
        <MtTimeline :messages="messages" :total-count="totalCount" :current-page="currentPage">
        </MtTimeline>
        <div class="mt-message__pagination">
          <MtPagination :total-page="totalPage" :current-page="currentPage" @change="handlePageChange"></MtPagination>
        </div>
      </template>
      <p v-else class="mt-message__empty">开始你的第一次留言吧！</p>
    </template>
    <div v-else class="mt-message__loading">
      <MtLoading :type="effect"></MtLoading>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../styles/message/message.scss";
</style>
