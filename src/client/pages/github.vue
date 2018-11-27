<template lang="html">
  <div class="github">
    <RadioGroup
      v-model="currentBranch"
      @on-change="getCommits"
    >
      <Radio
        v-for="branch in branches"
        :key="branch.name"
        :label="branch.name"
      />
    </RadioGroup>
    <InputNumber
      v-model="size"
      :max="20"
      :min="1"
      size="small"
      @on-change="getCommits"
    />
    <Button
      type="primary"
      size="small"
      @click="handleCreatePdf"
    >
      生成PDF
    </Button>
    <Button
      :disabled="!!second"
      type="primary"
      size="small"
      @click="handleVerCode"
    >
      {{ btnText }}
    </Button>
    <br>
    <br>
    <Table
      :columns="columns"
      :data="commits"
    />
  </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake.min.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
import moment from 'moment'

pdfMake.vfs = pdfFonts.pdfMake.vfs

export default {
  data: function() {
    return {
      branches: [],
      commits: [],
      size: 3,
      second: 0,
      currentBranch: 'master',
      columns: [
        {
          title: 'SHA',
          render: (h, params) => {
            return h(
              'a',
              {
                attrs: {
                  href: params.row.html_url
                }
              },
              params.row.sha.slice(0, 7)
            )
          }
        },
        {
          title: 'Message',
          render: (h, params) => {
            let message = params.row.commit.message.replace(
              /^Merge\spull\srequest\s(#\d+).*/,
              '$1'
            )
            let newline = message.indexOf('\n')
            return h('span', newline > 0 ? message.slice(0, newline) : message)
          }
        },
        {
          title: 'Author',
          render: (h, params) => {
            if (params.row.author) {
              return h('span', params.row.author.login)
            }
            return h('span', params.row.commit.author.name)
          }
        },
        {
          title: 'Email',
          render: (h, params) => {
            return h('span', params.row.commit.author.email)
          }
        },
        {
          title: 'Date',
          render: (h, params) => {
            return h(
              'span',
              moment(params.row.commit.author.date).format(
                'YYYY-MM-DD HH:mm:ss'
              )
            )
          }
        }
      ]
    }
  },
  computed: {
    btnText() {
      return this.second ? this.second + 's后重新获取' : '获取验证码'
    }
  },
  mounted() {
    let branchURL = 'https://api.github.com/repos/gcvin/iview-project/branches'
    this.$http.get(branchURL).then(respose => {
      this.branches = respose.data
      this.getCommits()
    })
  },
  methods: {
    getCommits() {
      let commitURL = `https://api.github.com/repos/gcvin/iview-project/commits?per_page=${
        this.size
      }&sha=${this.currentBranch}`
      this.$http.get(commitURL).then(respose => {
        this.commits = respose.data
      })
    },
    handleCreatePdf() {
      let head = this.columns.map(col => col.title)
      let body = this.commits.map(commit => {
        let tmp = []
        tmp.push(commit.sha.slice(0, 7))
        tmp.push(commit.commit.message.split('\n').pop())
        tmp.push(commit.commit.author.name)
        tmp.push(commit.commit.author.email)
        tmp.push(
          moment(commit.commit.author.date).format('YYYY-MM-DD HH:mm:ss')
        )
        return tmp
      })
      let docDefinition = {
        content: [
          {
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
              body: [head, ...body]
            }
          }
        ]
      }

      pdfMake.createPdf(docDefinition).open()
    },
    handleVerCode() {
      this.$http.get('/ajax/get-vercode').then(res => {
        this.$Message.info('验证码：' + res.data.vercode)

        let timesRun = res.data.times
        this.second = timesRun
        let interval = setInterval(_ => {
          timesRun -= 1
          this.second = timesRun
          if (timesRun === 0) {
            clearInterval(interval)
          }
        }, 1000)
      })
    }
  },
  head() {
    return {
      title: 'Github'
    }
  }
}
</script>

<style lang="css">
.github {
    text-align: center;
    width: 800px;
    margin: 100px auto;
}
</style>
