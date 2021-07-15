<template>
  <table class="d_table" :style="tableStyle">
    <thead>
    <tr>
      <th :style="thStyle" v-for="(th,index) in options.column" :key='index'>{{th.title||""}}</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="(tr,index) in options.data" :key="index">
        <td :style="tdStyle" v-for="(td,index) in options.column" :key="index">{{tr[td.field]||""}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'XscTable',
  props: {
    options: Object,
    themeData: Object,
    theme: String
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
</style>
