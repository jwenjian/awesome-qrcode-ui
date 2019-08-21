<template>
  <el-dialog
    :visible="visible"
    :title="title"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :center="true"
    :show-close="false"
    width="400px"
  >
    <el-row v-loading="generating">
      <el-col :offset="4" :span="16">
        <img :src="qrcode.url" width="100%" />
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="doClose">Close</el-button>
      <el-button type="primary" @click="doDownload" :disabled="!success">Download</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  get_normal_qrcode,
  get_picture_qrcode,
  get_gif_qrcode
} from "../api/service";

export default {
  name: "result-dialog",
  data() {
    return {
      visible: false,
      title: "Generating...",
      generating: true,
      qrcode: {
        url: "https://http.cat/404"
      },
      success: false
    };
  },
  methods: {
    showNormal(formModel) {
      this.visible = true;
      this.generating = true;
      get_normal_qrcode(
        formModel.text,
        data => {
          this.success = true;
          this.title = "Generate succeed!";
          this.$message.success("Success!");
          this.qrcode.url = "data:image/png;base64," + data.url;
          this.generating = false;
        },
        err => {
          this.$message.error("ERROR! " + JSON.stringify(err));
        }
      );
    },
    showPicture(formData) {
      this.visible = true;
      this.generating = true;
      get_picture_qrcode(
        formData,
        data => {
          this.success = true;
          this.title = "Generate succeed!";
          this.$message.success("Success!");
          this.qrcode.url = "data:image/png;base64," + data.url;
          this.generating = false;
        },
        err => {
          this.$message.error("ERROR! " + JSON.stringify(err));
        }
      );
    },
    showGif(formData) {
      this.visible = true;
      this.generating = true;
      get_gif_qrcode(
        formData,
        data => {
          this.success = true;
          this.title = "Generate succeed!";
          this.$message.success("Success!");
          this.qrcode.url = "data:image/gif;base64," + data.url;
          this.generating = false;
        },
        err => {
          this.$message.error("ERROR! " + JSON.stringify(err));
        }
      );
    },
    doClose() {
      this.qrcode.url = "https://http.cat/404";
      this.visible = false;
      this.generating = false;
      // if result is success,  emit 'done' event before close to notify parent component
      if (this.success === true) {
        this.$emit("done");
      }
    },
    doDownload() {
      let fileSuffix = '.png'

      if (this.qrcode.url.indexOf('image/gif') > 0) {
        fileSuffix = '.gif'
      }

      let now = new Date()

      let filename = `awesome-qrcode_${now.getFullYear()}_${now.getMonth() + 1}_${now.getDate()}_${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}${fileSuffix}`

      this.saveAsImg(filename, this.qrcode.url)
    },
    saveAsImg(fileName, url) {
      // from echarts
      // https://github.com/apache/incubator-echarts/blob/master/src/component/toolbox/feature/SaveAsImage.js
      const a = document.createElement("a");
      a.download = fileName;
      a.href = url;
      const ua = navigator.userAgent;
      // IE 11 Trident/7.0; rv:11.0
      const isIE =
        ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/.+?rv:(([\d.]+))/);
      const isEdge = ua.match(/Edge\/([\d.]+)/);
      // firefox || chrome
      if (typeof MouseEvent === "function" && !isIE && !isEdge) {
        var evt = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: false
        });
        a.dispatchEvent(evt);
      } else {
        if (window.navigator.msSaveOrOpenBlob) {
          var bstr = atob(url.split(",")[1]);
          var n = bstr.length;
          var u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          var blob = new Blob([u8arr]);
          window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
          var html =
            "" +
            '<body style="margin:0;">' +
            '<img src="' +
            url +
            '" style="max-width:100%;" title="' +
            fileName +
            '" />' +
            "</body>";
          var tab = window.open();
          tab.document.write(html);
        }
      }
    }
  }
};
</script>

<style>
</style>