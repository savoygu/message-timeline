<template>
  <transition name="mt-toast">
    <div class="mt-toast" v-show="show">
      <div class="mt-toast__text">{{text}}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MtToast',

  data () {
    return {
      show: false,
      text: ''
    }
  }
}
</script>

<style lang="postcss">
@component-namespace mt {

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

    &.mt-toast-enter {
      opacity: 0;
      transform: translate3d(-50%, -50%, 0) scale(0.8);
    }
    &.mt-toast-leave-active {
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
