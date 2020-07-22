const express = require("express");
const validateProject = require("../middleware/validateProject");
const validateProjectId = require("../middleware/validateProjectId");
const validateAction = require("../middleware/validateAction");

const Project = require("./projectModel");
const Action = require("../action/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  Project.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Could not retrieve data!"
      });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  Project.get(req.project.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Could not retrieve data!"
      });
    });
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  Project.getProjectActions(req.project.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Failed to retrieve projects action list!"
      });
    });
});

router.post("/", validateProject, (req, res) => {
  Project.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error saving the information!"
      });
    });
});

router.post("/:id/action", validateProjectId, validateAction, (req, res) => {
  req.body.project_id = req.project.id;
  Action.insert(req.body)
    .then(actionAdded => {
      res.status(201).json(actionAdded);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "failed to create action" });
    });
});

router.put("/:id", validateProjectId, (req, res) => {
  Project.update(req.project.id, req.body)
    .then(updatedProject => {
      res.status(200).json(updatedProject);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        Message: "Failed to update project!"
      });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  Project.remove(req.project.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "unable to delete project!"
      });
    });
});

module.exports = router;
