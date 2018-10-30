const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

// Index
  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

//show
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

// create
  router.post('/', (req, res) => {
    const newSighting = req.body;
    collection
    .insertOne(newSighting)
    .then(()  => collection.find().toArray())
    .then((docs) => res.json(docs));
  })

// update
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    collection
    .updateOne({ _id: ObjectID(id) },
                { $set: req.body} )
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs))
  })


//delete
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .deleteOne({ _id: ObjectID(id) })
      .then(() => collection.find().toArray())
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  return router;

};

module.exports = createRouter;
