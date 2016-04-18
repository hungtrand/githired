module.exports = function($resource) {
	var url = "/api/jobs/:jobId";

	// $resource will return a 'Class' object that can instantiated with 
	// 'var aJob = jobClass.get({jobId: 1})' to get retrieve data for a particular job
	// available methods are : angular built-in methods are: aJob.get(), aJob.save(), aJob.delete()
	var jobClass = $resource(url, { jobId: '@id' });

	// you can add additional method such as:
	jobClass.prototype.addBid = function(bid) { 
		// this is only example
		// TODO: make sure implement it to ensure highest bid on top
		jobClass.bids.push(bid); 
	} 

	// TODO: create methods to delete bid

	// TODO: 


	return jobClass;
}