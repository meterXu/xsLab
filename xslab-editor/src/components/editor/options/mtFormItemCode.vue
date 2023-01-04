<template>
  <div @click="showEditCode">
    <Icon :size="14" type="ios-create" title="编辑"></Icon>
    <span>编辑</span>
    <Modal :width="800" v-model="showFullCodeModal" :title="name">
      <div class="editor-container">
        <textarea ref="codeMirror"></textarea>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'mtFormItemCode',
  props:['value','name','mode'],
  model: {
    prop: 'value',
    event: 'update'
  },
  data(){
    return {
      showFullCodeModal:false,
      editor:null,
      options:{
        mode: null,
        theme: 'default',
        lineNumbers: true,
        lineWrapping: true
      }
    }
  },
  methods: {
    showEditCode () {
      let that = this
      this.showFullCodeModal = true
      this.$nextTick(()=>{
        if(!this.editor){
          this.editor = this.$codeMirror.fromTextArea(this.$refs.codeMirror, this.options)
          this.editor.on("change", function (editor) {
            that.$emit('update',editor.getValue())
          });
        }
        this.editor.setValue(this.value)
        this.editor.setSize(null,400)
      })
    }
  },
  created() {
    this.options.mode = this.mode
  }
}
</script>
