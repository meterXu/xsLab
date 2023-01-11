export const colorPalette = [
    '#1790cf',
    '#1bb2d8',
    '#99d2dd',
    '#88b0bb',
    '#1c7099',
    '#038cc4',
    '#75abd0',
    '#afd6dd'
];

export default {
    color: colorPalette,

    title: {
        textStyle: {
            fontWeight: 'normal',
            color: '#1790cf'
        }
    },

    visualMap: {
        color: ['#1790cf', '#a2d4e6']
    },

    toolbox: {
        color: ['#1790cf', '#1790cf', '#1790cf', '#1790cf']
    },

    tooltip: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        axisPointer: {
            // Axis indicator, coordinate trigger effective
            type: 'line', // The default is a straight line： 'line' | 'shadow'
            lineStyle: {
                // Straight line indicator style settings
                color: '#1790cf',
                type: 'dashed'
            },
            crossStyle: {
                color: '#1790cf'
            },
            shadowStyle: {
                // Shadow indicator style settings
                color: 'rgba(200,200,200,0.3)'
            }
        }
    },

    // Area scaling controller
    dataZoom: {
        dataBackgroundColor: '#eee', // Data background color
        fillerColor: 'rgba(144,197,237,0.2)', // Fill the color
        handleColor: '#1790cf' // Handle color
    },

    timeline: {
        lineStyle: {
            color: '#1790cfa'
        },
        controlStyle: {
            color: '#1790cf',
            borderColor: '#1790cf'
        }
    },

    candlestick: {
        itemStyle: {
            color: '#1bb2d8',
            color0: '#99d2dd'
        },
        lineStyle: {
            width: 1,
            color: '#1c7099',
            color0: '#88b0bb'
        },
        areaStyle: {
            color: '#1790cf',
            color0: '#1bb2d8'
        }
    },

    chord: {
        padding: 4,
        itemStyle: {
            color: '#1bb2d8',
            borderWidth: 1,
            borderColor: 'rgba(128, 128, 128, 0.5)'
        },
        lineStyle: {
            color: 'rgba(128, 128, 128, 0.5)'
        },
        areaStyle: {
            color: '#1790cf'
        }
    },

    graph: {
        itemStyle: {
            color: '#1bb2d8'
        },
        linkStyle: {
            color: '#88b0bb'
        }
    },

    map: {
        itemStyle: {
            color: '#ddd'
        },
        areaStyle: {
            color: '99d2dd'
        },
        label: {
            color: '#c12e34'
        }
    },

    gauge: {
        axisLine: {
            lineStyle: {
                color: [
                    [0.2, '#1bb2d8'],
                    [0.8, '#1790cf'],
                    [1, '#1c7099']
                ],
                width: 8
            }
        }
    }
};