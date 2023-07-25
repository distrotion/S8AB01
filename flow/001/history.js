const e = require("express");
const express = require("express");
const router = express.Router();
let mongodb = require('../../function/mongodb');
var request = require('request');


router.post('/gethistoryplant', async (req, res) => {
    let d = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });;
    let day = d;
    //-------------------------------------
    console.log(req.body);
    let input = req.body;
    //-------------------------------------
    let output = [];
    try {
        let plant = input['plant']



        let find = await mongodb.find(`${plant}_MASTER`, 'specification', {});
        if (find.length > 0) {
            // output = { "return": 'OK' }
            for (i = 0; i < find.length; i++) {
                output.push({ "MATNO": find[i]['MATNO'], "ProductName": find[i]['ProductName'], })
            }

        }

    }
    catch (err) {
        output = [];
    }


    res.json(output);
});


router.post('/gethistory', async (req, res) => {
    let d = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });;
    let day = d;
    //-------------------------------------
    console.log(req.body);
    let input = req.body;
    //-------------------------------------
    
    let output ={ "re": "NOK" }

    try {

        let outdata = [];
        let MATCP = `${input['MATCP']}`
        let plant = input['plant']



        let find = await mongodb.find(`${plant}dbMAIN`, 'MAIN', { $and: [{ "MATNO": MATCP }] });
        console.log(find);
        if (find.length > 0) {
            // output = find;

            output['checklist'] = find[0]['checklist'] ?? [];
            for (i = 0; i < find.length; i++) {

                var databuff = {
                    "POID": find[i]['POID'],
                    "MATNO": find[i]['MATNO'],
                    "PO": find[i]['PO'],
                    "ProductName": find[i]['ProductName'],
                    "SumStatus": find[i]['SumStatus'],
                    "DEP": find[i]['DEP'],
                }

                for (j = 0; j < output['checklist'].length; j++) {
                    databuff[`P${j}_T1`] = find[i][`${output['checklist'][j]}`]['T1'] ?? ``;
                    databuff[`P${j}_T2`] = find[i][`${output['checklist'][j]}`]['T2'] ?? ``;
                    databuff[`P${j}_T3`] = find[i][`${output['checklist'][j]}`]['T3'] ?? ``;
                }



                outdata.push(databuff);
            }
            output["re"] = 'OK'
        }

        output['outdata'] = outdata;
        // console.log(output);
    }
    catch (err) {
        output = { "re": "NOK" };
    }
    res.json(output);
});


module.exports = router;