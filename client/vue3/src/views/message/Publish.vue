<script setup lang="ts">
import { computed, inject, reactive, ref } from 'vue'
import MtSwitch from '../../components/Switch.vue'
import { post } from '../../http'
import validate, { ValidateType } from '../../utils/validate'
import { EmojiItem, MessageItem, MessageForm, Response, ResponseCode } from '../../types'
import createToast from '../../components/toast'

const props = withDefaults(defineProps<{
  totalCount: number
  emojis: EmojiItem[]
}>(), {
  emojis: () => []
})

const emit = defineEmits<{
  (e: 'publish', message: MessageItem): void
}>()

// inject('imgURL')

const message: MessageForm = reactive({
  content: '',
  nickname: '',
  email: '',
  notice: true
})

const open = ref(false)
const publishing = ref(false)
const publish = ref(null)

const errorTip = computed(() => {
  return validate(message, {
    field: 'content',
    desc: '内容',
    validates: [ValidateType.EMPTY, [ValidateType.LENGTH, 100]]
  }) || validate(message, {
    field: 'nickname',
    desc: '个性昵称',
    validates: [ValidateType.EMPTY, [ValidateType.RANGE, [1, 18]]]
  }) || validate(message, {
    field: 'email',
    desc: '电子邮箱',
    validates: [ValidateType.EMPTY, [ValidateType.REGEXP, /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/]]
  }) || ''
})

async function handlePublishMessage() {
  if (errorTip.value) {
    createToast({ text: errorTip.value, appendTo: publish.value! })
    return
  }

  try {
    publishing.value = true
    const res = await post<Response<MessageItem>>('/message', message)
    if (res?.code === ResponseCode.SUCCESS) {
      emit('publish', res?.result)
      message.email = message.nickname = message.content = ''
    }
  } catch (err) {
    console.log('[publish message]:', err)
  } finally {
    publishing.value = false
  }
}

function handleEmojiClick(emoji: EmojiItem) {
  message.content += `[q:${emoji.meaning}]`
  open.value = false
}

function getImageUrl(emoji: EmojiItem) {
  return new URL(`/src/assets/emoji/${emoji.expression}`, import.meta.url).href
}
</script>

<template>
  <div class="mt-publish" ref="publish">
    <div class="mt-publish__header">
      <h3 class="mt-publish__title">说点什么吧~</h3>
      <span class="mt-publish__message">共 <strong class="mt-publish_count">{{ totalCount }}</strong> 条留言</span>
      <div class="mt-publish__notice">
        <MtSwitch off-lever-bg-color="#fdfdfd" on-lever-bg-color="#6bc30d" off-bg-color="#fdfdfd" on-bg-color="#fdfdfd"
          off-text-color="#6bc30d" on-text-color="#6bc30d" v-model="message.notice">
          回复邮件时通知我
        </MtSwitch>
      </div>
    </div>
    <div class="mt-publish__form">
      <div class="mt-publish__writing">
        <textarea v-model="message.content" class="mt-publish__textarea" rows="4" placeholder="留点空白给你说~"></textarea>
      </div>
      <div class="mt-publish__footer">
        <div class="mt-publish__emoji">
          <div class="mt-dropdown">
            <div class="mt-dropdown__toggle" :class="{ 'active': open }" @click="open = !open">
              <i class="mt-dropdown__icon tm-icon-smile"></i>
            </div>
            <div class="mt-dropdown__body" :class="{ 'is-open': open }">
              <ul class="mt-dropdown__emojis">
                <li class="mt-dropdown__emoji" v-for="(emoji, index) in emojis" :key="index"
                  @click="handleEmojiClick(emoji)" :title="emoji.meaning">
                  <!-- <img :src="`${imgURL}/emoji/${emoji.expression}`" :alt="emoji.meaning"> -->
                  <img :src="getImageUrl(emoji)" :alt="emoji.meaning">
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mt-publish__fields">
          <label class="mt-publish__field mo-tipsy--top-left" data-tipsy="必填：怎么称呼您？">
            <input v-model="message.nickname" name="nickname" type="text" class="mt-publish__control" maxlength="40"
              placeholder="个性昵称">
          </label>
          <label class="mt-publish__field mo-tipsy--top-left" data-tipsy="必填：用于获取头像和联系您">
            <input v-model="message.email" name="email" type="text" class="mt-publish__control" maxlength="40"
              placeholder="电子邮箱">
          </label>
          <label class="mt-publish__field">
            <button class="mt-publish__btn" :class="{ 'is-disabled': !!errorTip }" @click="handlePublishMessage">{{
                publishing
                  ? '发布中..' : '发布'
            }}</button>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../styles/common/tipsy.scss';
@import "../../styles/message/publish.scss";

@include b(mt-publish) {

  @include e(emoji) {
    float: left;
  }
}

@include b(mt-dropdown) {
  position: relative;

  @include e(toggle) {
    display: inline-block;
    color: #9c9d9b;
    padding-bottom: .5rem;
    cursor: pointer;

    &:hover,
    &.active {
      color: #fa0;
    }
  }

  @include e(icon) {
    font-size: 20px;
  }

  @include e(body) {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    margin: .125rem 0 0;
    text-align: left;
    background-color: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .12), 0 1px 4px rgba(0, 0, 0, .12);
    transition: all .3s;

    @include is(open) {
      display: block;
    }
  }

  @include e(emojis) {
    width: 16.5rem;
    margin: 0;
    padding: .5rem;
    list-style: none;
    font-size: 0;
    white-space: pre-wrap;
  }

  @include e(emoji) {
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
</style>
