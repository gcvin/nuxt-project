<template lang="html">
  <div class="bus">
    <bus-parent :class="[{ active: isActive }, bold]" />
    <bus-child class="arrow" />
    <div
      class="captcha"
      @click="getCaptcha"
      @mousemove="getPositon($event)"
    />
  </div>
</template>

<script>
/* eslint no-undef: "off" */
import busChild from '~/components/bus-child'
import busParent from '~/components/bus-parent'

export default {
  components: {
    busChild,
    busParent
  },
  data() {
    return {
      isActive: true,
      bold: 'bold'
    }
  },
  mounted() {
    this.getCaptcha()
  },
  methods: {
    getCaptcha() {
      this.$http.get('/ajax/get-captcha').then(res => {
        $('.captcha')
          .html(res.data)
          .addClass('completed')
      })
    },
    getPositon(e) {
      const target = document.querySelector('.captcha')

      target.style.setProperty('--x', `${e.offsetX}px`)
      target.style.setProperty('--y', `${e.offsetY}px`)
    }
  },
  head() {
    return {
      title: 'Bus'
    }
  }
}
</script>

<style lang="less">
.bus {
  text-align: center;
  width: 200px;
  margin: 0 auto;
  margin-top: 200px;
}
.active {
  color: #42b983;
}

.bold {
  font-weight: bold;
}

.arrow {
  margin-top: 20px;
}

.arrow:before {
  border: 10px solid transparent;
  border-bottom: 10px solid #dddee1;
  width: 0;
  height: 0;
  position: absolute;
  content: " ";
  top: -20px;
  left: 50%;
  margin-left: -10px;
}

.arrow:after {
  border: 10px solid transparent;
  border-bottom: 10px solid #fff;
  width: 0;
  height: 0;
  position: absolute;
  content: " ";
  top: -18px;
  left: 50%;
  margin-left: -10px;
}

.captcha {
  margin-top: 10px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  height: 40px;
  width: 200px;

  &.completed::before {
    --size: 0;

    content: "";
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--size);
    height: var(--size);
    background: radial-gradient(
      circle closest-side,
      #19be6b,
      #2d8cf0,
      transparent
    );
    transform: translate(-50%, -50%);
    transition: width 0.2s ease, height 0.2s ease;
  }
  &.completed:hover::before {
    --size: 40px;
  }
}
</style>
