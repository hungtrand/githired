var express = require('express');
var router = express.Router();
var bidsContext = require('./../models').bids;
var userContext = require('./../models').users;
var jobContext = require('./../models').jobs;


/**
 *  @api {post} /api/user/:userId/bids biding amount.
 *  @apiName PostNewBids
 *  @apiGroup employees
 *  @apiVesion 1.0.0
 *  @api
 *  @apiParam {number} userId employeeId
 */
router.post("/:userId/bids", function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var created = Date.now();
    var bid = bidsContext.build({
        userId: req.params["userId"]
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
});


//employer views currents bids
/**
 *  @api {get} /api/user/jobs/:jobId/currentbids viewing current bids amount and users for job with jodid.
 *  @apiName GetCurrentBids
 *  @apiGroup currentBids
 *  @apiVesion 1.0.0
 *  @api
 *  @apiParam {number} jobId jobId
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
