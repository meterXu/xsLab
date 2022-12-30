const state = {
    dbList:null,
    editorTheme: null,
    activeNode:null
}

const mutations = {
    setDbList(state, data) {
        state.dbList = data
    },
    setEditorTheme(state, data) {
        state.editorTheme = data
        localStorage.setItem('xsLab_editorTheme', data)
    },
    setActiveNode(state,data){
        state.activeNode = data
    }
}



export default {
    namespaced: false,
    state,
    mutations
}
