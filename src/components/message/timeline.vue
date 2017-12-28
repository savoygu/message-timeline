<template>
  <div class="tm-timeline" ref="timeline">
    <div class="tm-timeline__box" v-for="(message, index) in messages" :key="index">
      <div class="tm-timeline__message">
        <h5 class="tm-timeline__title">
          <strong class="tm-timeline__nickname">{{message.nick}}</strong>
          <div class="tm-timeline__info">
            <span class="tm-timeline__floor">{{(pageTotal - (currentPage - 1) * 32) - index}}楼</span>&ensp;|&ensp;<span
            class="time-timeline__time">刚刚</span>
          </div>
        </h5>
        <div class="tm-timeline__content" v-html="message.contents"></div>
        <p class="tm-timeline__position">
          <span
            class="tm-timeline__city">{{ message.location ? (message.location.province + (message.location.province === message.location.city ? '' : ' · ' + message.location.city)) : ''}}</span>
        </p>
        <div class="tm-timeline__reply" v-if="message.reply">
          <strong class="tm-timeline__reply-text">Reply：</strong>
          <span class="tm-timeline__reply-content">{{message.reply.text}}</span>
          &ensp;/&ensp;
          <span class="tm-timeline__reply-time">09-18</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { off, on, addClass, removeClass } from '@/utils/dom'

  export default {
    name: 'TmTimeline',

    props: {
      messages: {
        type: Array,
        default () {
          return []
        }
      },
      pageTotal: Number,
      currentPage: Number
    },

    methods: {
      waterfall () {
        const timeline = this.$refs.timeline
        if (!timeline) return
        const boxes = timeline.querySelectorAll('.tm-timeline__box')
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
        let colsHeight = []
        for (let i = 0, length = boxes.length; i < length; i++) {
          if (i < 2) {
            colsHeight.push(boxes[i].offsetHeight + 20)
            if (i === 1) addClass(boxes[i], 'is-right')
          } else {
            let minColHeight = Math.min.apply(null, colsHeight)
            let minColIndex = colsHeight.indexOf(minColHeight)
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

    destoryed () {
      off(window, 'resize', this.waterfall)
    }
  }
</script>

<style lang="postcss">
  @import "../../styles/postcss/timeline.css";
</style>
