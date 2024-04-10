const dao = require('./dao');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const iconv = require('iconv-lite');
const chardet = require('chardet');

const {
    getCollection,
    firstCollectionFindOne,
    firstCollectionInsertMany,
    firstCollectionUpdateOne,
    firstCollectionBulkWrite,
    firstCollectionDeleteOne,
    firstCollectionDeleteMany
} = require('./dao');

// 解析csv文件
function parseCsv() {
    const data = [];
    let filePath = path.resolve(__dirname, '测试数据.csv');
    let buffer = fs.readFileSync(filePath);
    let encoding = chardet.detect(buffer);
    // console.log(encoding);
    fs.createReadStream(filePath)
    .pipe(iconv.decodeStream(encoding))  // 使用 'GB18030' 编码
    .pipe(csv({ headers: ['name', 'age', 'city'] })) // 如果你提供了列名，csv-parser 将不会使用 CSV 文件的第一行作为列名。
    .on('data', (row) => {
        data.push(row);
    })
    .on('end', () => {
        console.log('data', data);
        postManyData(data);
    });
}

async function postData(p) {
    try {
        let result = await dao.firstCollectionInsertOne(p);
        return result;
    } catch (e) {
        throw e;
    }
}

/**
 * 添加多条数据
 * @param {*} p 
 * @returns 
 */

async function postManyData(p) {
    try {
        let result = await dao.firstCollectionInsertMany(p);
        return result;
    } catch (e) {
        throw e;
    }
}

async function getData(p) {
    try {
        let result = await dao.firstCollectionFindOne(p);
        return result;
    } catch (e) {
        console.log('getData error', e);
        throw e;
    }
}

/**
 * 修改一条数据
 */
async function updateData(p) {
    try {
        // 参数改造为update支持的格式
        const query = { _id: p._id };
        const update = { $set: {name:p.name} };
        let result = await dao.firstCollectionUpdateOne(query, update);
        return result;
    }
    catch (e) {
        throw e;
    }
}

/**
 * 修改多条数据
 */
async function updateManyData(p) {
    try {
        // 参数改造为bulkWrite支持的格式
        const operations = p.map(item => ({
            updateOne: {
                filter: { _id: item._id },
                update: { $set: { name: item.name } }
            }
        }));
        let result = await dao.firstCollectionBulkWrite(operations);
        return result;
    }
    catch (e) {
        throw e;
    }
}

/**
 * 删除一条数据
 */
async function deleteData(p) {
    try {
        let result = await dao.firstCollectionDeleteOne(p);
        return result;
    }
    catch (e) {
        throw e;
    }
}

/**
 * 删除多条数据
 */
async function deleteManyData(ids) {
    console.log('ids-------', ids);
    try {
        const query = { _id: { $in: ids } };
        let result = await dao.firstCollectionDeleteMany(query);
        return result;
    }
    catch (e) {
        throw e;
    }
}

module.exports = {
    postData,
    getData,
    postManyData,
    updateData,
    updateManyData,
    deleteData,
    deleteManyData,
    parseCsv
}