<template>
  <span :style="styles" :class="classes">
    <svg fill="currentColor" width="1em" height="1em" aria-hidden="true">
      <use :xlink:href="iconName"></use>
    </svg>
  </span>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: Number | String,
      default: ''
    },
    rotate: {
      type: String,
      validator (value) {
        return [ '90', '180', '270', '' ].includes(value)
      },
      default: ''
    },
    bgColor: {
      type: String,
      validator (value) {
        return ['primary', 'success', 'info', 'warning', 'danger']
      },
      default: ''
    },
    customerStyles: {
      type: Object,
      default: () => {
        return {}
      }
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`
    },
    styles() {
      return {
        color: this.color,
        'font-size': typeof this.size === 'string' ? this.size : this.size + 'px',
        ...this.customerStyles
      }
    },
    classes() {
      return [
        {
          [`rotate-${this.rotate}`]: !!this.rotate,
          [`bg-${this.bgColor}`]: !!this.bgColor
        }
      ]
    }
  }
}
</script>
