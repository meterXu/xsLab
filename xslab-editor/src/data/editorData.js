import resources from './resources/resources'
export default {
  resources: resources,
  activeNode: null,
  dragMenuNode: null,
  dragCanvasNode: null,
  menuData: [
    { title: '柱状图',
      icon: 'bar',
      sub: [
        {title: '简单柱状图', icon: 'chartsIcon/bar_simple.png', type: 'eCharts', chart: 'bar'},
        {title: '堆叠柱状图', icon: 'chartsIcon/bar_stack.png', type: 'eCharts', chart: 'barStack'},
        {title: '正负条形图', icon: 'chartsIcon/bar_negative.png', type: 'eCharts', chart: 'barNegative'},
        {title: '多柱柱状图', icon: 'chartsIcon/barLabelRotation.png', type: 'eCharts', chart: 'barLabelRotation'}
      ]
    },
    { title: '折线图',
      icon: 'line',
      sub: [
        {title: '简单折线图', icon: 'chartsIcon/line_simple.png', type: 'eCharts', chart: 'line'},
        {title: '折柱组合图', icon: 'chartsIcon/line_bar.png', type: 'eCharts', chart: 'lineBar'},
        {title: '多线折线图', icon: 'chartsIcon/line_mutil.png', type: 'eCharts', chart: 'lineMulti'}
      ]
    },
    { title: '饼图',
      icon: 'pie',
      sub: [
        {title: '简单饼图', icon: 'chartsIcon/pie_simple.png', type: 'eCharts', chart: 'pie'},
        {title: '南丁格尔图', icon: 'chartsIcon/pie_rose.png', type: 'eCharts', chart: 'pieRose'}
      ]
    },
    { title: '仪表盘',
      icon: 'gauge',
      sub: [
        {title: '简单仪表盘', icon: 'chartsIcon/gauge_simple.png', type: 'eCharts', chart: 'gauge'}
      ]
    },
    {
      title: '大屏素材',
      icon: 'big-screen',
      sub:[
        {title: '大标题', icon: 'chartsIcon/dom_header.png', type: 'dom', chart: 'header'},
        {title: '容器', icon: 'chartsIcon/dom_container.png', type: 'dom', chart: 'container'},
      ]
    },
    { title: '经典素材',
      icon: 'basic',
      sub: [
        {title: '表格', icon: 'chartsIcon/dom_table.png', type: 'dom', chart: 'table'},
        {title: '图片', icon: 'chartsIcon/dom_img.png', type: 'dom', chart: 'img'},
        {title: '文字', icon: 'chartsIcon/dom_text.png', type: 'dom', chart: 'text'},
        {title: 'iframe', icon: 'chartsIcon/dom_iframe.png', type: 'dom', chart: 'iframe'},
        {title: '幻灯片', icon: 'chartsIcon/dom_slide.png', type: 'dom', chart: 'slide'}
      ]
    },
    {
      title: '开发组件',
      icon: 'dev',
      sub: [
        {title: '占位框', icon: 'chartsIcon/dev_placeholderBox.png', type: 'dev', chart: 'placeholderBox'}
      ]
    }
  ]
}
