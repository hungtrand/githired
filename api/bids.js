var express = require('express');
var router = express.Router();
var bidsContext = require('./../models').bids;
var userContext = require('./../models').users;
var jobContext = require('./../models').jobs;


/**
 *  @api {post} /api/user/:userId/bids biding amount.
 *  @apiName PostNewBids
 *  @apiGroup Bids
 *  @apiVersion 1.0.0
 *  @apiParam {number} amount user amount
 *  @apiDescription Method Description : 
 *  Users use this method to bid the job.
 *  @apiSampleRequest http://localhost:80/api/user/:userId/bids
 *  @apiSuccess {String} amount The amount of user's bid.
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "amount": "50",
 *       "createdAt": "2016-05-11"
 *     }
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "error": "Unauthorized!"
 *     }
 *  @apiPermission required
 *  @apiParamExample {json} Request-Example:
 *     {
 *       "amount": 50
 *     }
 *  
 */
router.get("/:userId/bids", function(req, res, next) {
    var userId = req.params['userId'];
    bidsContext.findAll({
        where: { userId: userId },
        include: [
            { 
                model: jobContext, 
                as: 'job',
                include: [
                    userContext
                ]
            }
        ]
    }).then(function(bids) {
        res.send(200, bids);
    }).catch(function(err) {
        res.send(500, err);
    });
});

router.post("/:userId/bids", function(req, res, next){
    var userId = req.param('userId');
    var created = Date.now();
    
    var checker = bidsContext.findOne({
        where: {
            userId: userId,
            jobId: req.body["jobId"]
        }
    }).then(function(result){
        if(result !== null){
            res.send(JSON.stringify("User already Bid!"));
        }else{
        
        var bid = bidsContext.build({
        userId: userId
        , jobId: req.body["jobId"]
        , timestamp: created
        , createdAt: created
        , updatedAt: created
        , amount: req.body["bidAmount"]
    });

    

    // console.log(bid);
    bid
        .save()
        .then(function(results) {
            res.send(JSON.stringify(results.dataValues));
        })
        .catch(function(err) {
            res.send(JSON.stringify(err));
        });
        }
    }).catch(function(err){
        res.send(JSON.stringify(err));
    });
});


/**
 *  @api {get} /api/user/jobs/:jobId/currentbids employer views current bids.
 *  @apiName GETBIDS
 *  @apiGroup Bids
 *  @apiVersion 1.0.0
 *  @apiDescription Method Description : 
 *  Users use this method to view currently getting bidded job.
 *  @apiSampleRequest http://localhost:80/api/user/jobs/:jobId/currentbids
 *  @apiSuccess {String} amount The amount of user's bid.
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     
        {
        "bidId": 1,
        "amount": 190,
        "timestamp": "2016-05-10T07:13:25.000Z",
        "createdAt": "2016-05-10T07:13:25.000Z",
        "updatedAt": "2016-05-10T19:40:43.000Z",
        "jobId": 3,
        "userId": 1,
        "user": {
            "userId": 1,
            "firstName": "tester",
            "lastName": "",
            "company": "GitHired",
            "email": "lupabiwy@yahoo.com",
            "linkedin": null
        },
        "job": {
            "jobId": 3,
            "jobTitle": "Application Developer",
            "jobDescription": "Software Developer",
            "minimumWage": 25,
            "setWage": 30,
            "jobType": "App Developer",
            "position": "full time",
            "startingDate": null
            }
        }
    
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "error": "Unauthorized!"
 *     }
 *  @apiPermission required
 *  @apiParamExample {json} Request-Example:
 *     {
 *       "amount": 50
 *     }
 *  
 */
router.get("/jobs/:jobId/currentbids", function(req, res, next){
    res.setHeader('Content-Type', 'application/json');
    var jobId = req.param('jobId');
    var viewbids = bidsContext.findAll({
        where: {jobid: jobId}, 
        include: [{model: userContext
            , attributes: ['userId','firstName', 'lastName', 'company', 'email', 'linkedin']
        }, 
        {model: jobContext, attributes: ['jobId','jobTitle', 'jobDescription', 'minimumWage', 'setWage', 'jobType', 'position', 'startingDate']}]


    }).then(function(bids){
        if(bids){
            res.send(JSON.stringify(bids));
        }else{
            res.sendStatus(401);
        }
    }).catch(function(err){
        res.send(JSON.stringify(err));
    });
});


//employee views his/her current bid on specified job.
/**
 *  @api {get} /api/user/:userId/jobs/:jobId/currentbid/:bidId employee views his/her current bidding amount.
 *  @apiName GETMYBIDS
 *  @apiGroup Bids
 *  @apiVersion 1.0.0
 *  
 *  @apiDescription Method Description : 
 *  Employee uses this method to view his/her currently bidding amount on the job that belong to job id.
 *  @apiSampleRequest http://localhost:80/api/user/:userId/jobs/:jobId/currentbid/:bidId
 *  @apiSuccess {String} amount The amount of user's bid.
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     
        {
    "amount": 200,
    "createdAt": "2016-05-10T20:32:48.000Z",
    "updatedAt": "2016-05-11T00:00:29.000Z",
    "job": {
        "jobTitle": "tester",
        "jobDescription": "qa skillz",
        "minimumWage": 8,
        "maximumWage": 12,
        "jobType": null,
        "position": null,
        "startingDate": null,
        "location": "396 Keyes St, San Jose, CA 95112, USA",
        "user": {
            "firstName": "Bhargava",
            "lastName": "Ramisetty",
            "company": "GitHired Inc.",
            "email": "bhargava@email.com",
            "linkedin": null
        }
    }
}
    
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "error": "Unauthorized!"
 *     }
 *  @apiPermission required
 *  
 *  
 */
router.get("/:userId/jobs/:jobId/currentbid/:bidId", function(req, res, next){
    res.setHeader('Content-Type','application/json');
    var userId = req.param('userId');
    var jobId = req.param('jobId');
    var bidId = req.param('bidId');
    var reviewCurrentBid = bidsContext.findOne({
        where: {
            userId: userId
            ,jobId: jobId
            ,bidId: bidId
        }, 
        attributes: ['amount', 'createdAt', 'updatedAt'],
        include: [{model: jobContext 
            , attributes: ['jobTitle','jobDescription', 'minimumWage'
            , 'maximumWage', 'jobType', 'position', 'startingDate', 'location'],
            include: [{model: userContext, 
                attributes: ['firstName', 'lastName', 'company', 'email', 'linkedin']}]
        }]
    }).then(function(bid){
        if(bid){
            res.send(JSON.stringify(bid));
        }else{
            res.sendStatus(401);
        }
    }).catch(function(err){
        res.send(JSON.stringify(err));
    });
});

//update job bids
/**
 *  @api {put} /api/user/:userId/jobs/:jobId/currentbid/:bidId/updatebid employee update his/her current bids.
 *  @apiName UPDATECURRENTBID
 *  @apiGroup Bids
 *  @apiVersion 1.0.0
 *  
 *  @apiDescription Method Description : 
 *  Employee uses this method to change his/her currently bidding amount on the job that belong to job id.
 *  @apiSampleRequest http://localhost:80/api/user/:userId/jobs/:jobId/currentbid/:bidId/updatebid
 *  @apiSuccess {String} amount The amount of user's bid.
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     
        {
         ammount updated!
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
 *       "amount": 100
 *     }
 *  
 */
router.put("/:userId/jobs/:jobId/currentbid/:bidId/updatebid", function(req,res,next){
    res.setHeader('Content-Type', 'application/json');
    var userId = req.param('userId');
    var jobId = req.param('jobId');
    var bidId = req.param('bidId');
    var utime = Date.now();
    var updatebid = bidsContext.update(
        {amount: req.body["amount"]
        ,updatedAt: utime}
        , {
        
        where:{
            userId: userId,
            jobId: jobId,
            bidId: bidId
        }
        
    }).then(function(result){
        res.send(JSON.stringify("ammount updated!"));
    }).catch(function(err){
        res.send(JSON.stringify(err));
    });
});





module.exports = function(app) {
    app.use("/api/user/", router);
};
