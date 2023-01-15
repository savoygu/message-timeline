<script lang="ts" setup>
import { inject, nextTick, onBeforeMount, onBeforeUnmount, ref, watch, watchEffect } from 'vue'
import { addClass, off, on, removeClass } from '@/utils/dom'
import type { MessageItem } from '@/types'

const props = withDefaults(defineProps<{
  messages: MessageItem[]
  totalCount: number
  currentPage: number
}>(), {
  messages: () => [],
})

const PAGE_SIZE = inject<number>('PAGE_SIZE')

const timeline = ref(null)

function waterfall() {
  if (!timeline.value)
    return
  const timelineEl: HTMLElement = timeline.value
  const boxes = timelineEl.querySelectorAll<HTMLElement>('.mt-timeline__box')
  const clientWidth = document.documentElement.clientWidth || document.body.clientWidth
  if (clientWidth + 17 <= 760) {
    let colHeight = 0
    for (let i = 0, length = boxes.length; i < length; i++) {
      const box = boxes[i]
      // box.style = ''
      colHeight += box.offsetHeight
      removeClass(box, 'is-right')
    }
    timelineEl.style.height = `${colHeight}px`
  }

  const colsHeight = []
  for (let i = 0, length = boxes.length; i < length; i++) {
    const box = boxes[i]
    if (i < 2) {
      colsHeight.push(box.offsetHeight + 20)
      if (i === 1)
        addClass(box, 'is-right')
    }
    else {
      const minColHeight = Math.min(...colsHeight)
      const minColIndex = colsHeight.indexOf(minColHeight)
      box.style.position = 'absolute'
      box.style.top = `${minColHeight}px`
      box.style.left = minColIndex % 2 === 1 ? '50%' : '0'
      if (minColIndex % 2 === 1)
        addClass(box, 'is-right')

      else
        removeClass(box, 'is-right')

      colsHeight[minColIndex] += box.offsetHeight
    }
  }
  timelineEl.style.height = `${Math.max(...colsHeight)}px`
}

watchEffect(() => {
  if (props.messages.length > 0) {
    nextTick(() => {
      waterfall()
    })
  }
})

// watch(() => props.messages.length, (length) => {
//   if (length > 0) {
//     nextTick(() => {
//       waterfall()
//     })
//   }
// }, {
//   immediate: true,
// })

onBeforeMount(() => {
  on(window, 'resize', waterfall)
})

onBeforeUnmount(() => {
  off(window, 'resize', waterfall)
})
</script>

<template>
  <div ref="timeline" class="mt-timeline">
    <div v-for="(message, index) in messages" :key="message._id" class="mt-timeline__box">
      <div class="mt-timeline__message">
        <h5 class="mt-timeline__title">
          <strong class="mt-timeline__nickname">{{ message.nickname }}</strong>
          <div class="mt-timeline__info">
            <span class="mt-timeline__floor">{{ (totalCount - (currentPage - 1) * PAGE_SIZE!) - index
            }}楼</span>&ensp;|&ensp;<span class="time-timeline__time">{{ message.createTime }}</span>
          </div>
        </h5>
        <div class="mt-timeline__content" v-html="message.content" />
        <p class="mt-timeline__position">
          <span class="mt-timeline__city">{{ message.location?.province + (message.location?.province
            === message.location?.city ? '' : ` · ${message.location?.city}`)
          }}</span>
        </p>
        <div v-if="message.reply" class="mt-timeline__reply">
          <strong class="mt-timeline__reply-text">回复：</strong>
          <span class="mt-timeline__reply-content" v-html="message.reply.text" />
          &ensp;/&ensp;
          <span class="mt-timeline__reply-time">{{ message.reply.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../styles/message/timeline.scss";
</style>
