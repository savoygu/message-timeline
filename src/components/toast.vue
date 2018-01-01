<template>
  <transition name="tm-toast">
    <div class="tm-toast" v-show="isVisible">
      <div class="tm-toast__text">{{text}}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TmToast',

  props: {
    show: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 3000
    }
  },

  data () {
    return {
      isVisible: this.show
    }
  },

  methods: {
    open () {
      this.isVisible = true
      this.clearTimer()
      this.$nextTick(() => {
        if (this.duration !== 0) {
          this.timer = setTimeout(() => {
            this.close()
          }, this.duration)
        }
      })
    },

    close () {
      this.isVisible = false
      this.clearTimer()
    },

    clearTimer () {
      clearTimeout(this.timer)
      this.timer = null
    }
  }
}
</script>

<style lang="postcss">
@component-namespace tm {

  @b toast {
    position: absolute;
    left: 50%;
    top: 50%;
    padding: .2rem 1.1rem;
    transform: translate3d(-50%, -50%, 0) scale(1.2);
    background: rgba(0,0,0,0.6);
    z-index: 11000;
    border-radius: 0.25rem;
    transition: transform .3s, opacity .3s;
    color: white;
    text-align: center;
    min-width: 5.5rem;
    opacity: 1;

    &.tm-toast-enter {
      opacity: 0;
      transform: translate3d(-50%, -50%, 0) scale(0.8);
    }
    &.tm-toast-leave-active {
      opacity: 0;
      transform: translate3d(-50%, -50%, 0) scale(1.2);
    }

    @e text {
      margin: .2rem 0;
      font-size: .8rem;
    }
  }
}
</style>
