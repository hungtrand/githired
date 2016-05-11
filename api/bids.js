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
 *  @apiParam {number} userId employeeId
 *  @apiDescription Method Description : 
 *  Users use this method to bid the job.
 *  @apiSampleRequest http://localhost:80/api/user/:userId/bids
 *  @apiSuccess {String} amount The amount of user bid.
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "amount": "200",
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


//employer views currents bids
/**
 *  @api {get} /api/user/jobs/:jobId/currentbids current biders and their amount.
 *  @apiName Get current bids
 *  @apiGroup Bids
 *  @apiVersion 1.0.0
 *  @apiParam {number} jobId currentJobId
 *  @apiDescription Method Description: 
 *  Employer uses this method to view the current bids.
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
