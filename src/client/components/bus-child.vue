<template lang="html">
  <Input
    v-model="value"
    placeholder="请输入..."
    @on-change="changeValue"
  ></Input>
</template>

<script>
import bus from '~/assets/js/bus.js'

export default {
  data: function() {
    return {
      value: ''
    }
  },
  methods: {
    changeValue() {
      bus.$emit('change-value', this.value)
    }
  }
}
</script>

<style lang="css">
</style>
