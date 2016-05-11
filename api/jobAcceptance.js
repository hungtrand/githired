var express = require('express');
var router = express.Router();
var usersContext = require('./../models').users;
var jobAcceptance = require('./../models').jobAcceptances;
var userjobs = require('./../models').jobs;


//userId 
/**
 *  @api {post} /api/user/:userId/jobs/:jobId accept jobs.
 *  @apiName PostNewAcceptance
 *  @apiGroup Acceptance
 *  @apiVersion 1.0.0
 *  @apiParam {number} amount user amount
 	@apiParam {number} employeeId employee id
 *  @apiDescription Method Description : 
 *  Users use this method to accept jobs.
 *  @apiSampleRequest http://localhost:80/api/user/:userId/jobs/:jobId
 *  @apiSuccess {String} amount The amount of user's need.
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "amount": "50",
 *       "employeeId": "2"
 *     }
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "error": "Unauthorized!"
 *     }
 *  @apiPermission required
 *  @apiParamExample {json} Request-Example:
 *     {
 *       "amount": 50,
 		 "employeeId" : 2
 *     }
 *  
 */
router.post("/:userId/acceptjob/:jobId", function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	
	var created = Date.now();
	var tstamp = new Date().getTime();
	var userId = req.param('userId');
	var jobId = req.param('jobId');
	var acceptjob = jobAcceptance.build({
		amount: req.body["amount"]
		, finalized: req.body["finalized"]
		, jobId: jobId
		, userId: userId
		, employeeId: req.body["employeeId"]
		, timestamp: tstamp
		, createdAt: created
		, updatedAt: created
	});

	if(acceptjob.finalized == 0){
		res.send(JSON.stringify("Job is not accepted."));
	}else{
	
        acceptjob
		.save()
		.then(function(results) {
    		res.send(JSON.stringify(results.dataValues));
		})
		.catch(function(err) {
			res.send(JSON.stringify(err));
		})
	;

}});

//for employer views the accepted jobs and employees.
/**
 *  @api {get} /api/user/:userId/acceptedJob employer views current accepted jobs.
 *  @apiName Get Acceptance Job
 *  @apiGroup Acceptance
 *  @apiVersion 1.0.0
 *  @apiDescription Method Description : 
 *  Users use this method to view currently accepted jobs.
 *  @apiSampleRequest http://localhost:80/api/user/:userId/acceptedJob
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     
        [
    {
        "amount": 120,
        "finalized": true,
        "createdAt": "2016-05-09T21:08:28.000Z",
        "user": {
            "userId": 3,
            "firstName": "Shafira",
            "lastName": "Mcgowan",
            "company": "",
            "email": "tany@yahoo.com",
            "password": "Pa$$w0rd!",
            "isEmployer": null,
            "isEmployee": true,
            "linkedin": null,
            "createdAt": "2016-04-18T07:40:19.000Z",
            "updatedAt": "2016-04-18T07:40:19.000Z"
        },
        "job": {
            "jobId": 1,
            "jobTitle": "Software Engineering",
            "jobDescription": "Testing",
            "minimumWage": 30,
            "maximumWage": 50,
            "setWage": 35,
            "jobType": "Engineering",
            "position": "full time",
            "startingDate": null,
            "endDate": null,
            "location": "San Jose",
            "timestamp": null,
            "createdAt": null,
            "updatedAt": null,
            "userId": 1
        }
    },
    {
        "amount": 120,
        "finalized": true,
        "createdAt": "2016-05-09T21:17:09.000Z",
        "user": {
            "userId": 2,
            "firstName": "Hung",
            "lastName": "Tran",
            "company": "",
            "email": "hung.d.tran@sjsu.edu",
            "password": "Pa$$w0rd!",
            "isEmployer": false,
            "isEmployee": true,
            "linkedin": "https://www.linkedin.com/in/hungtrand0929",
            "createdAt": "2016-04-17T16:39:50.000Z",
            "updatedAt": "2016-05-10T07:55:34.000Z"
        },
        "job": {
            "jobId": 1,
            "jobTitle": "Software Engineering",
            "jobDescription": "Testing",
            "minimumWage": 30,
            "maximumWage": 50,
            "setWage": 35,
            "jobType": "Engineering",
            "position": "full time",
            "startingDate": null,
            "endDate": null,
            "location": "San Jose",
            "timestamp": null,
            "createdAt": null,
            "updatedAt": null,
            "userId": 1
        }
    }
]
    
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "error": "Unauthorized!"
 *     }
 *  @apiPermission required
 *  
 */
router.get("/:userId/acceptedJob/",function(req,res, next) {
	res.setHeader('Content-Type', 'application/json');
	var userId = req.param('userId');

	var accepted = jobAcceptance.findAll({
		where:{
			finalized: true,
			userId: userId
		},
		include: [{model: usersContext, 

		}, {model: userjobs}] 
		,
		attributes: ['amount', 'finalized', 'createdAt'],
		
		// include: [{model: usersContext
		// }]

	}).then(function(accepted){
		if(!accepted){
			res.sendStatus(401);
		}else{
			res.send(JSON.stringify(accepted));
		}
	}).catch(function(err){
		res.send(JSON.stringify(err));
	});

});

//employee views accepted jobs serves as offers
/**
 *  @api {get} /api/user/:userId/joboffers employee views current job offers .
 *  @apiName Job Offers
 *  @apiGroup Acceptance
 *  @apiVersion 1.0.0
 *  @apiDescription Method Description : 
 *  Users use this method to view currently job offering.
 *  @apiSampleRequest http://localhost:80/api/user/:userId/joboffers
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     
	[
	    {
	        "amount": 120,
	        "createdAt": "2016-05-09T21:17:09.000Z",
	        "updatedAt": "2016-05-09T21:17:09.000Z",
	        "job": {
	            "jobTitle": "Software Engineering",
	            "jobDescription": "Testing",
	            "position": "full time",
	            "jobType": "Engineering",
	            "location": "San Jose",
	            "user": {
	                "company": "GitHired"
	            }
	        }
	    }
	]
    
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "error": "Unauthorized!"
 *     }
 *  @apiPermission required
 *  
 */
router.get("/:userId/joboffers", function(req,res,next){
	res.setHeader('Content-Type', 'application/json');
	var userId = req.param('userId');
	console.log(userId);
	var check = jobAcceptance.findAll({
		where: {finalized: true,
			employeeId: userId}

	}).then(function(results){
		if(results !== null){
			jobAcceptance.findAll({
		where:{
			employeeId: userId
		},
		attributes: ['amount', 'createdAt', 'updatedAt']
		, include: [{model: userjobs
		,attributes: ['jobTitle', 'jobDescription', 'position', 'jobType', 'location']
		, include: [{model: usersContext
			, attributes: ['company']}]
	}]


	}).then(function(offers){
		if(offers){
			res.send(JSON.stringify(offers));
		}else{
			res.sendStatus(401);
		}
	}).catch(function(err){
		res.send(JSON.stringify(err));
	});
		}else{
			res.send(JSON.stringify("User does not have offer yet!"));
		}
	});
	
});


/**
 *  @api {put} /api/user/:userId/acceptedjobs/:acceptanceId employer update his/her finalized decision.
 *  @apiName UPDATE EMPLOYEEMENT STAGE
 *  @apiGroup Acceptance
 *  @apiVersion 1.0.0
 *  
 *  @apiDescription Method Description : 
 *  Employer uses this method to change his/her currently accepted jobs.
 *  @apiSampleRequest http://localhost:80/api/user/:userId/acceptedjobs/:acceptanceId
 *  @apiSuccess {String} Finalized The yes or no decision from employer.
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     
        {
         Decision has been changed!
        }   
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "error": "Unauthorized!"
 *     }
 *  @apiPermission required
 *  @apiParam {boolean} finalized user's decision
 *  @apiParamExample {json} Request-Example:
 *     {
 *       "finalized": 0
 *     }
 *  
 */	
router.put("/:userId/acceptedjobs/:acceptanceId",function(req,res,next){
	res.setHeader('Content-Type', 'application/json');
	var userId = req.param("userId");
	var acceptanceId = req.param("acceptanceId");
	jobAcceptance.update(
		{finalized: req.body["finalized"]
		,updatedAt: Date.now()}
		, {where: {userId: userId,
			acceptanceId: acceptanceId}
		}
		).then(function(results){
		res.send(JSON.stringify("Decision has been changed!"));
	}).catch(function(err){
		res.send(JSON.stringify(err));
	});
});

module.exports = function(app) {
    app.use("/api/user", router);
}
