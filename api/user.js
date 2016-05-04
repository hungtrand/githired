var express = require('express');
var router = express.Router();
var usersContext = require('./../models').users;
var skills = require('./../models').skills;
var userSkills = require('./../models').userSkills;

router.post("/signup", function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');

	var user = usersContext.build({
		firstName: req.body["firstName"]
		, lastName: req.body["lastName"]
		, company: req.body["company"]
		, email: req.body["email"]
		, password: req.body["password"]
		, isEmployer: req.body["isEmployer"]
		, isEmployee: req.body["isEmployee"]
	});
	
        user
		.save()
		.then(function(results) {
    		res.send(JSON.stringify(results.dataValues));
		})
		.catch(function(err) {
			res.send(JSON.stringify(err));
		})
	;
});

/* POST signin. Expecting params: @email, @password */
router.post("/signin", function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');

	usersContext
		.findOne({
			where: {
				email: req.body["email"],
				password: req.body["password"]
			},
			attributes: ['userId', 'email', 'firstName', 'lastName', 'company', 'isEmployer', 'isEmployee']
		})
		.then(function(user) {
			if (user) {
				res.send(JSON.stringify(user));
			} else {
				res.sendStatus(401);
			}
			
		})
		.catch(function(err) {
			res.send(JSON.stringify(err));
		})
	;
});


router.post("/:skill", function(req, res, next){
	var temp = new Array();
	// var a = ['Software Engineering', 'Computer', 'Bio'];
	//for(var i=0; i<a.length; i++){
	// res.setHeader('Content-Type', 'application/json');
	// var id = [];
	// id = req.param('skill');
	// var tempSplite = id.split(",\ ");
	// // id.push(tempSplite[1]);
	
	// for(var i=0; i<tempSplite.length; i++){
	// 	var checker = tempSplite[i];
	// 	console.log(checker);
	// }

	var a = req.body["name"];
	// temp.push(a);
	// console.log(a);
	// console.log(a.length);
	// console.log("---------");
	// console.log(temp);
	// console.log("99999999");
	var j;
	for(var i=0; i<a.length; i++){
		console.log(a[i]);
		 j = skills.findOne({
			where:{
				name: a[i]
			},
			attributes: ['name']
		});

		j.then(function(skills){
			if(!skills){
			var skill = skills.build({
			namename: a[i]
			});
			skill.save()
			.then(function(results) {
    		res.send(JSON.stringify(results.dataValues));
			})
			.catch(function(err) {
				res.send(JSON.stringify(err));
			});
			next();
		}else{
			console.log("99999999999999");
			console.log(JSON.stringify(j));
			console.log("------------------");
		}});
	}

		



// 	for(var i=0; i<tempSplite.length; i++){
// 		var chcker = tempSplite[i];
// 		res.send(chcker);
// 		var d = skills.findOne({
// 			where: {
// 				name: chcker
// 			},
// 			attributes: ['name']
// 		}


// 		(function(skills){
// 			if(skills){
// 				// id.push(skills[i]);
// 				res.send(("foundoneYO"));
// 				// next();
// 				next();
	
// 			}else{
// 				res.send(("just c found!"));
// 			}
// 		}));
		
// 		// res.send(JSON.stringify(d));
// // tempSplite.splice(i,1);
		
// 	}


	// var newArray = id.split("/,[]/");

	// var userSkill = skills
	// 	.findOne({
	// 		where: {
	// 			name: id
	// 		},
	// 		attributes: ['name']
	// 	});
	// res.send(JSON.stringify(userSkill));
	
		
		
		
	//}
});



// router.get("/:skills", function(req, res, next){
// 	res.setHeader('Content-Type', 'application/json');
// 	// var id = req.param('userId');

// 	var skillName = req.param('skills');
// 	console.log(skillName);
// 	skills
// 		.findOne({
// 			where:{
// 				name: skillName
// 			},
// 			attributes:['name']
// 		})
// 		.then(function(skills){
// 			res.send(JSON.stringify(skills));
// 		})





// 	// for (var i = 0; i<skillName.length; i++) {
// 		// checker += skillName;
// 		// var result = skills.find({
// 		// 	where:{
// 		// 		name: skillName
// 		// 	},
// 		// 	attributes:['name']
// 		// });
// 		// if(checker != null){
// 		// 	console.log("The data is saving in database.");
// 		// }else{
// 		// 	console.log("the data is exists");
// 		// }
// 	// }
	


// 	// 
	
// 	// console.log(skillName[i]);
	
// 	// if(skillName[i] == findSkill){
// 	// 	console.log("Skill exists.");
// 	// }else{
// 	// 	console.log("Saving.");
// 	// }

// 	// }
	

	
// 	// var userNewSkills = userSkills.build({

// 	// });

// 	// var newSkills = skills.build({
// 	// 	name: req.body["name"]
// 	// });
// 	// newSkills.save()
// 	// .then(function(results){
// 	// 	res.send(JSON.stringify(results.davaValues));
// 	// })
// 	// .catch(function(err){
// 	// 	res.send(JSON.stringify(err));
// 	// });
// });




module.exports = function(app) {
    app.use("/api/user", router);
}
