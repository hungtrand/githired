var Sequelize = require('sequelize');

// initialize database connection
var database = require("./../database");

// load models
var models = [
    'users',
    'userSkills',
    'skills',
    'jobs',
    'jobSkills',
    'jobAcceptances',
    'comments',
    'bids'
    
];

models.forEach(function(model) {
    module.exports[model] = database.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
    m.comments.belongsTo(
        m.users, {
            foreignKey: 'userId',
            targetKey: 'userId'
        }
    );

    m.comments.belongsTo(
        m.jobs,{
            foreignKey: 'jobId',
            targetKey: 'jobId'
        }
    );
    m.jobs.belongsTo(
        m.users, {
            foreignKey: 'userId',
            targetKey: 'userId'
        }
    );

    m.jobAcceptances.belongsTo(
        m.jobs, {
            foreignKey: 'jobId',
            targetKey: 'jobId'
        }
    );

    m.jobAcceptances.belongsTo(
        m.users, {
            foreignKey: 'userId',
            targetKey: 'userId'
        }
    );

    m.bids.belongsTo(
        m.jobs, {
            foreignKey: 'jobId',
            targetKey: 'jobId'
        }
    );

    m.bids.belongsTo(
        m.users, {
            foreignKey: 'userId',
            targetKey: 'userId'
        }
    );

    m.jobs.belongsToMany(
        m.skills, {
            through: 'jobSkills',
            foreignKey: 'jobJobId',
            as: 'skills'
        }
    );

    m.users.belongsToMany(
        m.skills, {
            through: 'userSkills'
        }
    );

     m.jobAcceptances.belongsTo(
        m.users, {
            foreignKey: 'employeeId',
            targetKey: 'userId'
        }
    );



   
    
    database.sync();

})(module.exports);

// export connection
module.exports.database = database;
