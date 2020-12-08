<template>
  <div class="container">
    <svg-icon :customer-styles="svgIconStyles" size="28px" color="red" icon="alert-circle" bg-color="primary" rotate="180"></svg-icon>
  </div>
</template>
<script>
/**
 * @file 本文件为简单欢迎视图实现
 * @author PRD UX R&D Dept.
 */

export default {
  data() {
    return {
    }
  },
  computed: {
    svgIconStyles() {
      return {
        'font-size': '24px',
        color: 'green'
      }
    }
  }
}
</script>
