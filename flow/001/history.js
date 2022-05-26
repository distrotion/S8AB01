const e = require("express");
const express = require("express");
const router = express.Router();
let mongodb = require('../../function/mongodb');
var request = require('request');


router.post('/gethistoryplant', async (req, res) => {

    //-------------------------------------
    console.log(req.body);
    let input = req.body;
    //-------------------------------------
    let output = [];
    let plant = input['plant']



    let find = await mongodb.find(`${plant}_MASTER`, 'specification', {});
    if (find.length > 0) {
        // output = { "return": 'OK' }
        for (i = 0; i < find.length; i++) {
            output.push({ "MATNO": find[i]['MATNO'], "ProductName": find[i]['ProductName'], })
        }

    }



    res.json(output);
});


router.post('/gethistory', async (req, res) => {

    //-------------------------------------
    console.log(req.body);
    let input = req.body;
    //-------------------------------------
    let output = {};
    let MATCP = `${input['MATCP']}`
    let plant = input['plant']
    let outdata = [];


    let find = await mongodb.find(`${plant}dbMAIN`, 'MAIN', { $and: [{ "MATNO": MATCP },$or[{ "SumStatus": 'ALL-PASS' },{ "SumStatus": 'REJECT' }]] });
    console.log(find);
    if (find.length > 0) {
        // output = find;
   
        output['checklist'] = find[0]['checklist'] ?? [];
        for(i=0;i<find.length;i++){

            var databuff = {
                "POID":find[i]['POID'],
                "MATNO":find[i]['MATNO'],
                "PO":find[i]['PO'],
                "ProductName":find[i]['ProductName'],
                "SumStatus":find[i]['SumStatus'],
                "DEP":find[i]['DEP'],
            }

            for(j=0;j<output['checklist'].length;j++){
                databuff[`P${j}_T1`] = find[i][`${output['checklist'][j]}`]['T1'] ?? ``;
                databuff[`P${j}_T2`] = find[i][`${output['checklist'][j]}`]['T2'] ?? ``;
                databuff[`P${j}_T3`] = find[i][`${output['checklist'][j]}`]['T3'] ?? ``;
            }

            

            outdata.push(databuff);
        }
    }

    output['outdata'] = outdata;
    // console.log(output);

    res.json(output);
});


module.exports = router;