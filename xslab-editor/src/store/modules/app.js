const appState = {
    dbList:null,
    baseUrl: null,
    editorTheme: null,
}

const mutations = {
    setDbList(state,data){
        state.dbList = data
    },
    setBaseUrl(state,data){
        state.baseUrl = data
        localStorage.setItem('xsLab_baseUrl',data)
    },
    setEditorTheme(state,data){
        state.editorTheme = data
        localStorage.setItem('xsLab_editorTheme',data)
    }
}


export default {
    namespaced: false,
    state: appState,
    mutations
}
