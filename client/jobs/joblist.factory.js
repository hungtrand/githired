module.exports = function($resource) {
	var url = "api/user/alljobs";

	return $resource(url);
}