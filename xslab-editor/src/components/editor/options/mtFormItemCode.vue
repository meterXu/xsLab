<template>
  <div style="width: 100%;height: 100%">
    <div class="vue-codemirror-wrap" v-show="full">
      <textarea class="codeMirror-textarea" ref="codeMirror"></textarea>
    </div>
    <div v-if="!full" class="full-editor"  @click="showFullCode">
      <i :size="20" class="ivu-icon ivu-icon-ios-create" title="全屏"></i>
      <span>编辑</span>
    </div>
  </div>
</template>

<script>
const CodeMirror = require('codemirror/lib/codemirror.js')
require('codemirror/lib/codemirror.css')
require('../../../assets/styles/formItemCode.css')
require('codemirror/mode/javascript/javascript.js')
require('codemirror/mode/sql/sql.js')
require('codemirror/addon/selection/active-line.js')
export default {
  name: 'mtFormItemCode',
  props: {
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'text/javascript'
    },
    options: {
      type: Object,
      default: function () {
        return {
          mode: this.mode,
          theme: 'default',
          lineNumbers: true,
          lineWrapping: true
        }
      }
    },
    full: {
      type: Boolean,
      default: false
    },
    copy: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'value',
    event: 'update'
  },
  data: function () {
    return {
      skipNextChangeEvent: false
    }
  },
  methods: {
    showFullCode () {
      this.$bus.$emit('showFullCode',this.$attrs.field, this.value, this.$attrs.index,this.$props.mode,this.$props.name);
    },
    initCodeMirror(){
      if(this.$refs.codeMirror&&this.value&&this.full){
        if(!this.editor){
          this.editor = CodeMirror.fromTextArea(this.$refs.codeMirror, this.options)
        }
        this.editor.setValue(this.value)
      }
    },
    getValue(){
      return this.editor.getValue()
    }
  },
  watch: {
    full:{
      handler(nv){
        if(nv){
          this.$nextTick(()=>{
            this.initCodeMirror()
          })
        }
      }
    },
    value(nv){
      this.initCodeMirror()
    }
  },
  mounted: function () {
  },
  beforeDestroy: function () {
    if (this.editor) {
      this.editor.toTextArea()
    }
  }
}
</script>

<style lang="less">
.CodeMirror{
  .CodeMirror-sizer{
    margin-left: 32px !important;
  }
  height: 563px !important;
  .CodeMirror-gutters{
    left: 1px !important;
  }
  .CodeMirror-gutter-wrapper{
    left: -28.8px !important;
  }
  .CodeMirror-linenumbers{
    width: 31px !important;
  }
}
</style>
<style lang="less" scoped>
.hiddenEditor{
  display: none;
}
  .codeMirror-textarea{
    display: none;
  }
  .vue-codemirror-wrap{
    position: relative;
    height: 100%;
  }
  .full-editor{
    text-align: left;
    height: 24px;
    cursor: pointer;
  }
  .ivu-icon-ios-create{
    position: relative;
    top: -3px;
  }
  .ivu-icon-ios-create:before{
    font-size: 18px;
  }
  .full-editor:hover{
    .ivu-icon-ios-create:before,span{
      color:#2b85e4;
    }
  }
  .code-copy {
    position: absolute;
    top: 0;
    right: 6px;
    z-index: 99;
    height: 25px;
    line-height: 25px;
    padding: 0 5px;
  }
  .code-copy span{
    cursor: pointer;
    color: #bdbdbd;
  }
  .vue-codemirror-wrap {
    /* 设置滚动条的样式 */
    ::-webkit-scrollbar {
      width:6px;
    }
    /* 滚动槽 */
    ::-webkit-scrollbar-track {
      border-radius:0px;
    }
    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
      border-radius:0px;
      background:#a2a2a2;
    }
    ::-webkit-scrollbar-thumb:window-inactive {
      background:#fd5f5f;
    }
  }

</style>
