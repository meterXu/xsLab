<template>
  <div id="app">
    <div>
      <button @click="update">update</button>
      <button @click="getDataConf">getDataConf</button>
      <select v-model="theme">
        <option v-for="(item,i) in themeData" :key="i" :value="item">{{item}}</option>
      </select>
    </div>
    <div>
      <Xsc ref="xsc" :options="options" :charts="charts" :view="false">
        <template v-slot:xxxx>
          <div>
            xxxx
          </div>
        </template>
      </Xsc>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      theme: 'normal',
      themeData: [
        'chalk',
        'dark',
        'darkblue',
        'essos',
        'halloween',
        'light',
        'macarons',
        'normal',
        'purple-passion',
        'roma',
        'shine',
        'vintage',
        'walden',
        'westeros',
        'wonderland'
      ],
      options: {
        'name': '新的画布',
        'width': 1280,
        'height': 720,
        'backgroundImage': null,
        'backgroundSize': null,
        'theme': 'light',
        'baseUrl': 'http://workcollect.isaacxu.com',
        'id': 1574757416001
      },
      charts: [{
        'id': 1591609508475,
        'type': 'eCharts',
        'chart': 'gauge',
        'config': {
          'box': { 'width': 400, 'height': 300, 'x': 373, 'y': 206, 'zIndex': 100 },
          'theme': 'light',
          'options': {
            'title': {
              'text': '简单仪表盘',
              'subtext': '',
              'textStyle': { 'fontStyle': 'normal', 'fontWeight': 'bold', 'fontSize': 18, 'lineHeight': 18 },
              'subtextStyle': { 'fontStyle': 'normal', 'fontWeight': 'normal', 'fontSize': 12, 'lineHeight': 12 },
              'x': 'center',
              'show': true
            },
            'tooltip': { 'formatter': '{a} <br/>{b} : {c}%', 'show': true },
            'series': {
              'name': '业务指标',
              'type': 'gauge',
              'detail': { 'formatter': '{value}%', 'show': true, 'fontSize': 15, 'lineHeight': 56 },
              'data': [{ 'name': '完成率', 'value': 60 }],
              'title': { 'show': true },
              'radius': '75%',
              'startAngle': 225,
              'endAngle': -45,
              'clockwise': true,
              'min': 0,
              'max': 100,
              'splitNumber': 10,
              'pointer': { 'show': true, 'length': '80%', 'width': 8 },
              'itemStyle': {},
              'axisLine': { 'show': true },
              'splitLine': { 'show': false },
              'axisTick': { 'show': true },
              'axisLabel': { 'show': true }
            }
          },
          'data': {
            'coordinate': 'gauge',
            'loop': true,
            'interval': 30,
            'source': [{
              'type': 2,
              'db': '',
              'sql': '',
              'json': '[{"value": 60, "name": "完成率"}]',
              'name': 'name',
              'value': 'value',
              's': '业务指标',
              'sto': ['series/name']
            }]
          }
        }
      }]
    }
  },
  watch: {
    theme: {
      handler (e, t) {
        this.options.theme = e
        this.charts[0].config.theme = e
      }
    }
  },
  methods: {
    update () {
      let dataConf = this.$refs.xsc.getDataConf(1591609508475)
      dataConf.source[0].json = [{'name': '完成率', 'value': 84}]
      this.$refs.xsc.update(1591609508475).then(c => {
        if (!c.warns) {
          console.log('更新成功')
        } else {
          console.log('更新失败')
        }
      })
    },
    getDataConf () {

    }
  }
}
</script>

<style scoped>

</style>
