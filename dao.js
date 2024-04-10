'use strict';

const { ObjectId } = require('mongodb');

function toObjectID(id) {
    if (typeof id == 'string') {
        return new ObjectId(id);
    }
    return id;
}

function getCollection () {
    return global.mongodb.collection('first_collection');
}


async function firstCollectionFindOne (p) {
    return await getCollection().findOne(p);
}

// 添加一条数据
async function firstCollectionInsertOne (p) {
    return await getCollection().insertOne(p);
}

// 添加多条数据
async function firstCollectionInsertMany (p) {
    return await getCollection().insertMany(p);
}

// 修改一条数据
async function firstCollectionUpdateOne (query, update) {
    return await getCollection().updateOne(query, update);
}

// 修改多条数据
async function firstCollectionBulkWrite (operations) {
    return await getCollection().bulkWrite(operations);
}

// 删除一条数据
async function firstCollectionDeleteOne (p) {
    return await getCollection().deleteOne(p);
}

// 删除多条数据
async function firstCollectionDeleteMany (p) {
    return await getCollection().deleteMany(p);
}
// 

module.exports = {
    getCollection,
    firstCollectionFindOne,
    firstCollectionInsertOne,
    firstCollectionInsertMany,
    firstCollectionUpdateOne,
    firstCollectionBulkWrite,
    firstCollectionDeleteOne,
    firstCollectionDeleteMany
};