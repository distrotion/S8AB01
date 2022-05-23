const e = require("express");
const express = require("express");
const router = express.Router();
let mongodb = require('../../function/mongodb');
var request = require('request');




router.post('/gethistory', async (req, res) => {

    //-------------------------------------
    console.log(req.body);
    let input = req.body;
    //-------------------------------------
    let output = [];
    let MATCP = `${input['MATCP']}`
    let plant = input['plant']



    let find = await mongodb.find(`${plant}dbMAIN`, 'MAIN', { $and: [ { "MATCP": MATCP } ] }); 
    if(find.length > 0){
        // output = { "return": 'OK' }
        output = find;  
    }


    res.json(output);
});


module.exports = router;