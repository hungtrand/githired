var express = require('express');
var router = express.Router();
var usersContext = require('./../models').users;
var skills = require('./../models').skills;
var userSkills = require('./../models').userSkills;
var jobContext = require('./../models').jobs;

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



module.exports = function(app) {
    app.use("/api/user", router);
}
