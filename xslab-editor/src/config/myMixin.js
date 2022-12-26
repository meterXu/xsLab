export default {
  data(){
    return {
      action:{
        getDataBaseList: '/api/database/list',
        saveCanvasData: '/api/canvas/save',
        getCanvasList: '/api/canvas/list',
        getCanvasData: '/api/canvas/query',
        delCanvas: '/api/canvas/delete',
        downloadCanvas: '/api/canvas/download',
        saveDataSource: '/api/database/save',
        delDataSource: '/api/database/delete',
        validateBaseUrl: '/api/validate'
      }
    }
  }
}
