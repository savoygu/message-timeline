<template>
  <div class="tm-switch" :class="disabled ? 'is-disabled' : ''">
    <label>
      <span class="tm-switch__text"><slot>{{text}}</slot></span>
      <input type="checkbox"
             ref="input"
             :true-value="onValue"
             :false-value="offValue"
             @change="handleChange"
             :disabled="disabled">
      <div class="tm-switch__lever" ref="lever">
        <span v-show="!checked" ref="off" class="tm-switch__off">{{offText}}</span>
        <span v-show="checked" ref="on" class="tm-switch__on">{{onText}}</span>
      </div>
    </label>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      onText: {
        type: String,
        default: '开'
      },
      offText: {
        type: String,
        default: '关'
      },
      onLeverColor: {
        type: String,
        default: ''
      },
      offLeverColor: {
        type: String,
        default: ''
      },
      onBgColor: {
        type: String,
        default: ''
      },
      offBgColor: {
        type: String,
        default: ''
      },
      onColor: {
        type: String,
        default: ''
      },
      offColor: {
        type: String,
        default: ''
      },
      onValue: {
        type: [Boolean, Number, String],
        default: true
      },
      offValue: {
        type: [Boolean, Number, String],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      text: String
    },

    created () {
      if (!~[this.onValue, this.offValue].indexOf(this.value)) {
        this.$emit('input', this.offValue)
      }
    },

    watch: {
      checked () {
        this.$refs.input.chekced = this.checked
        this.setColor()
      }
    },

    computed: {
      checked () {
        return this.value === this.onValue
      }
    },

    mounted () {
      this.$refs.input.checked = this.checked
      if (this.disabled) {
        return false
      }
      this.setColor()
    },

    methods: {
      handleChange (event) {
        this.$emit('input', !this.checked ? this.onValue : this.offValue)
        this.$emit('change', !this.checked ? this.onValue : this.offValue)
        this.$nextTick(() => {
          this.$refs.input.checked = this.checked
        })
      },
      setColor () {
        if (this.onColor || this.offColor) {
          this.setSwitchColor()
        }
        if (this.onBgColor || this.offBgColor) {
          this.setSwitchBgColor()
        }
        if (this.onLeverColor || this.offLeverColor) {
          this.setSwitchLeverColor()
        }
      },
      setSwitchColor () {
        if (this.checked) {
          this.$refs.on.style.color = this.onColor
        } else {
          this.$refs.off.style.color = this.offColor
        }
      },
      setSwitchBgColor () {
        if (this.checked) {
          this.$refs.on.style.backgroundColor = this.onBgColor
        } else {
          this.$refs.off.style.backgroundColor = this.offBgColor
        }
      },
      setSwitchLeverColor () {
        let newLeverColor = this.checked ? this.onLeverColor : this.offLeverColor
        this.$refs.lever.style.backgroundColor = newLeverColor
      }
    }
  }
</script>

<style lang="postcss">
@component-namespace tm {

  @b switch {
    display: inline-block;

    &, & * {
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }

    label {
      cursor: pointer;

      input[type=checkbox] {
        width: 0;
        height: 0;
        opacity: 0;
        &:checked {
          + .tm-switch__lever {
            background-color: #22507C;
          }
        }
      }

      input:checked~.tm-switch__lever {
        .tm-switch__on {
          right: 0;
          left: auto;
        }
      }
      input:not(:checked)~.tm-switch__lever {
        .tm-switch__off {
          left: 0;
          right: auto;
        }
      }

      input:active:not(:disabled):not(.disabled)~.tm-switch__lever {
        .tm-switch__off,
        .tm-switch__on {
          transform: scaleX(1.4);
        }
      }
    }

    @when disabled {
      label {
        cursor: not-allowed;
      }
    }

    @e lever {
      position: relative;
      display: inline-block;
      width: 52px;
      height: 28px;
      background-color: rgba(56, 80, 114, 0.3);
      border: 1px solid #dfdfdf;
      border-radius: 14px;
      transition: background 0.3s ease;
      vertical-align: middle;
    }

    @e text {
      font-size: 14px;
    }

    @e on, off {
      position: absolute;
      top: 0px;
      display: inline-block;
      width: 28px;
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      text-align: center;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0,0,0,.4);
      transition: all .35s cubic-bezier(.45,1,.4,1);
    }

    @e on {
      left: 0px;
      color: #C7C7C9;
      background-color: #1E74E9;
    }
    @e off {
      right: 0px;
      color: #5787BF;
      background-color: #1C519A;
    }
  }
}
</style>
