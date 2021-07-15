let contrastColor = '#eee'
let colorPalette = [
  '#69d69d',
  '#3c755e',
  '#27323b',
  '#c5ce97',
  '#91c7ae',
  '#749f83',
  '#ca8622',
  '#bda29a',
  '#6e7074',
  '#546570',
  '#c4ccd3'
]
var axisCommon = function () {
  return {
    axisLine: {
      lineStyle: {
        color: '#333333'
      }
    },
    axisTick: {
      lineStyle: {
        color: '#333333'
      }
    },
    axisLabel: {
      textStyle: {
        color: '#DDC394'
      }
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#FFFFFF',
        width: 0.5
      }
    },
    splitArea: {
      areaStyle: {
        color: '#333333'
      }
    }
  }
}
var darkblue = {
  color: colorPalette,
  backgroundColor: '#272834',
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: contrastColor
      },
      crossStyle: {
        color: contrastColor
      }
    }
  },
  legend: {
    textStyle: {
      color: contrastColor
    }
  },
  textStyle: {
    color: contrastColor
  },
  title: {
    textStyle: {
      color: contrastColor
    }
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: contrastColor
      }
    }
  },
  dataZoom: {
    textStyle: {
      color: contrastColor
    }
  },
  visualMap: {
    textStyle: {
      color: contrastColor
    }
  },
  timeline: {
    lineStyle: {
      color: contrastColor
    },
    itemStyle: {
      normal: {
        color: colorPalette[1]
      }
    },
    label: {
      normal: {
        textStyle: {
          color: contrastColor
        }
      }
    },
    controlStyle: {
      normal: {
        color: contrastColor,
        borderColor: contrastColor
      }
    }
  },
  timeAxis: axisCommon(),
  logAxis: axisCommon(),
  valueAxis: axisCommon(),
  categoryAxis: axisCommon(),

  line: {
    symbol: 'circle'
  },
  graph: {
    color: colorPalette
  },
  gauge: {
    title: {
      textStyle: {
        color: contrastColor
      }
    }
  },
  candlestick: {
    itemStyle: {
      normal: {
        color: '#FD1050',
        color0: '#0CF49B',
        borderColor: '#FD1050',
        borderColor0: '#0CF49B'
      }
    }
  }
}
export default darkblue
