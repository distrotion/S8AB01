const e = require("express");
const express = require("express");
const router = express.Router();
let mongodb = require('../../function/mongodb');
var request = require('request');


router.post('/getallgraph', async (req, res) => {

  //-------------------------------------
  console.log(req.body);
  let input = req.body;
  //-------------------------------------

  let output = { "re": "NOK" }

  try {
    let outdata = [];
    let MATCP = `${input['MATCP']}`;
    let plant = input['plant'];


    let historydata = await mongodb.findsort(`${plant}dbMAIN`, 'MAIN', { $and: [{ "MATNO": MATCP }] }, 1);
    if (historydata.length > 0) {
      output={
        "status":"ok",
        "outdata":historydata,
      };
    }else{
      output={
        "status":"ok",
        "outdata":[],
      };
    }

  
   
  }
  catch (err) {
    output = { "re": "NOK" };
  }
  res.json(output);
});


module.exports = router;