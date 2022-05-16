<template>
  <div class="mt-publish">
    <div class="mt-publish__header">
      <h3 class="mt-publish__title">说点什么吧~</h3>
      <span class="mt-publish__message">共 <strong class="mt-publish_count">{{totalPage}}</strong> 条留言</span>
      <div class="mt-publish__notice"><mt-switch
        off-lever-color="#fdfdfd"
        on-lever-color="#6bc30d"
        off-bg-color="#fdfdfd"
        on-bg-color="#fdfdfd"
        off-color="#6bc30d"
        on-color="#6bc30d"
        v-model="notice">回复邮件时通知我</mt-switch></div>
    </div>
    <div class="mt-publish__form">
      <div class="mt-publish__writing">
        <textarea v-model="content" class="mt-publish__textarea" rows="4" placeholder="留点空白给你说~"></textarea>
      </div>
      <div class="mt-publish__footer">
        <div class="mt-publish__emoji">
          <div class="mt-dropdown">
            <div class="mt-dropdown__toggle" :class="{'active': open}" @click="open = !open">
              <i class="mt-dropdown__icon tm-icon-smile"></i>
            </div>
            <div class="mt-dropdown__body" :class="{'is-open': open}">
              <ul class="mt-dropdown__emojis">
                <li class="mt-dropdown__emoji"
                  v-for="(emoji, index) in emojis"
                  :key="index"
                  @click="handleEmojiClick(emoji, index)"
                  :title="emoji.meaning">
                  <!-- <img :src="`${imgURL}/emoji/${emoji.expression}`" :alt="emoji.meaning"> -->
                  <img :src="require(`../../assets/emoji/${emoji.expression}`)" :alt="emoji.meaning">
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mt-publish__fields">
          <label class="mt-publish__field mo-tipsy--top-left" data-tipsy="必填：怎么称呼您？">
            <input v-model="nickname"
              name="nickname"
              type="text"
              class="mt-publish__control"
              maxlength="40"
              placeholder="个性昵称">
          </label>
          <label class="mt-publish__field mo-tipsy--top-left" data-tipsy="必填：用于获取头像和联系您">
            <input v-model="email"
              name="email"
              type="text"
              class="mt-publish__control"
              maxlength="40"
              placeholder="电子邮箱">
          </label>
          <label class="mt-publish__field">
            <button class="mt-publish__btn" :class="{'is-disabled': validateMsg}" @click="publishMessage">{{ publishing ? '发布中..' : '发布' }}</button>
          </label>
        </div>
      </div>
    </div>
    <mt-toast ref="tip" :text="validateMsg" v-model="showToast" :duration="2000"></mt-toast>
  </div>
</template>

<script>
import { post } from '@/http'
import MtToast from '../../components/toast.vue'
import MtSwitch from '../../components/switch.vue'

export default {
  name: 'MtPublish',

  props: {
    totalPage: Number,
    emojis: {
      type: Array,
      default: () => []
    }
  },

  inject: ['imgURL'],

  components: {
    MtToast,
    MtSwitch
  },

  data () {
    return {
      content: '',
      nickname: '',
      email: '',
      showToast: false,
      notice: true,
      open: false,
      publishing: false
    }
  },

  computed: {
    validateMsg () {
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

    async publishMessage () {
      if (this.validateMsg) {
        this.showToast = true
        return
      }
      try {
        this.publishing = true
        const res = await post('/message', {
          nickname: this.nickname,
          content: this.content,
          email: this.email,
          notice: this.notice
        })
        if (res.code === '01') {
          this.$emit('publish', { message: res.result })
          this.email = this.nickname = this.content = ''
        }
      } catch (err) {
        console.log('[publish message]:', err)
      } finally {
        this.publishing = false
      }
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
@component-namespace mt {
  @b publish {

    @e emoji {
      float: left;
    }
  }
  @b dropdown {
    position: relative;

    @e toggle {
      display: inline-block;
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

    @e emojis {
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
