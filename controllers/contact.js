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
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: new ObjectId(req.params.user_id) });
  result.toArray().then((user) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(user); // we just need the first one (the only one)
  });
};

const addUser = async (req, res, next) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  const result = await mongodb.getDb().db().collection('contacts').insertOne(user);
  console.log(result);
  if (result.acknowledged) {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ user_id: result.insertedId });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: "User account not created!" });
  }
}

const updateUser = async (req, res, next) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    favoriteColor: req.body.favoriteColor
  }
  const result = await mongodb.getDb().db().collection('contacts').updateOne({ _id: new ObjectId(req.params.user_id) }, { $set: user });
  console.log(result);
  if (result.modifiedCount > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: "User account updated!" });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: "User account not updated!" });
  }
}

const deleteUser = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: new ObjectId(req.params.user_id) });
  if (result.deletedCount > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: "User account deleted!" });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: "User account not deleted!" });
  }

}

module.exports = { getAllUsers, getUser, addUser, updateUser, deleteUser };
