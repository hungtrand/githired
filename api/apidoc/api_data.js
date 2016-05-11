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
    "title": "employer update his/her finalized stage.",
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
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"amount\": 50\n}",
          "type": "json"
        }
      ]
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
