var express = require('express');
var router = express.Router();
var usersContext = require('./../models').users;

router.post("/signup", function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');

	var user = usersContext.build({
		firstName: req.body["firstName"]
		, lastName: req.body["lastName"]
		, company: req.body["company"]
		, email: req.body["email"]
		, password: req.body["password"]
		, isEmployer: req.body["isEmployer"]
		, isEmployee: req.body["isEmployee"]
	});
	
        user
		.save()
		.then(function(results) {
    		res.send(JSON.stringify(results.dataValues));
		})
		.catch(function(err) {
			res.send(JSON.stringify(err));
		})
	;
});

/* POST signin. Expecting params: @email, @password */
router.post("/signin", function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');

	usersContext
		.findOne({
			where: {
				email: req.body["email"],
				password: req.body["password"]
			},
			attributes: ['userId', 'email', 'firstName', 'lastName', 'company', 'isEmployer', 'isEmployee']
		})
		.then(function(user) {
			if (user) {
				res.send(JSON.stringify(user));
			} else {
				res.sendStatus(401);
			}
			
		})
		.catch(function(err) {
			res.send(JSON.stringify(err));
		})
	;
});

module.exports = function(app) {
    app.use("/api/user", router);
}
