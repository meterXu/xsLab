const getters = {
    token:state=>{
        return state.app.token
    },
    dbList:state => {
        return state.app.dbList;
    },
    editorTheme: state=>{
        state.app.editorTheme = localStorage.getItem('xsLab_editorTheme')
        return state.app.editorTheme
    },
    activeNode:state=>{
        return state.app.activeNode
    }
}
export default getters
