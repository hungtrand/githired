var express = require('express');
var router = express.Router();
var allJobs = require('./../models').jobs;

router.get("/alljobs", function(req, res, next){
	res.setHeader('Content-Type', 'application/json');
	allJobs.findAll({
		
		attributes: ['jobId', 'jobTitle', 'jobDescription'
		, 'minimumWage', 'maximumWage', 'jobType'
		, 'position', 'startingDate', 'endDate'
		, 'location', 'userId']
	})
	.then(function(jobs){
		if(jobs){
			res.send(JSON.stringify(jobs));
		}else{
			res.sendStatus(401);
		}
	})
	.catch(function(err){
		res.send(JSON.stringify(err));
	})

});

module.exports = router;