const Action = require("../action/actionModel");

module.exports = function validateProjectId(req, res, next) {
  Action.get(req.params.id).then(action => {
    if (action === null) {
      res.status(400).json({ message: "invalid action id" });
    } else {
      req.action = action;
      next();
    }
  });
};
