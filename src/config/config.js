let config = {
  editorTheme: 'dark',
  chartNodeTheme: 'darkblue',
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
config.baseUrl = config.baseUrl || 'http://localhost:11525'
export default config
