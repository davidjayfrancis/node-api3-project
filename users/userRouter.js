const express = require("express");
const db = require("./userDb.js");
const postDb = require("../posts/postDb.js");
const router = express.Router();

router.use("/:id", validateUserId);

router.post("/", validateUser, (req, res) => {
  db.insert(req.body)
    .then(u => {
      res.status(201).json(u);
    })
    .catch(err => console.log(err));
});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {
  db.get().then(users => {
    res.status(200).json(users);
  });
});

router.get("/:id", (req, res) => {
  db.getById(req.params.id)
    .then(u => {
      res.status(200).json(u);
    })
    .catch(err => console.log(err));
});

router.get("/:id/posts", (req, res) => {
  db.getUserPosts(req.params.id)
    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => console.log(err));
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id).then(u => {
    res.status(201).json(u);
  });
});

router.put("/:id", (req, res) => {
  db.update(req.params.id, req.body)
    .then(u => {
      res.status(201).json(u);
    })
    .catch(err => console.log(err));
});

//custom middleware

// const idIsValid = id => {

// };

function validateUserId(req, res, next) {
  let ids = [];
  db.get(req.params.id)
    .then(l => {
      ids = l.map(guy => guy.id);
      // console.log(ids);
      // console.log(req.params.id);
      // console.log(ids.includes(Number(req.params.id)));
      if (!ids.includes(Number(req.params.id))) {
        res.status(400).json({ message: "user id not found" });
      }
    })
    .catch(err => console.log(err));
  next();
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "Name field is required" });
  }
  next();
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "Text field is required" });
  }
  next();
}

module.exports = router;
