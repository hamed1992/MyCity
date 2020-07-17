const { createServer } = require('http')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
// const setHeaderForAxios = require('./src/utility/setToken')
const axios = require('axios')

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = new URL(req.url, 'http://w.w')
    const token =  req && req.headers.cookie
    ? req.headers.cookie.replace("token=", "")
    : "";
    axios.interceptors.request.use(
      (config) => {
            config.headers.Authorization = "Bearer " + token; //localStorage.getItem("token");
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // setHeaderForAxios(token)
    handle(req, res, parsedUrl)
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
