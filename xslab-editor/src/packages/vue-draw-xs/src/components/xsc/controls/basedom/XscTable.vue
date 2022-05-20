<template>
  <div>
    <Table size="small"
           :border="options.primary.border"
           :columns="columns"
           :data="options.data"
           :stripe="options.primary.stripe"
           :disabled-hover="options.primary['disabled-hover']"
           :no-data-text="options.primary['no-data-text']"
    ></Table>
    <Page v-if="options.pagination.show" size="small" class="paging"
          :total="options.pagination.total"
          :page-size="options.pagination.pageSize"
          :current="options.pagination.pageNo"
          :page-size-opts="pageSizeOpts"
          :show-total="options.pagination['show-total']"
          :show-sizer="options.pagination['show-sizer']"
          :show-elevator="options.pagination['show-elevator']"
          :simple="options.pagination['simple']"
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
    />
  </div>
</template>

<script>
import {Table,TableColumn,Button,Page} from 'iview'
export default {
  name: 'XscTable',
  props: {
    id:Number,
    options: Object,
    themeData: Object,
    theme: String
  },
  components:{
    Button,
    Table,
    TableColumn,
    Page
  },
  computed: {
    themeStyle () {
      if (this.themeData && this.theme) {
        return this.themeData[this.theme || 'light']
      } else {
        return null
      }
    },
    tableStyle () {
      return {
        'border': this.options.primary.borderWidth + 'px ' + this.options.primary.borderStyle + ' ' + (this.options.primary.borderColor || this.themeStyle.table.primary.borderColor),
        'background': 'url(\'' + this.options.primary.backgroundImg + '\')'
      }
    },
    thStyle () {
      return {
        'font-family': this.options.th.fontFamily,
        'font-size': this.options.th.fontSize + 'px',
        'font-weight': this.options.th.fontWeight,
        'height': this.options.th.height + 'px',
        'color': this.options.th.color || this.themeStyle.table.th.color,
        'background-color': this.options.th.backgroundColor || this.themeStyle.table.th.backgroundColor,
        'border-bottom-width': this.options.th.borderBottomWidth + 'px',
        'border-bottom-style': this.options.th.borderBottomStyle,
        'border-bottom-color': this.options.th.borderBottomColor || this.themeStyle.table.th.borderBottomColor,
        'border-right-width': this.options.th.borderRightWidth + 'px',
        'border-right-style': this.options.th.borderRightStyle,
        'border-right-color': this.options.th.borderRightColor || this.themeStyle.table.th.borderRightColor
      }
    },
    tdStyle () {
      return {
        'font-family': this.options.td.fontFamily,
        'font-size': this.options.td.fontSize + 'px',
        'font-weight': this.options.td.fontWeight,
        'height': this.options.td.height + 'px',
        'color': this.options.td.color || this.themeStyle.table.td.color,
        'background-color': this.options.td.backgroundColor || this.themeStyle.table.td.backgroundColor,
        'border-bottom-width': this.options.td.borderBottomWidth + 'px',
        'border-bottom-style': this.options.td.borderBottomStyle,
        'border-bottom-color': this.options.td.borderBottomColor || this.themeStyle.table.td.borderBottomColor,
        'border-right-width': this.options.td.borderRightWidth + 'px',
        'border-right-style': this.options.td.borderRightStyle,
        'border-right-color': this.options.td.borderRightColor || this.themeStyle.table.td.borderRightColor
      }
    },
    columns(){
      return this.options.column.map(c=>{
        return {
          title: c.title,
          key: c.field
        }
      })
    },
    pageSizeOpts(){
      return this.options.pagination.pageSizeOpts.split(',').map(c=>{
        return parseInt(c)
      })
    }
  },
  methods:{
    pageChange(	page){
      this.options.pagination.pageNo = page
      this.$parent.$parent.$parent.update(this.id)
    },
    pageSizeChange(pageSize){
      this.options.pagination.pageNo = 1
      this.options.pagination.pageSize = pageSize
      this.$parent.$parent.$parent.update(this.id)
    }
  }
}
</script>

<style scoped>
  .d_table {
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .d_table th, .d_table td {
    width: 50px;
    text-align: center;
  }
  .paging{
    float:right;
    margin-top:10px;
  }
</style>
