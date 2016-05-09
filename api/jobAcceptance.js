var express = require('express');
var router = express.Router();
var usersContext = require('./../models').users;
var jobAcceptance = require('./../models').jobAcceptances;

router.post("/:userId/acceptjob/:jobId", function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	
	var created = Date.now();
	var tstamp = new Date().getTime();
	var userId = req.param('userId');
	var jobId = req.param('jobId');
	var acceptjob = jobAcceptance.build({
		amount: req.body["amount"]
		, finalized: req.body["finalized"]
		, jobId: jobId
		, userId: userId
		, employeeId: req.body["employeeId"]
		, timestamp: tstamp
		, createdAt: created
		, updatedAt: created
	});

	if(acceptjob.finalized == 0){
		res.send(JSON.stringify("Job is not accepted."));
	}else{
	
        acceptjob
		.save()
		.then(function(results) {
    		res.send(JSON.stringify(results.dataValues));
		})
		.catch(function(err) {
			res.send(JSON.stringify(err));
		})
	;

}});

router.get("/:userId/acceptedJob/",function(req,res, next) {

	var userId = req.param('userId');

	




});


	

module.exports = function(app) {
    app.use("/api/user", router);
}
