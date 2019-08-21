<template>
  <div>
    <h3>Gif QR Code Generator</h3>
    <el-row>
      <el-col :span="14">
        <el-form
          ref="gif-form"
          :model="formModel"
          label-width="150px"
          label-position="top"
          :rules="formRule"
          size="small"
        >
          <el-form-item label="Text" prop="text">
            <el-tooltip placement="right">
              <div slot="content">
                <p>
                  <b>Supported Characters:</b>
                </p>
                <p>1. Numbers: 0-9</p>
                <p>2. Letters: a-z, A-Z</p>
                <p>3. Common punctuations: · , . : ; + - * / \ ~ ! @ # $ % ^ &amp; ` ' = &lt; > [ ] ( ) ? _ { } | and (space)</p>
              </div>
              <el-input v-model="formModel.text"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="Background Gif Picture" prop="picFile">
            <el-tooltip placement="right">
              <div slot="content">
                <p>1. Required.</p>
                <p>2. Must select a .gif file</p>
              </div>
              <el-upload
                drag
                :auto-upload="false"
                action="/qrcode/gif"
                :on-change="onFileChange"
                accept="image/gif"
                list-type="picture"
                :file-list="picFileList"
                ref="gif-upload"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  Drop your image file here，or
                  <em>Click to upload</em>
                </div>
                <div class="el-upload__tip" slot="tip">Only .gif file supported!</div>
              </el-upload>
            </el-tooltip>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-button type="primary" @click="generate">Generate</el-button>
    <result-dialog ref="result-dialog" @done="onResultDialogClose"></result-dialog>
  </div>
</template>

<script>
import ResultDialog from "../../dialogs/ResultDialog";

export default {
  components: {
    ResultDialog
  },
  data() {
    return {
      formModel: {
        text: "",
        picFile: null
      },
      formRule: {
        text: [
          { required: true, message: "Text is required to generate QR Code!" }
        ],
        picFile: {
          required: true,
          message: "Picture file is required to generate QR Code!"
        }
      },
      picFileList: []
    };
  },
  methods: {
    generate() {
      this.$refs["gif-form"].validate(valid => {
        if (valid !== true) {
          return;
        }

        let data = new FormData()
        data.append("text", this.formModel.text)
        data.append("file", this.formModel.picFile.raw)

        this.$refs["result-dialog"].showGif(data);
      });
    },
    onResultDialogClose() {
      // reset form field
      this.formModel.text = null;
      this.formModel.picFile = null;
      this.picFileList = []
      this.$refs['gif-upload'].clearFiles()
    },
    onFileChange(file, fileList) {
      if (!fileList) {
        this.formModel.picFile = null
      }
      if (file) {
        this.formModel.picFile = file;
        this.$refs['gif-form'].validateField('picFile')
      } else {
        this.formModel.picFile = null;
      }
    }
  }
};
</script>

<style scoped>
h3 {
  text-align: left;
}
div {
  text-align: left;
}
</style>