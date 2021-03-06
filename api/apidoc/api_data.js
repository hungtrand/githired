define({ "api": [
  {
    "type": "get",
    "url": "/api/user/:userId/acceptedJob",
    "title": "employer views current accepted jobs.",
    "name": "Get_Acceptance_Job",
    "group": "Acceptance",
    "version": "1.0.0",
    "description": "<p>Method Description : Users use this method to view currently accepted jobs.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/:userId/acceptedJob"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    \n        [\n    {\n        \"amount\": 120,\n        \"finalized\": true,\n        \"createdAt\": \"2016-05-09T21:08:28.000Z\",\n        \"user\": {\n            \"userId\": 3,\n            \"firstName\": \"Shafira\",\n            \"lastName\": \"Mcgowan\",\n            \"company\": \"\",\n            \"email\": \"tany@yahoo.com\",\n            \"password\": \"Pa$$w0rd!\",\n            \"isEmployer\": null,\n            \"isEmployee\": true,\n            \"linkedin\": null,\n            \"createdAt\": \"2016-04-18T07:40:19.000Z\",\n            \"updatedAt\": \"2016-04-18T07:40:19.000Z\"\n        },\n        \"job\": {\n            \"jobId\": 1,\n            \"jobTitle\": \"Software Engineering\",\n            \"jobDescription\": \"Testing\",\n            \"minimumWage\": 30,\n            \"maximumWage\": 50,\n            \"setWage\": 35,\n            \"jobType\": \"Engineering\",\n            \"position\": \"full time\",\n            \"startingDate\": null,\n            \"endDate\": null,\n            \"location\": \"San Jose\",\n            \"timestamp\": null,\n            \"createdAt\": null,\n            \"updatedAt\": null,\n            \"userId\": 1\n        }\n    },\n    {\n        \"amount\": 120,\n        \"finalized\": true,\n        \"createdAt\": \"2016-05-09T21:17:09.000Z\",\n        \"user\": {\n            \"userId\": 2,\n            \"firstName\": \"Hung\",\n            \"lastName\": \"Tran\",\n            \"company\": \"\",\n            \"email\": \"hung.d.tran@sjsu.edu\",\n            \"password\": \"Pa$$w0rd!\",\n            \"isEmployer\": false,\n            \"isEmployee\": true,\n            \"linkedin\": \"https://www.linkedin.com/in/hungtrand0929\",\n            \"createdAt\": \"2016-04-17T16:39:50.000Z\",\n            \"updatedAt\": \"2016-05-10T07:55:34.000Z\"\n        },\n        \"job\": {\n            \"jobId\": 1,\n            \"jobTitle\": \"Software Engineering\",\n            \"jobDescription\": \"Testing\",\n            \"minimumWage\": 30,\n            \"maximumWage\": 50,\n            \"setWage\": 35,\n            \"jobType\": \"Engineering\",\n            \"position\": \"full time\",\n            \"startingDate\": null,\n            \"endDate\": null,\n            \"location\": \"San Jose\",\n            \"timestamp\": null,\n            \"createdAt\": null,\n            \"updatedAt\": null,\n            \"userId\": 1\n        }\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "filename": "./jobAcceptance.js",
    "groupTitle": "Acceptance"
  },
  {
    "type": "get",
    "url": "/api/user/:userId/joboffers",
    "title": "employee views current job offers .",
    "name": "Job_Offers",
    "group": "Acceptance",
    "version": "1.0.0",
    "description": "<p>Method Description : Users use this method to view currently job offering.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/:userId/joboffers"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    \n\t[\n\t    {\n\t        \"amount\": 120,\n\t        \"createdAt\": \"2016-05-09T21:17:09.000Z\",\n\t        \"updatedAt\": \"2016-05-09T21:17:09.000Z\",\n\t        \"job\": {\n\t            \"jobTitle\": \"Software Engineering\",\n\t            \"jobDescription\": \"Testing\",\n\t            \"position\": \"full time\",\n\t            \"jobType\": \"Engineering\",\n\t            \"location\": \"San Jose\",\n\t            \"user\": {\n\t                \"company\": \"GitHired\"\n\t            }\n\t        }\n\t    }\n\t]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "filename": "./jobAcceptance.js",
    "groupTitle": "Acceptance"
  },
  {
    "type": "post",
    "url": "/api/user/:userId/jobs/:jobId",
    "title": "accept jobs.",
    "name": "PostNewAcceptance",
    "group": "Acceptance",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "amount",
            "description": "<p>user amount</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "employeeId",
            "description": "<p>employee id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "   {\n     \"amount\": 50,\n\t\t \"employeeId\" : 2\n   }",
          "type": "json"
        }
      ]
    },
    "description": "<p>Method Description : Users use this method to accept jobs.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/:userId/jobs/:jobId"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>The amount of user's need.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"amount\": \"50\",\n  \"employeeId\": \"2\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "filename": "./jobAcceptance.js",
    "groupTitle": "Acceptance"
  },
  {
    "type": "put",
    "url": "/api/user/:userId/acceptedjobs/:acceptanceId",
    "title": "employer update his/her finalized decision.",
    "name": "UPDATE_EMPLOYEEMENT_STAGE",
    "group": "Acceptance",
    "version": "1.0.0",
    "description": "<p>Method Description : Employer uses this method to change his/her currently accepted jobs.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/:userId/acceptedjobs/:acceptanceId"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Finalized",
            "description": "<p>The yes or no decision from employer.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n    {\n     Decision has been changed!\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "finalized",
            "description": "<p>user's decision</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"finalized\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./jobAcceptance.js",
    "groupTitle": "Acceptance"
  },
  {
    "type": "put",
    "url": "/api/user/:userId/offferedjobs/:acceptanceId",
    "title": "employee update his/her finalized decision.",
    "name": "UPDATE_EMPLOYEEMENT_STAGE",
    "group": "Acceptance",
    "version": "1.0.0",
    "description": "<p>Method Description : Employee uses this method to change his/her currently accepted jobs.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/:userId/offeredjobs/:acceptanceId"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Finalized",
            "description": "<p>The yes or no decision from employee.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n    {\n     Decision has been changed!\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "finalized",
            "description": "<p>user's decision</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"finalized\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./jobAcceptance.js",
    "groupTitle": "Acceptance"
  },
  {
    "type": "post",
    "url": "/api/user/",
    "title": "user sign up an account.",
    "name": "Create_an_account_",
    "group": "Account",
    "version": "1.0.0",
    "description": "<p>Method\tDescription : \tUser uses this method to create a new account.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "The",
            "description": "<p>user successfully created an account.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\t\tHTTP/1.1 200 OK\n\t\t{\n\t\t\t\"firstName\" : \"star\",\n\t\t\t\"lastName\" : \"green\",\n\t\t\t\"company\" : \"greeStar\",\n\t\t\t\"email\" : \"green.star@smejdsu.org\",\n\t\t\t\"success\" : \"Account creation is successful\"\n \t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": " \t\tHTTP/1.1 401 Not Found\n \t\t{\n\t\t\t\"error\" : \"Unauthorized!\"\n \t\t}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t\"firstName\" : \"star\",\n\t\"lastName\" : \"green\",\n\t\"company\" : \"greenStar\",\n\t\"email\" : \"green.star.smejdsu.org\",\n\t\"password\" : \"*******\",\n\t\"isEmplyoee\" :  \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./signup.js",
    "groupTitle": "Account"
  },
  {
    "type": "Post",
    "url": "/api/user/signin",
    "title": "new user signup.",
    "name": "Sign_In",
    "group": "Account",
    "version": "1.0.0",
    "description": "<p>Method Description : User uses this method to log in to their account.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/signin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>The user is successfully logged into their account.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n    {\n     \"User log in success!\"\n\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "amount",
            "description": "<p>user amount</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "    {\n     \n\t\t \"email\" : \"med.lee@medicloudsjsu.org\",\n\t\t \"password\" : \"********\"\n\t\t \n    }",
          "type": "json"
        }
      ]
    },
    "filename": "./user.js",
    "groupTitle": "Account"
  },
  {
    "type": "Post",
    "url": "/api/user/signup",
    "title": "new user signup.",
    "name": "Sign_up",
    "group": "Account",
    "version": "1.0.0",
    "description": "<p>Method Description : User uses this method to create new account.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/signup"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>The user is successfully signup an account.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n    {\n     \"firstName\" : \"Med\",\n     \"lastName\" : \"Lee\",\n     \"company\" : \"Medicloud\",\n     \"email\" : \"med.lee@medicloudsjsu.org\",\n     \"account\" : \"Succcess\"\n\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "amount",
            "description": "<p>user amount</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "    {\n      \"firstName\": \"med\",\n\t\t \"lastName\" : \"lee\",\n\t\t \"email\" : \"med.lee@medicloudsjsu.org\",\n\t\t \"password\" : \"********\",\n\t\t \"company\" : \"medicloud\"\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "./user.js",
    "groupTitle": "Account"
  },
  {
    "type": "Post",
    "url": "/api/user/:userId",
    "title": "user update profile.",
    "name": "Update_profile",
    "group": "Account",
    "version": "1.0.0",
    "description": "<p>Method Description : User uses this method to update personal information on their account.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/:userId"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>The user is successfully updated profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n    {\n     \"Profile is updated!\"\n\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "amount",
            "description": "<p>user amount</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"linkedin\": \"***********\\/linkedin.com\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./user.js",
    "groupTitle": "Account"
  },
  {
    "type": "get",
    "url": "/api/user/jobs/:jobId/currentbids",
    "title": "employer views current bids.",
    "name": "GETBIDS",
    "group": "Bids",
    "version": "1.0.0",
    "description": "<p>Method Description : Users use this method to view currently getting bidded job.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/jobs/:jobId/currentbids"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>The amount of user's bid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n    {\n    \"bidId\": 1,\n    \"amount\": 190,\n    \"timestamp\": \"2016-05-10T07:13:25.000Z\",\n    \"createdAt\": \"2016-05-10T07:13:25.000Z\",\n    \"updatedAt\": \"2016-05-10T19:40:43.000Z\",\n    \"jobId\": 3,\n    \"userId\": 1,\n    \"user\": {\n        \"userId\": 1,\n        \"firstName\": \"tester\",\n        \"lastName\": \"\",\n        \"company\": \"GitHired\",\n        \"email\": \"lupabiwy@yahoo.com\",\n        \"linkedin\": null\n    },\n    \"job\": {\n        \"jobId\": 3,\n        \"jobTitle\": \"Application Developer\",\n        \"jobDescription\": \"Software Developer\",\n        \"minimumWage\": 25,\n        \"setWage\": 30,\n        \"jobType\": \"App Developer\",\n        \"position\": \"full time\",\n        \"startingDate\": null\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"amount\": 50\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./bids.js",
    "groupTitle": "Bids"
  },
  {
    "type": "get",
    "url": "/api/user/:userId/jobs/:jobId/currentbid/:bidId",
    "title": "employee views his/her current bidding amount.",
    "name": "GETMYBIDS",
    "group": "Bids",
    "version": "1.0.0",
    "description": "<p>Method Description : Employee uses this method to view his/her currently bidding amount on the job that belong to job id.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/:userId/jobs/:jobId/currentbid/:bidId"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>The amount of user's bid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    \n        {\n    \"amount\": 200,\n    \"createdAt\": \"2016-05-10T20:32:48.000Z\",\n    \"updatedAt\": \"2016-05-11T00:00:29.000Z\",\n    \"job\": {\n        \"jobTitle\": \"tester\",\n        \"jobDescription\": \"qa skillz\",\n        \"minimumWage\": 8,\n        \"maximumWage\": 12,\n        \"jobType\": null,\n        \"position\": null,\n        \"startingDate\": null,\n        \"location\": \"396 Keyes St, San Jose, CA 95112, USA\",\n        \"user\": {\n            \"firstName\": \"Bhargava\",\n            \"lastName\": \"Ramisetty\",\n            \"company\": \"GitHired Inc.\",\n            \"email\": \"bhargava@email.com\",\n            \"linkedin\": null\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "filename": "./bids.js",
    "groupTitle": "Bids"
  },
  {
    "type": "post",
    "url": "/api/user/:userId/bids",
    "title": "biding amount.",
    "name": "PostNewBids",
    "group": "Bids",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "amount",
            "description": "<p>user amount</p>"
          }
        ]
      }
    },
    "description": "<p>Method Description : Users use this method to bid the job.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/:userId/bids"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>The amount of user's bid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"amount\": \"50\",\n  \"createdAt\": \"2016-05-11\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "filename": "./bids.js",
    "groupTitle": "Bids"
  },
  {
    "type": "put",
    "url": "/api/user/:userId/jobs/:jobId/currentbid/:bidId/updatebid",
    "title": "employee update his/her current bids.",
    "name": "UPDATECURRENTBID",
    "group": "Bids",
    "version": "1.0.0",
    "description": "<p>Method Description : Employee uses this method to change his/her currently bidding amount on the job that belong to job id.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/:userId/jobs/:jobId/currentbid/:bidId/updatebid"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>The amount of user's bid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n    {\n     ammount updated!\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "amount",
            "description": "<p>user amount</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"amount\": 100\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./bids.js",
    "groupTitle": "Bids"
  },
  {
    "type": "put",
    "url": "/api/user/:userId/bids/:bidId",
    "title": "user updates current bids rate.",
    "name": "Update_current_bids_rate_",
    "group": "Bids",
    "version": "1.0.0",
    "description": "<p>Method Description: User uses this method to update his/her current rating.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/:userId/bids"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>The amount of user's bid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"rating\": \"5\",\n  \"createdAt\": \"2016-05-11\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"rating\": 5\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./bids.js",
    "groupTitle": "Bids"
  },
  {
    "type": "post",
    "url": "/api/user/:userId/bids",
    "title": "user creates new bids",
    "name": "create_new_bids",
    "group": "Bids",
    "version": "1.0.0",
    "description": "<p>Method Description: User uses this method to create new bids with amount.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/:userId/bids"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>The amount of user's bid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"amount\": \"50\",\n  \"createdAt\": \"2016-05-11\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"amount\": 50\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./bids.js",
    "groupTitle": "Bids"
  },
  {
    "type": "post",
    "url": "/api/user/:userId/jobs/:jobId/comments",
    "title": "biding amount.",
    "name": "Post_New_Comments",
    "group": "Comments",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comments",
            "description": "<p>user creates some new comments.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"comment\": \"It is a good experience working here.\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Method Description : Users use this method to give comments on the job.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/:userId/jobs/:jobId/comments"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>The new comment has been created.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \t\"commentId\": 2,\n    \t\"comment\" : \"It is a good experience working here.\"\n    \t\"userId\": \"1\",\n    \t\"jobId\": \"2\",\n    \t\"timestamp\": \"2016-05-11T19:08:50.908Z\",\n    \t\"createdAt\": \"2016-05-11T19:08:50.908Z\",\n    \t\"updatedAt\": \"2016-05-11T19:08:50.000Z\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "filename": "./comments.js",
    "groupTitle": "Comments"
  },
  {
    "type": "get",
    "url": "/api/user/:userId/jobs/:jobId/comments",
    "title": "user views comments.",
    "name": "View_comments",
    "group": "Comments",
    "version": "1.0.0",
    "description": "<p>Method Description : Users use this method to view comments.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/:userId/comments"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n     [\n    \t{\n        \"commentId\": 1,\n        \"comment\": null,\n        \"timestamp\": \"2016-05-11T02:14:09.000Z\",\n        \"createdAt\": \"2016-05-11T02:14:09.000Z\",\n        \"updatedAt\": \"2016-05-11T02:14:09.000Z\",\n        \"userId\": 1,\n        \"jobId\": 1\n    \t}\n\t\t]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "filename": "./comments.js",
    "groupTitle": "Comments"
  },
  {
    "type": "get",
    "url": "/api/user/jobs/",
    "title": "user views current jobs.",
    "name": "Get_jobs",
    "group": "Jobs",
    "version": "1.0.0",
    "description": "<p>Method Description : Users use this method to view all the current jobs.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/jobs"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jobs",
            "description": "<p>The list of jobs that user's need.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n   [\n{\n    \"jobId\": 1,\n    \"jobTitle\": \"Software Engineering\",\n    \"jobDescription\": \"Testing\",\n    \"minimumWage\": 30,\n    \"maximumWage\": 50,\n    \"setWage\": 35,\n    \"jobType\": \"Engineering\",\n    \"position\": \"full time\",\n    \"startingDate\": null,\n    \"endDate\": null,\n    \"location\": \"San Jose\",\n    \"userId\": 1,\n    \"skills\": []\n},\n{\n    \"jobId\": 2,\n    \"jobTitle\": \"Software developer\",\n    \"jobDescription\": \"Develop web application\",\n    \"minimumWage\": 30,\n    \"maximumWage\": 60,\n    \"setWage\": 40,\n    \"jobType\": \"Web Developer\",\n    \"position\": \"full stack\",\n    \"startingDate\": null,\n    \"endDate\": null,\n    \"location\": \"2583 Brenford Drive, San Jose, California, \",\n    \"userId\": 2,\n    \"skills\": [\n        {\n            \"name\": \"AngularJS\",\n            \"skillId\": 22,\n            \"jobSkills\": {\n                \"importance\": null,\n                \"createdAt\": \"2016-05-11T05:07:45.000Z\",\n                \"updatedAt\": \"2016-05-11T05:07:45.000Z\",\n                \"jobJobId\": 2,\n                \"skillSkillId\": 22\n            }\n        }\n    ]\n},\n{\n    \"jobId\": 3,\n    \"jobTitle\": \"Application Developer\",\n    \"jobDescription\": \"Software Developer\",\n    \"minimumWage\": 25,\n    \"maximumWage\": 35,\n    \"setWage\": 30,\n    \"jobType\": \"App Developer\",\n    \"position\": \"full time\",\n    \"startingDate\": null,\n    \"endDate\": null,\n    \"location\": \"Fremont\",\n    \"userId\": 2,\n    \"skills\": []\n},\n{\n    \"jobId\": 4,\n    \"jobTitle\": \"Java Developer\",\n    \"jobDescription\": \"Must be able to handle pressure. \\nWrite clean code.\\nLive close by. Not a remote job.\",\n    \"minimumWage\": 40,\n    \"maximumWage\": 60,\n    \"setWage\": 0,\n    \"jobType\": null,\n    \"position\": null,\n    \"startingDate\": null,\n    \"endDate\": null,\n    \"location\": \"800 West Taylor Street, San Jose, California, 95126\",\n    \"userId\": 2,\n    \"skills\": [\n        {\n            \"name\": \"Java\",\n            \"skillId\": 4,\n            \"jobSkills\": {\n                \"importance\": null,\n                \"createdAt\": \"2016-05-11T05:03:13.000Z\",\n                \"updatedAt\": \"2016-05-11T05:03:13.000Z\",\n                \"jobJobId\": 4,\n                \"skillSkillId\": 4\n            }\n        }\n    ]\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "filename": "./jobs.js",
    "groupTitle": "Jobs"
  },
  {
    "type": "post",
    "url": "/api/jobs/createJob",
    "title": "create new jobs.",
    "name": "Post_a_New_job",
    "group": "Jobs",
    "version": "1.0.0",
    "description": "<p>Method Description : Users use this method to create/add new jobs.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/jobs/createJob"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "job",
            "description": "<p>The user is successfully create a new job.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"jobTitle\" : \"Software Process management.\",\n  \"jobDescription\" : \"Must be able to solve the problem with creative solution.\",\n  \"minimumWage\" : \"50\",\n  \"maximumWage\" : \"100\",\n  \"setWage\" : \"80\",\n  \"location\" : \"San Jose\",\n  \"jobcreation\" : \"job successfully created!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"jobTitle\" : \"Software Process management.\",\n  \"jobDescription\" : \"Must be able to solve the problem with creative solution.\",\n  \"minimumWage\" : \"50\",\n  \"maximumWage\" : \"100\",\n  \"setWage\" : \"80\",\n  \"location\" : \"San Jose\" \n}",
          "type": "json"
        }
      ]
    },
    "filename": "./jobs.js",
    "groupTitle": "Jobs"
  },
  {
    "type": "put",
    "url": "/api/jobs/:jobId/",
    "title": "user update his/her currently posted jobs.",
    "name": "Update_current_posted_job",
    "group": "Jobs",
    "version": "1.0.0",
    "description": "<p>Method Description : User uses this method to change his/her currently posting job that belong to job id.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/jobs/:jobId"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jobs",
            "description": "<p>The jobs is successfully updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n    {\n     Job is successfully updated!\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "amount",
            "description": "<p>user amount</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"jobTitle\" : \"Senior Software Engineer\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./jobs.js",
    "groupTitle": "Jobs"
  },
  {
    "type": "post",
    "url": "/api/user/:userId/skills",
    "title": "user creates/adds new skills.",
    "name": "Add_user_s_new_skills",
    "group": "Skills",
    "version": "1.0.0",
    "description": "<p>Method Description : User uses this method to add new skills in his/her profile.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/:userId/skills"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "skills",
            "description": "<p>The added new skills.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n    {\n     New skills added!\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "amount",
            "description": "<p>user amount</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"skills\" : \"[Java, C++, keyboardwarrior]\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./user-skills.js",
    "groupTitle": "Skills"
  },
  {
    "type": "get",
    "url": "/api/user/:userId/skills",
    "title": "user views skills.",
    "name": "View_skills",
    "group": "User_Skills",
    "version": "1.0.0",
    "description": "<p>Method Description : Users use this method to view his/her skills.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:80/api/user/:userId/skills"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n [\n        {\n        \"skillId\": 1,\n        \"name\": \"Software Engineering\",\n        \"userSkills\": {\n        \"userId\": 1,\n        \"yearsOfExperience\": 5\n            }\n        }\n    ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"error\": \"Unauthorized!\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "required"
      }
    ],
    "filename": "./user-skills.js",
    "groupTitle": "User_Skills"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./apidoc/main.js",
    "group": "_home_keon_win8_kyaw_165_githired_api_apidoc_main_js",
    "groupTitle": "_home_keon_win8_kyaw_165_githired_api_apidoc_main_js",
    "name": ""
  }
] });
