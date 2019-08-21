<template>
  <div>
    <h3>
      Text QR Code Generator
    </h3>

    <el-row>
      <el-col :span="14">
        <el-form
          ref="normal-form"
          :model="formModel"
          label-width="150px"
          label-position="top"
          :rules="formRule"
          size="small"
        >
          <el-form-item label="Text" prop="text">
            <el-tooltip placement="right">
              <div slot="content">
                <p><b>Supported Characters:</b></p>
                <p>1. Numbers: 0-9</p>
                <p>2. Letters: a-z, A-Z</p>
                <p>3. Common punctuations: · , . : ; + - * / \ ~ ! @ # $ % ^ &amp; ` ' = &lt; > [ ] ( ) ? _ { } | and  (space) </p>
              </div>
              <el-input v-model="formModel.text"></el-input>
            </el-tooltip>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="generate">Generate</el-button>
      </el-col>
    </el-row>
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
        text: ""
      },
      formRule: {
        text: [
          { required: true, message: "Text is required to generate QR Code!" }
        ]
      },
      generating: false
    };
  },
  methods: {
    generate() {
      this.$refs["normal-form"].validate(valid => {
        if (valid !== true) {
          return;
        }

        this.$refs["result-dialog"].showNormal(this.formModel);
      });
    },
    onResultDialogClose() {
      // reset form field
      this.formModel.text = null
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