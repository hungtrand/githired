var express = require('express');
var router = express.Router();
var usersContext = require('./../models').users;

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


	// var user = usersContext.build({
	// 	FirstName: req.body["firstName"]
	// 	, LastName: req.body["lastName"]
	// 	, Company: req.body["company"]
	// 	, Email: req.body["email"]
	// 	, Password: req.body["password"]
	// 	, isEmployer: req.body["isEmployer"]
	// 	, isEmployee: req.body["isEmployee"]
	// });
	// // console.log(user);
	// user
	// 	.save()
	// 	.then(function(results) {
	//    		res.send(JSON.stringify(results.dataValues));
	// 	})
	// 	.catch(function(err) {
	// 		res.send(JSON.stringify(err));
	// 	})
	// ;
});

module.exports = router;