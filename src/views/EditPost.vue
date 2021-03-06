<template>
  <div>
    <!-- model：就是这个表单绑定data里面的那个对象 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <!-- 单选，单选使用el-radio-group，文档地址：https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng
      里面的特殊资源-->
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="form.type === 1" label="内容" class="editor">
        <vue-editor
          id="editor"
          v-model="form.content"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>

      <el-form-item v-if="form.type === 2" label="视频">
        <!-- action：上传链接 -->
        <!-- limit：限制上传文件的数量 -->
        <!-- on-remove：移除文件的事件 -->
        <el-upload
          :action="$axios.defaults.baseURL + `/upload`"
          :headers="{
                        Authorization: token
                    }"
          :limit="1"
          :on-remove="handleVideoRemove"
          :on-success="handleVideoSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传mp4,avi文件</div>
        </el-upload>
      </el-form-item>

      <!-- 多选框 -->
      <el-form-item label="栏目">
        <el-checkbox-group v-model="form.categories">
          <el-checkbox
            :label="item.id"
            name="type"
            v-for="(item,index) in menus"
            :key="index"
          >{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <!-- 多张图片的上传 -->
      <el-form-item label="封面">
        <!-- action:  上传图片的地址
				list-type: 图片上传组件使用图片列表布局
				handlePictureCardPreview: 图片预览的事件
        handleRemove：移除图片的事件
        on-success: 图片上传成功后的回调函数
        file-list：上传的图片列表-->
        <el-upload
          :action="$axios.defaults.baseURL + '/upload'"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleImageRemove"
          :headers="{
                        Authorization: token
                    }"
          :on-success="handleImageSuccess"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <!-- 预览图片的弹窗 -->
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 富文本编辑器 https://github.com/davidroyer/vue2-editor
import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
      // 表单的数据对象
      form: {
        title: "",
        type: 1,
        content: "",
        category: [],
        //栏目id的集合
        categories: [],
        // 封装图片id的集合
        cover: []
      },
      // 图片预览要使用的属性
      dialogImageUrl: "",
      dialogVisible: false,
      // 栏目列表
      menus: [],
      token: "",
      // 图片上传的列表
      fileList: []
    };

    // 表单验证的第二种写法
    const rules = [
      {
        value: this.form.title.trim() === "",
        message: "标题不能为空"
      },
      {
        value: this.form.content.trim() === "",
        message: "内容不能为空"
      },
      {
        value: this.form.categories.length === 0,
        message: "栏目不能为空"
      },
      {
        value: this.form.cover.length === 0,
        message: "封面不能为空"
      }
    ];
    // 先假设所有都是正确的
    let isvalid = true;
    rules.forEach(v => {
      if (!isvalid) return;
      if (v.value === true) {
        // 提示
        this.$message.warning(v.message);
        // 把通过的状态该为false
        isvalid = false;
      }
    });
    if (!isvalid) return;

    // 发布普通的文章
    this.$axios({
      url:"/post_update/" + this.$route.params.id,
      method: "POST",
      data: this.form,
      headers: {
        Authorization: this.token
      }
    }).then(res => {
      const { message } = res.data;
      // 弹窗提示
      this.$message.success(message);
      // 返回文章列表
      this.$router.replace("/post-list");
    });
  },
  components: {
    VueEditor
  },
  mounted() {
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    this.token = token;
    // 请求栏目数据
    this.$axios({
      url: "/category"
    }).then(res => {
      const { data } = res.data;
      // 删除头条
      data.splice(0, 1);
      // 保存到menus
      this.menus = data;
    });
    // 获取url地址栏的动态id
    const { id } = this.$route.params;
    // 请求当前文章的数据
    this.$axios({
      url: "/post/" + id
    }).then(res => {
      const { data } = res.data;
      // 还原数据
      this.form.title = data.title;
      this.form.type = data.type;
      this.form.content = data.content;
      this.form.categories = data.categories.map(v => {
        return v.id;
      });
      // 封面图片的回显
      this.fileList = data.cover.map(v => {
        v.url = this.$axios.defaults.baseURL + v.url;
        return v;
      });
    });
  },

  methods: {
    // 视频移除的事件
    handleVideoRemove(file, fileList) {
      console.log(fileList);
    },
    // 视频上传成功的事件
    handleVideoSuccess(response, file, fileList) {
      // 视频文章的content只需要一个视频的链接
      this.form.content = response.data.url;
    },
    // 封面图片移除的事件
    handleImageRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 预览图片的事件
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 封面图片移除的事件
    handleImageRemove(file, fileList) {
      // 把当前的图片列表赋值给data
      this.fileList = fileList;
    },
    // 图片上传成功后的事件
    handleImageSuccess(response, file, fileList) {
      // 把当前的图片列表赋值给data
      this.fileList = fileList;
    },
    // 富文本编辑的上传图片的事件
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      // 参数"file"是接口需要的属性
      formData.append("file", file);
      this.$axios({
        url: "/upload",
        method: "POST",
        data: formData,
        headers: {
          Authorization: this.token
        }
      })
        .then(result => {
          // 回显到页面的编辑器中
          let url = result.data.data.url; // Get url from response
          // 往编辑中插入刚刚上传成功的图片，第一个参数是编辑器获得焦点的地方，
          Editor.insertEmbed(
            cursorLocation,
            "image",
            this.$axios.defaults.baseURL + url
          );
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 确定编辑文章的点击事件
    onSubmit() {
      // 转换下栏目的id数据格式
      this.form.categories = this.form.categories.map(v => {
        return {
          id: v
        };
      });
      // 封面图片
      this.form.cover = this.fileList.map(v => {
        return {
          // v.id是运来旧图片的数据，v.response.data.id新上传的图片的id
          id: v.id || v.response.data.id
        };
      });
    }
  }
};
</script>
<style scoped lang="less">
.editor /deep/ .el-form-item__content {
  line-height: unset;
}
</style>