module.exports = function($resource) {
    var url = "/api/user/:userId/skills"

    var mySkills = $resource(
        url, 
        {
            userId: '@id'
        }
    );

    return mySkills;
}
