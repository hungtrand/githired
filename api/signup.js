var express = require('express');
var router = express.Router();
var usersContext = require('./../models/users');

/* POST new signup. */
router.post("/", function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');

	var user = usersContext.build({
		FirstName: req.body["firstName"]
		, LastName: req.body["lastName"]
		, Company: req.body["company"]
		, Email: req.body["email"]
		, Password: req.body["password"]
		, isEmployer: req.body["isEmployer"]
		, isEmployee: req.body["isEmployee"]
	});
	// console.log(user);
	user
		.save()
		.then(function(results) {
    		res.send(JSON.stringify(results[0]));
		})
		.catch(function(err) {
			res.send(JSON.stringify(err));
		})
	;
});

module.exports = router;