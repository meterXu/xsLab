const getters = {
    dbList:state => {
        state.app.dbList = JSON.parse(localStorage.getItem('xsLab_dbs')||null)||state.app.dbList
        return state.app.dbList;
    },
    commonConfig:state=>{
        state.app.commonConfig = JSON.parse(localStorage.getItem('xsLab_conf')||null)||state.app.commonConfig
        return state.app.commonConfig
    }
}
export default getters
