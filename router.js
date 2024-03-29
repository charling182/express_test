// routes.js
const express = require('express');
const router = express.Router();
const msg = require('./message');

// router.post('/data1', async (req, res) => {
//     const data = req.body; // 获取请求体中的数据
//     console.log('data1', data);
//     try {
//         let result = await global.mainDb.collection('yourCollectionName').insertOne(data);
//         console.log('数据插入成功1',result);
//         res.status(200).send('Data1 inserted successfully');
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

const routerMap = {
    test: {
        manager: require('./manager'),
        router: {
            postData: {method: 'post'},
            getData: {method: 'get'},
            postManyData: {method: 'post'},
            updateData: {method: 'put'},
            updateManyData: {method: 'put'},
            deleteData: {method: 'delete'},
            deleteManyData: {method: 'delete'}
        }
    }
}

for (let managerName in routerMap) {
    let map = routerMap[managerName];
    for (let route in map.router) {
        let method = map.router[route].method;
        if (method && typeof map.manager[route] === 'function') {
            // console.log('managerName---------',method, managerName, route);
            // 这里可以处理一下路由的公共逻辑,比如接口参数
            router[method]('/' + managerName + '/' + route, async function(req, res) {
                try {
                    // const p = JSON.parse(req[method == 'get' ? 'query' : 'body'].param);
                    // console.log('请求参数---------', p);
                    const p = req[method == 'get' ? 'query' : 'body'];
                    console.log('请求参数---------', p);
                    let result = await map.manager[route](p);
                    console.log('请求结果---------', result);
                    res.status(200).send(msg.buildSuccessMsg(result));
                } catch (err) {
                    res.status(500).send(err);
                }
            });
        }
    }
}

// console.log('router---------', router)

module.exports = router;