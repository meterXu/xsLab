const colorPalette = [
    '#dd6b66',
    '#759aa0',
    '#e69d87',
    '#8dc1a9',
    '#ea7e53',
    '#eedd78',
    '#73a373',
    '#73b9bc',
    '#7289ab',
    '#91ca8c',
    '#f49f42'
]
let contrastColor = '#eee';
let axisCommon = function() {
    return {
        axisLine: {
            lineStyle: {
                color: contrastColor
            }
        },
        axisTick: {
            lineStyle: {
                color: contrastColor
            }
        },
        axisLabel: {
            textStyle: {
                color: contrastColor
            }
        },
        splitLine: {
            lineStyle: {
                type: 'dashed',
                color: '#aaa'
            }
        },
        splitArea: {
            areaStyle: {
                color: contrastColor
            }
        }
    };
};


export default {
    color: colorPalette,
    backgroundColor: 'transparent',
    tooltip: {
        axisPointer: {
            lineStyle: {
                color: contrastColor
            },
            crossStyle: {
                color: contrastColor
            },
            label: {
                color: '#000'
            }
        }
    },
    legend: {
        textStyle: {
            color: contrastColor
        }
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

    // Area scaling controller
    dataZoom: {
        dataBackgroundColor: '#eee', // Data background color
        fillerColor: 'rgba(200,200,200,0.2)', // Fill the color
        handleColor: '#dd6b66' // Handle color
    },

    timeline: {
        itemStyle: {
            color: colorPalette[1]
        },
        lineStyle: {
            color: contrastColor
        },
        controlStyle: {
            color: contrastColor,
            borderColor: contrastColor
        },
        label: {
            color: contrastColor
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
        axisLine: {
            lineStyle: {
                color: [
                    [0.2, '#dd6b66'],
                    [0.8, '#759aa0'],
                    [1, '#ea7e53']
                ],
                width: 8
            }
        }
    },

    candlestick: {
        itemStyle: {
            color: '#FD1050',
            color0: '#0CF49B',
            borderColor: '#FD1050',
            borderColor0: '#0CF49B'
        }
    }
}
