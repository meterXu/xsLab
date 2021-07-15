const appState = {
    dbList:null,
    config:{
        editorTheme: 'dark',
        baseUrl: null
    }
}

const mutations = {
    setDbList(state,data){
        state.dbList = data
    },
    setConfig(state,data){
        state.config = data
        localStorage.setItem('xsLab_conf',JSON.stringify(data))
    }
}


export default {
    namespaced: false,
    state: appState,
    mutations
}
