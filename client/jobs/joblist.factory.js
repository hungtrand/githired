module.exports = function($resource) {
	var url = "api/jobs";

	return $resource(url, {}, {
            search: { method: 'POST', isArray: true }
        });
}
