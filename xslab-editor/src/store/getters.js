const getters = {
    dbList:state => {
        state.app.dbList = JSON.parse(localStorage.getItem('xsLab_dbs')||null)||state.app.dbList
        return state.app.dbList;
    },
    baseUrl: state=>{
        state.app.baseUrl = localStorage.getItem('xsLab_baseUrl')
        return state.app.baseUrl
    },
    editorTheme: state=>{
        state.app.editorTheme = localStorage.getItem('xsLab_editorTheme')
        return state.app.editorTheme
    }
}
export default getters
