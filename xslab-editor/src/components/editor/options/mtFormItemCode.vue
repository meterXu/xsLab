<template>
  <div>
    <div class="vue-codemirror-wrap" :class="{fullScreen:!full}">
      <textarea></textarea>
      <div v-if="copy" class="code-copy">
        <span ref="codeCopy" id="codeCopy"
              data-clipboard-action="copy"
              :data-clipboard-text="value">点我复制</span>
      </div>
    </div>
    <div v-if="full" class="full-editor"  @click="showFullCode">
      <i :size="20" class="ivu-icon ivu-icon-ios-create" title="全屏"></i>
      <span>编辑</span>
    </div>
  </div>
</template>

<script>
var CodeMirror = require('codemirror/lib/codemirror.js')
require('codemirror/lib/codemirror.css')
require('codemirror/theme/material.css')
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
    mode: {
      type: String,
      default: 'text/javascript'
    },
    options: {
      type: Object,
      default: function () {
        return {
          mode: this.mode,
          theme: 'material',
          lineNumbers: true,
          lineWrapping: true
        }
      }
    },
    full: {
      type: Boolean,
      default: true
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
      this.$emit('showFullCode',
        this.$attrs.field,
        this.editor.getValue(),
        this.$attrs.index,
        this.$props.mode)
    }
  },
  watch: {
    'value': function (newVal, oldVal) {
      var editorValue = this.editor.getValue()
      if (newVal !== editorValue) {
        this.skipNextChangeEvent = true
        var scrollInfo = this.editor.getScrollInfo()
        this.editor.setValue(newVal)
        this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
      }
    },
    'options': function (newOptions, oldVal) {
      if (typeof newOptions === 'object') {
        for (var optionName in newOptions) {
          if (newOptions.hasOwnProperty(optionName)) {
            this.editor.setOption(optionName, newOptions[optionName])
          }
        }
      }
    }
  },
  mounted: function () {
    var _this = this
    this.editor = CodeMirror.fromTextArea(this.$el.querySelector('textarea'), this.options)
    this.editor.setValue(this.value || '')
    this.editor.on('change', function (cm) {
      if (_this.skipNextChangeEvent) {
        _this.skipNextChangeEvent = false
        return
      }
      if (_this.$emit) {
        _this.$emit('change', cm.getValue())
        _this.$emit('input', cm.getValue())
        _this.$emit('update', cm.getValue())
      }
    })
    if (_this.copy) {
      let codeCopy = new _this.$clipboard(_this.$refs.codeCopy)
      codeCopy.on('success', function () {
        _this.$Message.success('复制成功！')
      })
      codeCopy.on('error', function () {
        _this.$Message.error('复制失败，请手动复制！')
      })
    }
  },
  beforeDestroy: function () {
    if (this.editor) {
      this.editor.toTextArea()
    }
  }
}
</script>

<style lang="less" scoped>
  .vue-codemirror-wrap{
    position: relative;
    height: 100%;
  }
  .full-editor{
    text-align: right;
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
