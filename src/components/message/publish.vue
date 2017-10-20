<template>
  <div class="tm-publish">
    <div class="tm-publish__header">
      <h3 class="tm-publish__title">说点什么吧~</h3>
      <span class="tm-publish__message">共 <strong class="tm-publish_count">{{pageTotal}}</strong> 条留言</span> {{dirty}}
      <div class="tm-publish__notice"></div>
    </div>
    <div class="tm-publish__form">
      <div class="tm-publish__writing">
        <textarea v-model="content" class="tm-publish__textarea" rows="4" placeholder="留点空白给你说~"></textarea>
      </div>
      <div class="tm-publish__footer">
        <div class="tm-publish__fields">
          <label class="tm-publish__field"><input v-model="nickname" name="nickname" type="text"
                                                  class="tm-publish__control" maxlength="40"
                                                  placeholder="个性昵称"></label>
          <label class="tm-publish__field"><input v-model="email" name="email" type="text" class="tm-publish__control"
                                                  maxlength="40"
                                                  placeholder="电子邮箱"></label>
          <label class="tm-publish__field">
            <button class="tm-publish__btn" :class="{ 'is-disabled': isDisabled}">发布</button>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TmPublish',

    props: {
      pageTotal: Number
    },

    data () {
      return {
        content: '',
        nickname: '',
        email: '',
        dirty: false
      }
    },

    computed: {
      isDisabled () {
        return this.validateContent(this.content) || this.validateNickname(this.nickname) || this.validateEmail(this.email)
      }
    },

    methods: {
      validateContent (val) {
        if (!val) return '内容不能为空'
        if (val.length > 100) return '内容长度不能超过100字'
      },
      validateNickname (val) {
        if (!val) return '个性昵称不能为空'
        if (val.length < 3 || val.length > 16) return '个性昵称长度只能在3~16之间'
      },
      validateEmail (val) {
        if (!val) return '电子邮箱不能为空'
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val)) return '电子邮箱格式不正确'
      }
    }
  }
</script>

<style lang="postcss">
  @import "../../styles/postcss/publish.css";
</style>
