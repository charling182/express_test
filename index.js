const express = require('express');
const csv = require('csv');
const fs = require('fs');
const config = require('./config');
const dbInit = require('./mongo-connection');
const handleParams = require('./handleParams');

const app = express();
const routes = require('./router');

// 使用中间件
// req.body 通常用于获取 POST 请求中的数据。
// 但是，要使 req.body 能够正确工作，你需要使用一个中间件来解析请求体。
// 对于 JSON 数据，你可以使用 express.json() 中间件，对于 URL 编码的数据，
// 你可以使用 express.urlencoded() 中间件。
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ extended: true, limit: '100mb'}));

// 请求参数为对象,如果对象的属性值不为undefined,null,空字符串,
// 就将参数传递过去,包括0,false的情况,如果是_id,就转换成ObjectId
// 中间件处理请求参数
app.use(handleParams);

app.use('/', routes);


(async () => {
  try {
    await dbInit.init();
    app.listen(config.PORT);
  } catch (err) {
    console.error('Failed to start server', err);
  }
})();