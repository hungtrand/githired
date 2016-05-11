define({ "api": [
  {
    "type": "get",
    "url": "/api/user/jobs/:jobId/currentbids",
    "title": "current biders and their amount.",
    "name": "Get_current_bids",
    "group": "Bids",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "jobId",
            "description": "<p>currentJobId</p>"
          }
        ]
      }
    },
    "description": "<p>Method Description: Employer uses this method to view the current bids.</p>",
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
            "field": "userId",
            "description": "<p>employeeId</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "amount",
            "defaultValue": "employerDefine",
            "description": "<p>Request Body amount.</p>"
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
            "description": "<p>The amount of user bid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"amount\": \"200\",\n  \"createdAt\": \"2016-05-11\"\n}",
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
