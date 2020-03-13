const express = require("express");
const validateActionId = require("../middleware/validateActionId");

const Action = require("./actionModel");
const Project = require("../project/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  Action.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Could not retrieve data!"
      });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  Action.get(req.action.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Could not retrieve data!"
      });
    });
});

router.put("/:id", validateActionId, (req, res) => {
  Action.update(req.action.id, req.body)
    .then(updateAction => {
      res.status(200).json(updateAction);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        Message: "Failed to update project!"
      });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  Action.remove(req.action.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "unable to delete action!"
      });
    });
});

module.exports = router;
