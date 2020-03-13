const Project = require('../project/projectModel');

module.exports = function validateProjectId(req, res, next){
    Project.get(req.params.id).then(project => {
        if(project === null){
            res.status(400).json({ message: "invalid user id" });
        } else {
            req.project = project;
            next();
        }
    })
}