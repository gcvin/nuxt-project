<template>
  <div class="index">
    <Row
      type="flex"
      justify="center"
      align="middle"
    >
      <i-col span="24">
        <h1>
          <img src="~assets/img/logo.png">
        </h1>
        <h2>
          <p>{{ slogan }}</p>
          <Button
            type="primary"
            class="tilt"
            @click="handleStart"
          >
            Start iView
          </Button>
          <br>
          <br>
          <icon-svg icon-class="youxiang" />
          <Button
            type="primary"
            @click="handleRecursion"
          >
            递归
          </Button>
          <Button
            type="primary"
            @click="handlePromise"
          >
            Promise
          </Button>
          <Button
            type="primary"
            @click="handleAwait"
          >
            Async/Await
          </Button>
          <icon-svg icon-class="anquan" />
        </h2>
        <ul class="icss">
          <li>
            <nuxt-link to="/bus">
              Bus
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/github">
              Github
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/mongo">
              Mongo
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/upload">
              Upload
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/minivue">
              MiniVue
            </nuxt-link>
          </li>
        </ul>
      </i-col>
    </Row>
  </div>
</template>
<script>
import VanillaTilt from 'vanilla-tilt'
import iconSvg from '~/components/icon-svg'
export default {
  components: {
    iconSvg
  },
  data: function() {
    return {
      arr: [1, 2, 3, 4], // 消息数组
      time: 1.5, // 每条消息显示多少秒
      slogan: '' // 欢迎语
    }
  },
  mounted() {
    // 3D翻转效果
    VanillaTilt.init(document.querySelector('.tilt'), {
      max: 50,
      speed: 400
    })
    // 获取首页欢迎语
    this.$http.get('/ajax/get-slogan').then(res => {
      this.slogan = res.data.slogan
    })
  },
  methods: {
    handleStart() {
      this.$toast('Now, enjoy the convenience of iView.')
    },
    handleRecursion() {
      let vm = this;
      (function next(len, curr) {
        if (curr < len) {
          vm.$Message.info({
            content: `第${vm.arr[curr]}条消息`,
            duration: vm.time,
            onClose: _ => {
              next(len, curr + 1)
            }
          })
        }
      })(vm.arr.length, 0)
    },
    handlePromise() {
      let vm = this
      vm.promiseForEach(vm.arr, curr => {
        return new Promise((resolve, reject) => {
          vm.$Message.info({
            content: `第${curr}条消息`,
            duration: vm.time
          })
          setTimeout(() => {
            return resolve()
          }, vm.time * 1000)
        })
      })
    },
    async handleAwait() {
      let vm = this
      for (let i = 0; i < vm.arr.length; i++) {
        let number = vm.arr[i]
        await new Promise((resolve, reject) => {
          vm.$Message.info({
            content: `第${number}条消息`,
            duration: vm.time
          })
          setTimeout(() => {
            return resolve()
          }, vm.time * 1000)
        })
      }
    },
    promiseForEach(arr, cb) {
      let realResult = []
      let result = Promise.resolve()
      arr.forEach(item => {
        result = result.then(() => {
          return cb(item).then(res => {
            realResult.push(res)
          })
        })
      })

      return result.then(() => {
        return realResult
      })
    }
  },
  head() {
    return {
      title: 'Index'
    }
  }
}
</script>
<style scoped lang="less">
.index {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  h1 {
    height: 150px;
    img {
      height: 100%;
    }
  }
  h2 {
    color: #666;
    p {
      margin: 0 0 50px;
    }
  }
  .ivu-row-flex {
    height: 100%;
  }
  .icss {
    margin-top: 40px;
    li {
      display: inline-block;
      position: relative;
      padding: 10px;
      font-size: 14px;
      line-height: 1;
      transition: 0.2s all linear;
      cursor: pointer;
      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 100%;
        height: 1px;
        width: 0;
        border-bottom: 1px solid #2d8cf0;
        transition: 0.2s all linear;
      }
      &:hover::before {
        left: 0;
        width: 100%;
        transition-delay: 0.1s;
      }
      &:hover ~ li::before {
        left: 0;
      }
    }
  }
}
</style>
