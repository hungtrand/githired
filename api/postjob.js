var express = require('express');
var router = express.Router();
var jobsContext = require('./../models/jobs');

router.post("/", function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');

	var job = jobsContext.build({
		JobTitle: req.body["inputJobTitle"]
		, JobDescription: req.body["inputJobDescription"]
		, MinimumWage: req.body["minWage"]
		, MaximumWage: req.body["maxWage"]
		, SetWage: req.body["setWage"]
	});

	// console.log(job);
	job
		.save()
		.then(function(results) {
			res.send(JSON.stringify(results.dataValues));
		})
		.catch(function(err) {
			res.send(JSON.stringify(err));
		})
	;
});

module.exports = router;