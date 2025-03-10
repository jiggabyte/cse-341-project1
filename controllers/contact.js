const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; 


const getAllUsers = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users); // we just need the first one (the only one)
  });
};

const getUser = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find({_id : new ObjectId(req.params.user_id)});
  result.toArray().then((user) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(user); // we just need the first one (the only one)
  });
};

module.exports = { getAllUsers, getUser };
