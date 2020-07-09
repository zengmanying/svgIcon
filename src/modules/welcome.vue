<template>
  <div class="container ">
    <div class="row text-center d-flex align-items-center justify-content-center" style="height: 600px">
      <div class="col">
        <div>
          <img src="/static/images/aid-logo.png"/>
          <h2 class="mt-2"><span>A</span><span>I</span> <span>D</span><span>E</span><span>S</span><span>I</span><span>G</span><span>N</span></h2>
          <p class="mt-2 mb-4">{{ $t('slogan') }}</p>
          <t-button type="primary" icon="plane" @click="$_onButtonClick" >{{ $t('started') }}</t-button>
          <svg-icon icon-class="alert-circle"></svg-icon>
          <div class="mt-5">
            <t-select v-model="language" :placeholder="$t('language')" size="sm" style="width:96px;" @on-change="$_onSelectChange">
              <t-option v-for="item in languageList" :value="item.value" :key="item.value">{{ item.label }}</t-option>
            </t-select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * @file 本文件为简单欢迎视图实现
 * @author PRD UX R&D Dept.
 */

// 导入国际化管理对象
import i18nManager from '../i18n'

export default {
  data() {
    return {
      languageList: [{ value: 'zh-CN', label: '简体中文' }, { value: 'en-US', label: 'en-US' }],
      language: i18nManager.language
    }
  },
  created() {
    console.log('created--', this.$t('slogan')) // eslint-disable-line no-console
  },
  mounted() {
    console.log('mounted--', this.$t('slogan')) // eslint-disable-line no-console
  },
  methods: {
    $_onButtonClick() {
      window.open('http://10.1.241.36:8888/')
    },
    $_onSelectChange(newLanguage) {
      // 改变语言
      i18nManager.changeLanguage(newLanguage)
    }
  }
}
</script>
