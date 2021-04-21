const appState = {
    dbList:null,
}

const mutations = {
    setDbList(state,data){
        state.dbList=data
    }
}


export default {
    namespaced: false,
    state: appState,
    mutations
}
