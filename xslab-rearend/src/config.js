import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.resolve(`.env.${process.env.NODE_ENV}`)
})


let config = {
    NODE_ENV:process.env.NODE_ENV||'development',
    port:process.env.port||11525,
    enableSsl:process.env.enableSsl||false,
    ssl_key:process.env.ssl_key||null,
    ssl_cert:process.env.ssl_cert||null
};
export default config
