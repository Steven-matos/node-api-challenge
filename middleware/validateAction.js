module.exports = function validateAction(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: " missing user data" });
  } else if (!req.body.description) {
    res.status(400).json({ message: "missing required name field" });
  } else if (!req.body.notes) {
    res.status(400).json({ message: "missing required description field" });
  } else {
    next();
  }
};
