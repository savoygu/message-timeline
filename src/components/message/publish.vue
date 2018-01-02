<template>
  <div class="tm-publish">
    <div class="tm-publish__header">
      <h3 class="tm-publish__title">说点什么吧~</h3>
      <span class="tm-publish__message">共 <strong class="tm-publish_count">{{pageTotal}}</strong> 条留言</span>
      <div class="tm-publish__notice"><tm-switch
        off-lever-color="#fdfdfd"
        on-lever-color="#6bc30d"
        off-bg-color="#fdfdfd"
        on-bg-color="#fdfdfd"
        off-color="#6bc30d"
        on-color="#6bc30d"
        v-model="notice">回复邮件时通知我</tm-switch></div>
    </div>
    <div class="tm-publish__form">
      <div class="tm-publish__writing">
        <textarea v-model="content" class="tm-publish__textarea" rows="4" placeholder="留点空白给你说~"></textarea>
      </div>
      <div class="tm-publish__footer">
        <div class="tm-publish__emoji">
          <div class="tm-dropdown">
            <div class="tm-dropdown__toggle" :class="{'active': open}" @click="open = !open">
              <i class="tm-dropdown__icon tm-icon-smile"></i>
            </div>
            <div class="tm-dropdown__body" :class="{'is-open': open}">
              <ul class="tm-dropdown__emojies">
                <li class="tm-dropdown__emoji"
                  v-for="(emoji, index) in emojies"
                  :key="index"
                  @click="handleEmojiClick(emoji, index)"
                  :title="emoji.meaning">
                  <img :src="`//timeline.creation.gusaifei.com/emoji/expression/${emoji.expression}`" :alt="emoji.meaning">
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="tm-publish__fields">
          <label class="tm-publish__field mo-tipsy--top-left" data-tipsy="必填：怎么称呼您？">
            <input v-model="nickname"
              name="nickname"
              type="text"
              class="tm-publish__control"
              maxlength="40"
              placeholder="个性昵称">
          </label>
          <label class="tm-publish__field mo-tipsy--top-left" data-tipsy="必填：用于获取头像和联系您">
            <input v-model="email"
              name="email"
              type="text"
              class="tm-publish__control"
              maxlength="40"
              placeholder="电子邮箱">
          </label>
          <label class="tm-publish__field">
            <button class="tm-publish__btn" :class="{ 'is-disabled': isDisabled}" @click="publishMessage">发布</button>
          </label>
        </div>
      </div>
    </div>
    <toast ref="tip" :text="isDisabled" :show="show" :duration="2000"></toast>
  </div>
</template>

<script>
import { post } from '@/http'
import Toast from '../toast.vue'
import Switch from '../switch.vue'

export default {
  name: 'TmPublish',

  props: {
    pageTotal: Number,
    emojies: {
      type: Array,
      default () {
        return []
      }
    }
  },

  components: {
    Toast,
    'tm-switch': Switch
  },

  data () {
    return {
      content: '',
      nickname: '',
      email: '',
      show: false,
      notice: true,
      open: false
    }
  },

  computed: {
    isDisabled () {
      return this.validateContent(this.content) ||
        this.validateNickname(this.nickname) ||
        this.validateEmail(this.email) || ''
    }
  },

  methods: {
    validateContent (val) {
      if (!val) return '内容不能为空'
      if (val.length > 100) return '内容长度不能超过100字'
    },
    validateNickname (val) {
      if (!val) return '个性昵称不能为空'
      if (val.length < 1 || val.length > 18) return '个性昵称长度只能在1~18之间'
    },
    validateEmail (val) {
      if (!val) return '电子邮箱不能为空'
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val)) return '电子邮箱格式不正确'
    },

    publishMessage () {
      if (this.isDisabled) {
        this.$refs.tip.open()
        return
      }
      post('/message', {
        nickname: this.nickname,
        content: this.content,
        email: this.email,
        notice: this.notice
      }).then(res => {
        if (res.code === '01') {
          this.$emit('publish', { message: res.result })
          this.email = this.nickname = this.content = ''
        }
      })
    },

    handleEmojiClick (emoji, index) {
      this.content += `[q:${emoji.meaning}]`
      this.open = false
    }
  }
}
</script>

<style lang="postcss">
@import "../../styles/postcss/publish.css";
@component-namespace tm {
  @b publish {

    @e emoji {
      float: left;
    }
  }
  @b dropdown {
    position: relative;

    @e toggle {
      color: #9c9d9b;
      padding-bottom: .5rem;
      cursor: pointer;

      &:hover,
      &.active {
        color: #fa0;
      }
    }

    @e icon {
      font-size: 20px;
    }

    @e body {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      display: none;
      margin: .125rem 0 0;
      text-align: left;
      background-color: #fff;
      box-shadow: 0 1px 6px rgba(0,0,0,.12), 0 1px 4px rgba(0,0,0,.12);
      transition: all .3s;

      @when open {
        display: block;
      }
    }

    @e emojies {
      width: 16.5rem;
      margin: 0;
      padding: .5rem;
      list-style: none;
      font-size: 0;
      white-space: pre-wrap;
    }

    @e emoji {
      display: inline-flex;
      width: 2rem;
      height: 2rem;
      align-items: center;
      justify-content: center;
      margin-left: -1px;
      margin-top: -1px;
      border: 1px solid #f2f2f1;
      cursor: pointer;
    }
  }
}
</style>
