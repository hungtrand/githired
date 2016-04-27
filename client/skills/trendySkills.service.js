module.exports = function($resource) {
    var url = "http://trendyskills.com/service";
    var trendySkills = $resource(
        url, 
        {
            callback: "JSON_CALLBACK",
            q: "keywords",
            like: "@query",
            key: "FjlgMNTrEU2eTRgi"
        }, 
        {
            getSkills: {
                method: "JSONP",
                isArray: false
            }
        }
    );

    return trendySkills;
}
