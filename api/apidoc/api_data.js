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
          }
        ]
      }
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
