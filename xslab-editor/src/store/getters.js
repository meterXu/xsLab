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
    },
    defaultChartTheme:state=>{
        state.app.defaultChartTheme = localStorage.getItem('xsLab_defaultChartTheme')
        return state.app.defaultChartTheme
    },
    activeNode:state=>{
        return state.app.activeNode
    }
}
export default getters
