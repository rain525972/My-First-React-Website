const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function(app){
    app.use(
      '/search/users',
      createProxyMiddleware({
        target:'http://localhost:5000',
        changeOrigin:true,
        // pathRewrite:{'^/api1':''}
      })
    );

    // app.use(
    //   '/cars',
    //   createProxyMiddleware({
    //     target:'http://localhost:5001',
    //     changeOrigin:true,
    //   })
    // );
}