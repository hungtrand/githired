var express = require('express');
var router = express.Router();
var usersContext = require('./../models').users;
var skills = require('./../models').skills;
var userSkills = require('./../models').userSkills;
var jobContext = require('./../models').jobs;

/**
 *  @api {Post} /api/user/signup   new user signup.
 *  @apiName Sign up
 *  @apiGroup Account
 *  @apiVersion 1.0.0
 *  
 *  @apiDescription Method Description : 
 *  User uses this method to create new account.
 *  @apiSampleRequest http://localhost:80/api/user/signup
 *  @apiSuccess {String} account The user is successfully signup an account.
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     
        {
         "firstName" : "Med",
         "lastName" : "Lee",
         "company" : "Medicloud",
         "email" : "med.lee@medicloudsjsu.org",
         "account" : "Succcess"

        }   
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "error": "Unauthorized!"
 *     }
 *  @apiPermission required
 *  @apiParam {number} amount user amount
 *  @apiParamExample {json} Request-Example:
 *     {
 *       "firstName": "med",
 *		 "lastName" : "lee",
 *		 "email" : "med.lee@medicloudsjsu.org",
 *		 "password" : "********",
 *		 "company" : "medicloud"
 *     }
 *  
 */
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
                , linkedin: req.body["linkedin"]
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
/**
 *  @api {Post} /api/user/signin   new user signup.
 *  @apiName Sign In
 *  @apiGroup Account
 *  @apiVersion 1.0.0
 *  
 *  @apiDescription Method Description : 
 *  User uses this method to log in to their account.
 *  @apiSampleRequest http://localhost:80/api/user/signin
 *  @apiSuccess {String} account The user is successfully logged into their account.
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     
        {
         "User log in success!"

        }   
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "error": "Unauthorized!"
 *     }
 *  @apiPermission required
 *  @apiParam {number} amount user amount
 *  @apiParamExample {json} Request-Example:
 *     {
 *      
 *		 "email" : "med.lee@medicloudsjsu.org",
 *		 "password" : "********"
 *		 
 *     }
 *  
 */
router.post("/signin", function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');

	usersContext
		.findOne({
			where: {
				email: req.body["email"],
				password: req.body["password"]
			},
			attributes: ['userId', 'email', 'firstName', 'lastName', 
                                'company', 'isEmployer', 'isEmployee', 'linkedin']
		})
		.then(function(user) {
			if (user) {
				res.send(JSON.stringify(user));
			} else {
				res.sendStatus(401);
			}
			
		})
		.catch(function(err) {
			res.send(500, JSON.stringify(err));
		})
	;
});

/* POST update user profile */
/**
 *  @api {Post} /api/user/:userId user update profile.
 *  @apiName Update profile
 *  @apiGroup Account
 *  @apiVersion 1.0.0
 *  
 *  @apiDescription Method Description : 
 *  User uses this method to update personal information on their account.
 *  @apiSampleRequest http://localhost:80/api/user/:userId
 *  @apiSuccess {String} account The user is successfully updated profile.
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     
        {
         "Profile is updated!"

        }   
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "error": "Unauthorized!"
 *     }
 *  @apiPermission required
 *  @apiParam {number} amount user amount
 *  @apiParamExample {json} Request-Example:
 *     {
 *       "linkedin": "***********\/linkedin.com"
 *     }
 *  
 */
router.post("/:userId", function(req, res, next) {
    var userId = req.params['userId'];
    usersContext
        .findOne({ where: {'userId': userId} })
        .then(function(user) {
            user.linkedin = req.body['linkedin'];
            user.save();
            res.send(200, user);
        })
        .catch(function(err) {
            res.send(500, JSON.stringify(err));
        });
    ;
});

router.get("/:userId/userjobs", function(req, res, next){
	res.setHeader('Content-Type', 'application/json');
	var id = req.param('userId');
	jobContext
		.findAll({
			where: {
				userId: id	
			},
			attributes: ['jobId', 'jobTitle', 'jobDescription'
				, 'minimumWage','maximumWage', 'jobType'
				, 'position', 'createdAt', 'endDate'
				, 'location', 'userId', 'rating']
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



module.exports = function(app) {
    app.use("/api/user", router);
}
