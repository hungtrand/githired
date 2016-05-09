var express = require('express');
var router = express.Router();
var usersContext = require('./../models').users;
var jobAcceptance = require('./../models').jobAcceptances;

router.post("/:userId/acceptjob/:jobId", function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	
	var created = Date.now();
	var userId = req.param('userId');
	var jobId = req.param('jobId');
	var acceptjob = jobAcceptance.build({
		amount: req.body["amount"]
		, finalized: req.body["finalized"]
		, jobId: jobId
		, userId: userId
		, createdAt: created
		, updatedAt: created
	});
	
        acceptjob
		.save()
		.then(function(results) {
    		res.send(JSON.stringify(results.dataValues));
		})
		.catch(function(err) {
			res.send(JSON.stringify(err));
		})
	;
});


	

module.exports = function(app) {
    app.use("/api/user", router);
}
