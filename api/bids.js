var express = require('express');
var router = express.Router();
var bidsContext = require('./../models').bids;

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

module.exports = function(app) {
    app.use("/api/user/", router);
};
