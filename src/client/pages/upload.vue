<template lang="html">
  <div class="upload">
    <div
      v-for="(item,index) in uploadList"
      :key="index"
      class="upload-list"
    >
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="upload-list-cover">
          <Icon
            type="ios-eye-outline"
            @click.native="handleView(item.url)"
          />
          <Icon
            type="ios-trash-outline"
            @click.native="handleRemove(item)"
          />
        </div>
      </template>
      <template v-else>
        <Progress
          v-if="item.showProgress"
          :percent="item.percentage"
          hide-info
        />
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png','gif']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      name="image"
      action="/ajax/qnupload"
      style="display: inline-block;width:58px;"
    >
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon
          type="ios-camera"
          size="20"
          style="line-height: 58px;"
        />
      </div>
    </Upload>
    <Modal
      v-model="visible"
      title="查看图片"
    >
      <img
        v-if="visible"
        :src="imgUrl"
        style="width: 100%"
      >
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultList: [],
      imgUrl: '',
      visible: false,
      uploadList: []
    }
  },
  mounted() {
    this.$http.get('/ajax/qnlist').then(res => {
      this.defaultList = res.data.data
      setTimeout(_ => {
        this.uploadList = this.$refs.upload.fileList
      }, 0)
    })
  },
  methods: {
    handleView(url) {
      this.imgUrl = url
      this.visible = true
    },
    handleRemove(file) {
      this.$http
        .get('/ajax/qndelete', {
          params: {
            key: file.key
          }
        })
        .then(res => {
          if (res.data.success) {
            const fileList = this.$refs.upload.fileList
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
          } else {
            this.$Message.info(res.data.msg.name)
          }
        })
    },
    handleSuccess(res, file) {
      file.url = file.response.data.src
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc:
          '文件 ' +
          file.name +
          ' 格式不正确，请上传 jpg、png、jpeg 或 git 格式的图片。'
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
      })
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: '最多只能上传 5 张图片。'
        })
      }
      return check
    }
  },
  head() {
    return {
      title: 'Upload'
    }
  }
}
</script>

<style lang="css">
.upload{
    text-align: center;
    width: 200px;
    margin: 0 auto;
    margin-top: 200px;
}
.upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.upload-list img{
    width: 100%;
    height: 100%;
}
.upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.upload-list:hover .upload-list-cover{
    display: block;
}
.upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>
