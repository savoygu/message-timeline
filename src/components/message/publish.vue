<template>
  <div class="tm-publish">
    <div class="tm-publish__header">
      <h3 class="tm-publish__title">说点什么吧~</h3>
      <span class="tm-publish__message">共 <strong class="tm-publish_count">{{pageTotal}}</strong> 条留言</span>
      <div class="tm-publish__notice"></div>
    </div>
    <div class="tm-publish__form">
      <div class="tm-publish__writing">
        <textarea class="tm-publish__textarea" rows="4" placeholder="留点空白给你说~"></textarea>
      </div>
      <div class="tm-publish__footer">
        <div class="tm-publish__fields">
          <label class="tm-publish__field"><input name="nickname" type="text" class="tm-publish__control" maxlength="40"
                                                  placeholder="个性昵称"></label>
          <label class="tm-publish__field"><input name="email" type="text" class="tm-publish__control" maxlength="40"
                                                  placeholder="电子邮箱"></label>
          <label class="tm-publish__field">
            <button class="tm-publish__btn is-disabled">发布</button>
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
      return {}
    }
  }
</script>

<style lang="postcss">
  @import "../../styles/postcss/publish.css";
</style>
