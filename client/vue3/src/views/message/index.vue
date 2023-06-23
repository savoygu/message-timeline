<script setup lang="ts">
import { inject, onMounted, reactive, ref } from 'vue'

import MtLoading from '@/components/Loading.vue'
import MtPagination from '@/components/Pagination.vue'
import { useRequest } from '@/composables/useRequest'
import type { Emoji, Message, Page, Response } from '@/types'
import { ResponseCode } from '@/types'
import { timeAgo } from '@/utils/date'
import emojis from '@/utils/emoji'

import MtPublish from './Publish.vue'
import MtTimeline from './Timeline.vue'

interface MessagesPage {
  list: Message[]
  totalPage: number
  totalCount: number
  currentPage: number
}

const effect = Math.ceil(Math.random() * 10)

// Reactive
const messagePage = reactive<MessagesPage>({
  list: [], // 留言列表
  totalPage: 0, // 总页数
  totalCount: 0, // 总条数
  currentPage: 1, // 当前页码
})
const emojisRef = ref<Emoji[]>([])
const loading = ref(false)

const PAGE_SIZE = inject<number>('PAGE_SIZE')

// Lifecycle
onMounted(() => {
  fetchMessages()
})

// Methods
function handlePublish(message: Message) {
  message.content = replaceEmoji(emojis, message.content)
  message.createTime = timeAgo(message.createTime)
  messagePage.totalCount++

  const { currentPage, totalPage: prevTotalPage } = messagePage
  const nextTotalPage = messagePage.totalPage = Math.ceil(messagePage.totalCount / PAGE_SIZE!)
  // 当前页码位于最后一页时，并且最后一页已满
  if (currentPage === prevTotalPage && nextTotalPage > currentPage) {
    messagePage.currentPage++
    messagePage.list = [message]
  }
  else {
    messagePage.list.unshift(message)
  }
}

function handlePageChange(page: number) {
  messagePage.currentPage = page
  fetchMessages()
}

async function fetchMessages() {
  loading.value = true
  if (!emojis.length)
    await fetchEmojis()

  try {
    const res = await useRequest<Response<Page<Message>>>('/messages', {
      page_size: PAGE_SIZE,
      current: messagePage.currentPage,
    })
    if (res?.code === ResponseCode.SUCCESS) {
      const { count, rows } = res.result
      messagePage.totalCount = count
      messagePage.list = rows.map((item) => {
        if (!item.content)
          return item
        item.content = replaceEmoji(emojis, item.content)
        item.createTime = timeAgo(item.createTime)
        if (item.reply) {
          const { text, time } = item.reply
          item.reply.text = replaceEmoji(emojis, text)
          item.reply.time = timeAgo(time)
        }
        return item
      })
      messagePage.totalPage = Math.ceil(count / PAGE_SIZE!)
    }
  }
  catch (err) {
    console.error('[get messages]: ', err)
  }
  finally {
    loading.value = false
  }
}

async function fetchEmojis() {
  const res = await useRequest<Response<Page<Emoji>>>('/emojis')
  if (res?.code === ResponseCode.SUCCESS)
    emojisRef.value = res.result.rows
}

function replaceEmoji(emojis: Emoji[], content: string) {
  return content.replace(/\[q:(.{1,3})\]/g, (match, p) => {
    const emoji = emojis.find(emoji => emoji.meaning === p)
    // return `<img src=${this.imgURL + '/emoji/' + expression} title=${p} alt=${p}>`
    return `<img src="${getImageUrl(emoji!)}" title=${p} alt=${p}>`
  })
}

function getImageUrl(emoji: Emoji) {
  return new URL(`/src/assets/emoji/${emoji.expression}`, import.meta.url).href
}
</script>

<template>
  <div class="mt-message">
    <MtPublish :total-count="messagePage.totalCount" :emojis="emojis" @publish="handlePublish" />
    <template v-if="!loading">
      <template v-if="messagePage.list.length > 0">
        <MtTimeline :messages="messagePage.list" :total-count="messagePage.totalCount" :current-page="messagePage.currentPage" />
        <div class="mt-message__pagination">
          <MtPagination :total-page="messagePage.totalPage" :current-page="messagePage.currentPage" @change="handlePageChange" />
        </div>
      </template>
      <p v-else class="mt-message__empty">
        开始你的第一次留言吧！
      </p>
    </template>
    <div v-else class="mt-message__loading">
      <MtLoading :type="effect" />
    </div>
  </div>
</template>

<style lang="scss">
@import "@/styles/message/index.scss";
</style>
