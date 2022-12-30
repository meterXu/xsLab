const getters = {
    dbList:state => {
        state.app.dbList = JSON.parse(localStorage.getItem('xsLab_dbs')||null)||state.app.dbList
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
