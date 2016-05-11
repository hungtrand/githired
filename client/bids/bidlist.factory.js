module.exports = function($resource) {
	var url = "/api/user/:userId/:requestParam1/:jobId/:requestParam2";

	var resBidList = $resource(
		url,
		{
			userId: "@userId",
			jobId: "@jobId",
			requestParam1: "@aRequestParam1",
			requestParam2: "@aRequestParam2"
		},
		{
			fetchBids: { method: 'GET', params: { request: 'currentbids' } }
		}
	);

	return resBidList;
}
