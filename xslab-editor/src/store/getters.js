const getters = {
    dbList:state => {
        state.app.dbList = JSON.parse(localStorage.getItem('xsLab_dbs')||null)||state.app.dbList
        return state.app.dbList;
    },
    config: state=>{
        state.app.config = JSON.parse(localStorage.getItem('xsLab_conf')||null)||state.app.config
        return state.app.config
    }
}
export default getters
