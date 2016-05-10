define({ "api": [
  {
    "type": "post",
    "url": "/api/user/:userId/bids",
    "title": "biding amount.",
    "name": "PostNewBids",
    "group": "employees",
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
    "version": "0.0.0",
    "filename": "./bids.js",
    "groupTitle": "employees"
  }
] });
