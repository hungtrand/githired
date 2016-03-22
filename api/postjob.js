var express = require('express');
var router = express.Router();
var usersContext = require('./../models/jobs');

router.post("/", function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');

	var job = jobsContext.build({
		JobTitle: req.body["jobTitle"]
		, JobDescription: req.body["jobDescription"]
		, MinimumWage: req.body["minWage"]
		, MaximumWage: req.body["maxWage"]
	});

	console.log(job);
});

module.exports = router;