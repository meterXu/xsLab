const appState = {
    dbList:null,
    baseUrl: null,
    editorTheme: null,
    defaultChartTheme:null
}

const mutations = {
    setDbList(state, data) {
        state.dbList = data
    },
    setBaseUrl(state, data) {
        state.baseUrl = data
        localStorage.setItem('xsLab_baseUrl', data)
    },
    setEditorTheme(state, data) {
        state.editorTheme = data
        localStorage.setItem('xsLab_editorTheme', data)
    },
    setDefaultChartTheme(state, data) {
        state.defaultChartTheme = data
        localStorage.setItem('xsLab_defaultChartTheme', data)
    }
}



export default {
    namespaced: false,
    state: appState,
    mutations
}
