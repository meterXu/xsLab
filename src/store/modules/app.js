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
        localStorage.setItem('xsLab_conf',JSON.stringify(data))
    }
}


export default {
    namespaced: false,
    state: appState,
    mutations
}
