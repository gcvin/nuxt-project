<template lang="html">
  <div class="page">
    <a :href="resolveUrl(current - 1)">
      <Button
        :disabled="isFirst"
        icon="ios-arrow-back"
      />
    </a>

    <a
      v-for="num in prevArr"
      :key="num"
      :href="resolveUrl(num)"
      class="margin"
    >
      <Button
        v-if="num === 'prev'"
        icon="ios-arrow-dropleft"
        class="prev"
      />
      <Button v-else>
        {{ num }}
      </Button>
    </a>

    <Button disabled>
      {{ current }}
    </Button>

    <a
      v-for="num in nextArr"
      :key="num"
      :href="resolveUrl(num)"
      class="margin"
    >
      <Button
        v-if="num === 'next'"
        icon="ios-arrow-dropright"
        class="next"
      />
      <Button v-else>
        {{ num }}
      </Button>
    </a>

    <a :href="resolveUrl(current + 1)">
      <Button
        :disabled="isLast"
        icon="ios-arrow-forward"
      />
    </a>
  </div>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      default: () => ''
    },
    current: {
      type: Number,
      default: () => 0
    },
    size: {
      type: Number,
      default: () => 0
    },
    total: {
      type: Number,
      default: () => 0
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.size) || 1
    },
    isFirst() {
      return this.current === 1
    },
    isLast() {
      return this.current === this.totalPage
    },
    prevArr() {
      let arr = [this.current - 2, this.current - 1].filter(item => item > 0)
      if (this.current === 5) {
        arr.unshift(2)
      }
      if (this.current > 5) {
        arr.unshift('prev')
      }
      if (this.current > 3) {
        arr.unshift(1)
      }
      return arr
    },
    nextArr() {
      let arr = [this.current + 1, this.current + 2].filter(
        item => item <= this.totalPage
      )
      if (this.current === this.totalPage - 4) {
        arr.push(this.totalPage - 1)
      }
      if (this.current < this.totalPage - 4) {
        arr.push('next')
      }
      if (this.current < this.totalPage - 2) {
        arr.push(this.totalPage)
      }
      return arr
    }
  },
  methods: {
    resolveUrl(num) {
      if (num === 'prev') {
        num = this.current - 5
      }
      if (num === 'next') {
        num = this.current + 5
      }
      return this.url.replace('#num#', num)
    }
  }
}
</script>
<style lang="css">
    .page {
        text-align: center;
    }
    .margin {
        margin: 0 4px;
    }
    /*.prev:after, .next:after {
        content: "\2022\2022\2022";
        display: block;
        letter-spacing: 1px;
        color: #ccc;
        text-align: center;
    }
    .next:hover:after, .next i, .prev:hover:after, .prev i {
        display: none;
    }*/
    /*.next:hover i, .prev:hover i {
        display: inline;
    }*/
    .prev i:after {
        content: "\F3D2";
    }
    .next i:after {
        content: "\F3D3";
    }
</style>
