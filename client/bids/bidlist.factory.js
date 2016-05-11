module.exports = function($resource) {
	var url = "/api/user/:userId/:jobId/:request";

	var resBidList = $resource(
		url,
		{
			userId: "@userId",
			jobId: "@jobId",
			request: "@aRequest"
		},
		{
			fetchBids: { method: 'GET', params: { request: 'currentbids' } }
		}
	);

	return resBidList;
}
