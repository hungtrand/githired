var express = require('express');
var router = express.Router();
var usersContext = require('./../models').users;

/* POST new signup. */
/**
 *	@api {post} /api/user/	user sign up an account.
 *	@apiName	Create an account.
 *	@apiGroup	Account
 *	@apiVersion	1.0.0
 *	@apiDescription	Method	Description : 
 *	User uses this method to create a new account.
 *	@apiSampleRequest http://localhost:80/api/user/
 *	@apiSuccess	{String} The user successfully created an account.
 *	@apiSuccessExample {json} Success-Response:
 *		HTTP/1.1 200 OK
 *		{
			"firstName" : "star",
			"lastName" : "green",
			"company" : "greeStar",
			"email" : "green.star@smejdsu.org",
			"success" : "Account creation is successful"
 		}
 		@apiErrorExample 	{json} Error-Response:
 		HTTP/1.1 401 Not Found
 		{
			"error" : "Unauthorized!"
 		}
 		@apiPermission required
		@apiParamExample {json} Request-Example:
			{
				"firstName" : "star",
				"lastName" : "green",
				"company" : "greenStar",
				"email" : "green.star.smejdsu.org",
				"password" : "*******",
				"isEmplyoee" :  "1"
			}
 */
router.post("/", function(req, res, next) {
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
	// console.log(user);
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

module.exports = router;