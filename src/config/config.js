let config = {
  editorTheme: 'light',
  chartNodeTheme: 'light',
  baseUrl: null,
  actionUrl: {
    getDataBaseList: '/GetDataBaseList',
    SaveCanvasData: '/SaveCanvasData',
    GetCanvasList: '/GetCanvasList',
    GetCanvasData: '/GetCanvasData',
    DelCanvas: '/DelCanvas',
    DownloadCanvas: '/DownloadCanvas',
    SaveDataSource: '/SaveDataSource',
    DelDataSource: '/DelDataSource',
    validateBaseUrl: '/validateBaseUrl'
  },
  localStorageKey: 'xsLab'
}
if (localStorage[config.localStorageKey]) {
  config = Object.assign(config, JSON.parse(localStorage[config.localStorageKey]))
}
config.baseUrl = config.baseUrl || 'http://192.168.12.105:11535'
export default config
