<template>
  <div class="mt-timeline" ref="timeline">
    <div class="mt-timeline__box" v-for="(message, index) in messages" :key="index">
      <div class="mt-timeline__message">
        <h5 class="mt-timeline__title">
          <strong class="mt-timeline__nickname">{{ message.nickname }}</strong>
          <div class="mt-timeline__info">
            <span class="mt-timeline__floor">{{ (totalCount - (currentPage - 1) * PAGE_SIZE) - index
            }}楼</span>&ensp;|&ensp;<span class="time-timeline__time">{{ message.createTime }}</span>
          </div>
        </h5>
        <div class="mt-timeline__content" v-html="message.content"></div>
        <p class="mt-timeline__position">
          <span class="mt-timeline__city">{{ message.location }}</span>
        </p>
        <div class="mt-timeline__reply" v-if="message.reply">
          <strong class="mt-timeline__reply-text">回复：</strong>
          <span class="mt-timeline__reply-content" v-html="message.reply.text"></span>
          &ensp;/&ensp;
          <span class="mt-timeline__reply-time">{{ message.reply.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { off, on, addClass, removeClass } from '@/utils/dom'

export default {
  name: 'MtTimeline',

  props: {
    messages: {
      type: Array,
      default: () => []
    },
    totalCount: Number,
    currentPage: Number
  },

  inject: ['PAGE_SIZE'],

  watch: {
    'messages.length': {
      handler (length) {
        if (length > 0) {
          this.$nextTick(() => {
            this.waterfall()
          })
        }
      },
      immediate: true
    }
  },

  methods: {
    waterfall () {
      const timeline = this.$refs.timeline
      if (!timeline) return
      const boxes = timeline.querySelectorAll('.mt-timeline__box')
      const clientWidth = document.documentElement.clientWidth || document.body.clientWidth
      if (clientWidth + 17 <= 760) {
        let colHeight = 0
        for (let i = 0, length = boxes.length; i < length; i++) {
          boxes[i].style = ''
          colHeight += boxes[i].offsetHeight
          removeClass(boxes[i], 'is-right')
        }
        timeline.style.height = colHeight + 'px'
        return
      }
      const colsHeight = []
      for (let i = 0, length = boxes.length; i < length; i++) {
        if (i < 2) {
          colsHeight.push(boxes[i].offsetHeight + 20)
          if (i === 1) addClass(boxes[i], 'is-right')
        } else {
          const minColHeight = Math.min.apply(null, colsHeight)
          const minColIndex = colsHeight.indexOf(minColHeight)
          boxes[i].style.position = 'absolute'
          boxes[i].style.top = minColHeight + 'px'
          boxes[i].style.left = minColIndex % 2 === 1 ? '50%' : '0'
          if (minColIndex % 2 === 1) {
            addClass(boxes[i], 'is-right')
          } else {
            removeClass(boxes[i], 'is-right')
          }
          colsHeight[minColIndex] += boxes[i].offsetHeight
        }
      }
      timeline.style.height = Math.max.apply(null, colsHeight) + 'px'
    }
  },

  created () {
    on(window, 'resize', this.waterfall)
  },

  beforeDestroy () {
    off(window, 'resize', this.waterfall)
  }
}
</script>

<style lang="postcss">
@import "../../styles/postcss/timeline.css";
</style>
