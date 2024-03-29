const { ObjectId } = require('mongodb');

module.exports = function(req, res, next) {
    let handleParams = (p) => {
        console.log('p----------------',p)
        try {
            if (Array.isArray(p)) {
                return p.map(handleParams);
            } else if (typeof p === 'object' && p !== null) {
                let newP = {};
                for (let key in p) {
                    if (p[key] !== undefined && p[key] !== null && p[key] !== '') {
                        newP[key] = Array.isArray(p[key]) ? p[key].map(id => new ObjectId(id)) : (key === '_id' ? new ObjectId(p[key]) : p[key]);
                    }
                }
                return newP;
            // 如果是字符串,就转换成ObjectId,这说明是批量删除接口
            } else if(typeof p === 'string') {
                return new ObjectId(p);
            } else {
                return p === '_id' ? new ObjectId(p) : p;
            }
        } catch(e) {
            console.log('e',e);
        }
    };
    console.log('req.method',req.method)
    req.body = handleParams(req.body);
    req.query = handleParams(req.query);
    next();
};