var express = require('express');
var router = express.Router();
var bidsContext = require('./../models').bids;
var userContext = require('./../models').users;
var jobContext = require('./../models').jobs;

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


//user views currents bids
router.get("/:jobId/currentbids", function(req, res, next){
    var jobId = req.param('jobId');
    var viewbids = bidsContext.findAll({
        where: {jobid: jobId}, 
        include: [{model: userContext
        }, 
        {model: jobContext}]


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

//update job bids
router.put("/:userId/currentbid/:bidId/updatebid", function(req,res,next){
    var userId = req.param('userId');
    var bidId = req.param('bidId');
    var updatebid = bidsContext.update(
        {amount: req.body["amount"]},
    {
        
        where:{
            userId: userId,
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
