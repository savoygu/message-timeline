<script setup lang="ts">
withDefaults(defineProps<{
  type?: number
}>(), {
  type: 1,
})
</script>

<template>
  <div class="mt-loading" :class="`mt-loading__preloader_${type}`">
    <template v-if="[1, 4, 8].includes(type)">
      <span v-for="i in 5" :key="i" />
    </template>
    <template v-if="[2, 5, 6].includes(type)">
      <span v-for="i in 4" :key="i" />
    </template>
    <template v-if="type === 7">
      <span />
      <span />
    </template>
    <template v-if="type === 10">
      <span v-for="i in 9" :key="i" />
    </template>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/common/var.scss";

@include b(mt-loading) {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  @include e(preloader_1) {
    width: 53px;
    height: 30px;
    span {
      position: absolute;
      bottom: 0;
      display: block;
      width: 9px;
      height: 5px;
      background-color: #9b59b6;
      animation: preloader_1 1.5s infinite ease-in-out;
      &:nth-child(2) {
        left: 11px;
        animation-delay: .2s;
      }
      &:nth-child(3) {
        left: 22px;
        animation-delay: .4s;
      }
      &:nth-child(4) {
        left: 33px;
        animation-delay: .6s;
      }
      &:nth-child(5) {
        left: 44px;
        animation-delay: .8s;
      }
    }
  }
  @include e(preloader_2) {
    width: 40px;
    height: 40px;
    span {
      position: absolute;
      bottom: 0;
      display: block;
      width: 20px;
      height: 20px;
      background-color: #9b59b6;
      &:nth-child(1) {
        animation: preloader_2_1 1.5s infinite ease-in-out;
      }
      &:nth-child(2) {
        left: 20px;
        animation: preloader_2_2 1.5s infinite ease-in-out;
      }
      &:nth-child(3) {
        top: 0;
        animation: preloader_2_3 1.5s infinite ease-in-out;
      }
      &:nth-child(4) {
        top: 0;
        left: 20px;
        animation: preloader_2_4 1.5s infinite ease-in-out;
      }
    }
  }
  @include e(preloader_3) {
    width: 42px;
    &:before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: #9b59b6;
      border-radius: 20px;
      animation: preloader_3_before 1.5s infinite ease-in-out;
    }
    &:after {
      content: '';
      position: absolute;
      left: 22px;
      width: 20px;
      height: 20px;
      background-color: #2ecc71;
      border-radius: 20px;
      animation: preloader_3_after 1.5s infinite ease-in-out;
    }
  }
  @include e(preloader_4) {
    width: 100px;
    height: 20px;
    span {
      position: absolute;
      width: 20px;
      height: 20px;
      background: #3498db;
      opacity: 0.5;
      border-radius: 20px;
      animation: preloader_4 1s infinite ease-in-out;
      &:nth-child(2) {
        left: 20px;
        animation-delay: .2s;
      }
      &:nth-child(3) {
        left: 40px;
        animation-delay: .4s;
      }
      &:nth-child(4) {
        left: 60px;
        animation-delay: .6s;
      }
      &:nth-child(5) {
        left: 80px;
        animation-delay: .8s;
      }
    }
  }
  @include e(preloader_5) {
    width: 30px;
    height: 30px;
    background: #3498db;
    border-radius: 50px;
    animation: preloader_5 1.5s infinite linear;
    transform: translateX(-25px);
    &:after {
      content: '';
      position: absolute;
      top: -20px;
      left: -20px;
      width: 50px;
      height: 50px;
      border-top: 10px solid #9b59b6;
      border-bottom: 10px solid #9b59b6;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-radius: 50px;
      animation: preloader_5_after 1.5s infinite linear;
    }
  }
  @include e(preloader_6) {
    width: 42px;
    height: 42px;
    animation: preloader_6 5s infinite linear;
    span {
      position: absolute;
      display: block;
      width: 20px;
      height: 20px;
      background-color: red;
      animation: preloader_6_span 1s infinite linear;
      &:nth-child(1) {
        background-color: #2ecc71;
      }
      &:nth-child(2) {
        left: 22px;
        background-color: #9b59b6;
        animation-delay: .2s;
      }
      &:nth-child(3) {
        top: 22px;
        background-color: #3498db;
        animation-delay: .4s;
      }
      &:nth-child(4) {
        top: 22px;
        left: 22px;
        background-color: #f1c40f;
        animation-delay: .6s;
      }
    }
  }
  @include e(preloader_7) {
    width: 64px;
    height: 64px;
    span {
      position: absolute;
      left: 0;
      display: block;
      width: 100%;
      background-color: #9b59b6;
      &:nth-child(1) {
        top: -25%;
        z-index: 1;
        height: 100%;
        border-radius: 10%;
        animation: preloader_7_box .6s -0.1s linear infinite;
      }
      &:nth-child(2) {
        bottom: -9%;
        height: 10%;
        background-color: #000;
        border-radius: 50%;
        opacity: .2;
        animation: preloader_7_shadow .6s -0.1s linear infinite;
      }
    }
  }
  @include e(preloader_8) {
    width: 20px;
    height: 20px;
    transform: translateX(-50px);
    span {
      position: absolute;
      display: block;
      width: 20px;
      height: 20px;
      background-color: #9b59b6;
      border-radius: 100%;
      animation: preloader_8 2s linear infinite;
      &:nth-child(1) {
        animation-delay: 0s;
      }
      &:nth-child(2) {
        animation-delay: -.4s;
      }
      &:nth-child(3) {
        animation-delay: -.8s;
      }
      &:nth-child(4) {
        animation-delay: -1.2s;
      }
      &:nth-child(5) {
        animation-delay: -1.6s;
      }
    }
  }
  @include e(preloader_9) {
    width: 40px;
    height: 40px;
    background-color: #9b59b6;
    animation: preloader_9 1.2s ease-in-out infinite;
  }
  @include e(preloader_10) {
    width: 60px;
    height: 60px;
    span {
      float: left;
      width: 20px;
      height: 20px;
      background-color: #9b59b6;
      animation: preloader_10 1.3s ease-in-out infinite;
      &:nth-child(1) {
        animation-delay: .2s;
      }
      &:nth-child(2) {
        animation-delay: .3s;
      }
      &:nth-child(3) {
        animation-delay: .4s;
      }
      &:nth-child(4) {
        animation-delay: .1s;
      }
      &:nth-child(5) {
        animation-delay: .2s;
      }
      &:nth-child(6) {
        animation-delay: .3s;
      }
      &:nth-child(7) {
        animation-delay: 0s;
      }
      &:nth-child(8) {
        animation-delay: .1s;
      }
      &:nth-child(9) {
        animation-delay: .2s;
      }
    }
  }
}

@keyframes preloader_1 {
  0% {
    height: 5px;
    transform: translateY(0px);
    background-color: #9b59b6;
  }
  25% {
    height: 30px;
    transform: translateY(15px);
    background: #3498db;
  }
  50% {
    height: 5px;
    transform: translateY(0px);
    background: #9b59b6;
  }
  100% {
    height: 5px;
    transform: translateY(0px);
    background: #9b59b6;
  }
}

@keyframes preloader_2_1 {
  0% {
    transform: translateX(0px) translateY(0px) rotate(0deg);
    border-radius: 0px;
  }
  50% {
    transform: translateX(-20px) translateY(-10px) rotate(-180deg);
    border-radius: 20px;
    background: #3498db;
  }
  80% {
    transform: translateX(0px) translateY(0px) rotate(-360deg);
    border-radius: 0px;
  }
  100% {
    transform: translateX(0px) translateY(0px) rotate(-360deg);
    border-radius: 0px;
  }
}

@keyframes preloader_2_2 {
  0% {
    transform: translateX(0px) translateY(0px) rotate(0deg);
    border-radius: 0px;
  }
  50% {
    transform: translateX(20px) translateY(-10px) rotate(180deg);
    border-radius: 20px;
    background: #f1c40f;
  }
  80% {
    transform: translateX(0px) translateY(0px) rotate(360deg);
    border-radius: 0px;
  }
  100% {
    transform: translateX(0px) translateY(0px) rotate(360deg);
    border-radius: 0px;
  }
}

@keyframes preloader_2_3 {
  0% {
    transform: translateX(0px) translateY(0px) rotate(0deg);
    border-radius: 0px;
  }
  50% {
    transform: translateX(-20px) translateY(10px) rotate(-180deg);
    border-radius: 20px;
    background: #2ecc71;
  }
  80% {
    transform: translateX(0px) translateY(0px) rotate(-360deg);
    border-radius: 0px;
  }
  100% {
    transform: translateX(0px) translateY(0px) rotate(-360deg);
    border-radius: 0px;
  }
}

@keyframes preloader_2_4 {
  0% {
    transform: translateX(0px) translateY(0px) rotate(0deg);
    border-radius: 0px;
  }
  50% {
    transform: translateX(20px) translateY(10px) rotate(180deg);
    border-radius: 20px;
    background: #e74c3c;
  }
  80% {
    transform: translateX(0px) translateY(0px) rotate(360deg);
    border-radius: 0px;
  }
  100% {
    transform: translateX(0px) translateY(0px) rotate(360deg);
    border-radius: 0px;
  }
}

@keyframes preloader_3_before {
  0% {
    transform: translateX(0px) rotate(0deg)
  }
  50% {
    transform: translateX(50px) scale(1.2) rotate(260deg);
    background: #2ecc71;
    border-radius: 0px;
  }
  100% {
    transform: translateX(0px) rotate(0deg)
  }
}

@keyframes preloader_3_after {
  0% {
    transform: translateX(0px)
  }
  50% {
    transform: translateX(-50px) scale(1.2) rotate(-260deg);
    background: #9b59b6;
    border-radius: 0px;
  }
  100% {
    transform: translateX(0px)
  }
}

@keyframes preloader_4 {
  0% {
    opacity: 0.3;
    transform: translateY(0px);
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  }
  50% {
    opacity: 1;
    transform: translateY(-10px);
    background: #f1c40f;
    box-shadow: 0px 20px 3px rgba(0, 0, 0, 0.05);
  }
  100% {
    opacity: 0.3;
    transform: translateY(0px);
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  }
}

@keyframes preloader_5 {
  0% {
    transform: translateX(-25px) rotate(0deg);
  }
  50% {
    transform: translateX(-25px) rotate(180deg);
    background: #2ecc71;
  }
  100% {
    transform: translateX(-25px) rotate(360deg);
  }
}

@keyframes preloader_5_after {
  0% {
    border-top: 10px solid #9b59b6;
    border-bottom: 10px solid #9b59b6;
  }
  50% {
    border-top: 10px solid #3498db;
    border-bottom: 10px solid #3498db;
  }
  100% {
    border-top: 10px solid #9b59b6;
    border-bottom: 10px solid #9b59b6;
  }
}

@keyframes preloader_6 {
  from {
    transform: translateX(-50%) rotate(0deg);
  }
  to {
    transform: translateX(-50%) rotate(360deg);
  }
}

@keyframes preloader_6_span {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes preloader_7_box {
  17% {
    border-bottom-right-radius: 10%;
  }
  25% {
    transform: translateY(25%) rotate(22.5deg);
  }
  50% {
    border-bottom-right-radius: 100%;
    transform: translateY(50%) scale(1, 0.9) rotate(45deg);
  }
  75% {
    transform: translateY(25%) rotate(67.5deg);
  }
  100% {
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes preloader_7_shadow {
  50% {
    transform: scale(1.25, 1);
  }
}

@keyframes preloader_8 {
  0%,
  100% {
    width: 100%;
    height: 100%;
    transform: translateY(0) translateX(500%);
  }
  80% {
    transform: translateY(0) translateX(0);
  }
  85% {
    width: 100%;
    height: 100%;
    transform: translateY(-125%) translateX(0);
  }
  90% {
    width: 200%;
    height: 75%;
  }
  95% {
    width: 100%;
    height: 100%;
    transform: translateY(-100%) translateX(500%);
  }
}

@keyframes preloader_9 {
  0% {
    transform: perspective( 400px) rotateX( 0deg) rotateY( 0deg);
  }
  50% {
    transform: perspective( 400px) rotateX( -180deg) rotateY( 0deg);
  }
  100% {
    transform: perspective( 400px) rotateX( -180deg) rotateY( -180deg);
  }
}

@keyframes preloader_10 {
  0%,
  70%,
  100% {
    transform: scale3D(1, 1, 1);
  }
  35% {
    transform: scale3D(0, 0, 1);
  }
}
</style>
