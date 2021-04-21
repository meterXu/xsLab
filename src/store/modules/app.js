const appState = {
    dbList:null,
    commonConfig:{
        editorTheme: 'dark',
        baseUrl: null
    }
}

const mutations = {
    setDbList(state,data){
        state.dbList = data
    },
    setCommonConfig(state,data){
        state.commonConfig = data
    }
}


export default {
    namespaced: false,
    state: appState,
    mutations
}
