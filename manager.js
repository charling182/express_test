const dao = require('./dao');
const {
    getCollection,
    firstCollectionFindOne,
    firstCollectionInsertMany,
    firstCollectionUpdateOne,
    firstCollectionBulkWrite,
    firstCollectionDeleteOne,
    firstCollectionDeleteMany
} = require('./dao');

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
    deleteManyData
}