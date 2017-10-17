<template>
  <div class="tm-timeline">
    <div class="tm-timeline__box" v-for="(message, index) in messages">
      <div class="tm-timeline__message">
        <h5 class="tm-timeline__title">
          <strong class="tm-timeline__nickname">{{message.nick}}</strong>
          <div class="tm-timeline__info">
            <span class="tm-timeline__floor">{{pageTotal - index}}楼</span>&ensp;|&ensp;<span class="time-timeline__time">刚刚</span>
          </div>
        </h5>
        <div class="tm-timeline__content">{{message.contents}}</div>
        <p class="tm-timeline__position">
          <span
            class="tm-timeline__city">{{message.location.province + (message.location.province === message.location.city ? '' : ' · ' + message.location.city)}}</span>
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
  import {fetch} from '@/http'

  export default {
    name: 'TmTimeline',

    data () {
      return {
        messages: [],
        currentPage: 1,
        pageTotal: 0,
        pageCount: 0
      }
    },

    methods: {
      getMessages () {
        fetch('/api/comment/message', {
          limit: 32,
          page: 1
        }).then(res => {
          if (res.code === 200) {
            this.pageTotal = res.data.count
            this.messages = res.data.list
            this.pageCount = Math.ceil(this.pageTotal / 32)
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
  @import "../../styles/postcss/timeline.css";
</style>
