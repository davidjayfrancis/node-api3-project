const express = require("express");
const db = require("./postDb.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => console.log(err));
});

router.get("/:id", (req, res) => {
  db.getById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => console.log(err));
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => console.log(err));
});

router.put("/:id", (req, res) => {
  db.update(req.params.id, req.body).then(post => {
    res.status(201).json(post);
  });
});

// router.post("/", (req, res) => {
//   db.insert(req.body)
//     .then(newPost => {
//       res.status(201).json(newPost);
//     })
//     .catch(err => console.log(err));
// });

// custom middleware

function validatePostId(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
    next();
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing name field" });
  } else {
    next();
  }
}

module.exports = router;
