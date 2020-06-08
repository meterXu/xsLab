/**
* 画布元素默认配置
**/
import canvas from './dom/canvas'
import bar from './eCharts/bar'
import barStack from './eCharts/barStack'
import barNegative from './eCharts/barNegative'
import line from './eCharts/line'
import lineMulti from './eCharts/lineMulti'
import pie from './eCharts/pie'
import pieRose from './eCharts/pieRose'
import barLabelRotation from './eCharts/barLabelRotation'
import lineBar from './eCharts/lineBar'
import table from './dom/table'
import img from './dom/img'
import text from './dom/text'
import iframe from './dom/iframe'
import container from './dom/container'
import slide from './dom/slide'
import placeholderBox from './dev/placeholderBox'
import gauge from './eCharts/gauge'
export default {
  initOptions: {
    eCharts: {
      bar: bar.resource,
      barStack: barStack.resource,
      barNegative: barNegative.resource,
      line: line.resource,
      pie: pie.resource,
      pieRose: pieRose.resource,
      barLabelRotation: barLabelRotation.resource,
      lineBar: lineBar.resource,
      lineMulti: lineMulti.resource,
      gauge: gauge.resource
    },
    dom: {
      canvas: canvas.resource,
      table: table.resource,
      img: img.resource,
      text: text.resource,
      iframe: iframe.resource,
      container: container.resource,
      slide: slide.resource
    },
    dev: {
      placeholderBox: placeholderBox.resource
    }
  },
  configOptions: {
    eCharts: {
      bar: bar.option,
      barStack: barStack.option,
      barNegative: barNegative.option,
      line: line.option,
      pie: pie.option,
      pieRose: pieRose.option,
      barLabelRotation: barLabelRotation.option,
      lineBar: lineBar.option,
      lineMulti: lineMulti.option,
      gauge: gauge.option
    },
    dom: {
      canvas: canvas.option,
      table: table.option,
      img: img.option,
      text: text.option,
      iframe: iframe.option,
      container: container.option,
      slide: slide.option
    },
    dev: {
      placeholderBox: placeholderBox.option
    }
  }
}
