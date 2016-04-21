var express = require('express');
var router = express.Router();
var userJobs = require('./../models').jobs;

router.get("/:userId/userjobs", function(req, res, next){
	res.setHeader('Content-Type', 'application/json');
	var id = req.param('userId');
	userJobs
		.findAll({
			where: {
				userId: id	
			},
			attributes: ['jobId', 'jobTitle', 'jobDescription'
				, 'minimumWage','maximumWage', 'jobType'
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

