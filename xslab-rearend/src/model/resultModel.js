export default class ResultModel{
    constructor(data,message,success,code) {
        this.data = data
        this.message=  message
        this.code = code
        this.success = success
    }
}