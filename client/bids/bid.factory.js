module.exports = function($resource) {
	// define the class
	var resBid = $resource(
		'/api/user/:userId/bids/:bidId',
		{
			userId: "@userid",
			bidId: "@bidId"
		},
		{
			create: { method: 'POST' },
                        rate: { method: 'PUT'}
		}
	);
	return resBid;
}
