var express = require('express');
var router = express.Router();
var usersContext = require('./../models').users;
var jobAcceptance = require('./../models').jobAcceptances;
var userjobs = require('./../models').jobs;


//userId 
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
//for employer views the accepted jobs and employees.
router.get("/:userId/acceptedJob/",function(req,res, next) {

	var userId = req.param('userId');

	var accepted = jobAcceptance.findAll({
		where:{
			userId: userId
		},
		include: [{model: usersContext, 

		}, {model: userjobs}] 
		,
		attributes: ['amount', 'finalized', 'createdAt'],
		
		// include: [{model: usersContext
		// }]
		
					


	}).then(function(accepted){
		if(!accepted){
			res.sendStatus(401);
		}else{
			res.send(JSON.stringify(accepted));
		}
	}).catch(function(err){
		res.send(JSON.stringify(err));
	});

});


router.get("/:userId/joboffers", function(req,res,next){
	var userId = req.params['userId'];

	jobAcceptance.findAll({
		where:{
			employeeId: userId
		},
		attributes: ['amount', 'createdAt', 'updatedAt']
		, include: [{model: userjobs
		,attributes: ['jobTitle', 'jobDescription', 'position', 'jobType', 'location']
		, include: [{model: usersContext
			, attributes: ['company']}]
	}]


	}).then(function(offers){
		if(offers){
			res.send(JSON.stringify(offers));
		}else{
			res.sendStatus(401);
		}
	}).catch(function(err){
		res.send(JSON.stringify(err));
	});
});



module.exports = function(app) {
    app.use("/api/user", router);
}
