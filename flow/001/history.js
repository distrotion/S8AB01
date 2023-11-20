const e = require("express");
const express = require("express");
const router = express.Router();
let mongodb = require('../../function/mongodb');
var request = require('request');
let mssql = require('./../../function/mssql');

let PREMIXserver = 'PREMIX_MASTER';
let COILCOATINGserver = 'COILCOATING_MASTER';
let HYDROPHILICserver = 'HYDROPHILIC_MASTER';
let PLXserver = 'PLX_MASTER';
let TRITRATINGserver = 'TRITRATING_MASTER';
let POWDERserver = 'POWDER_MASTER';
let LIQUIDserver = 'LIQUID_MASTER';
let NOXRUSTserver = 'NOXRUST_MASTER'
let dbin = 'specification';

let PREMIXdbMAIN = 'PREMIXdbMAIN';
let COILCOATINGdbMAIN = 'COILCOATINGdbMAIN';
let HYDROPHILICdbMAIN = 'HYDROPHILICdbMAIN';
let PLXdbMAIN = 'PLXdbMAIN';
let TRITRATINGdbMAIN = 'TRITRATINGdbMAIN';
let POWDERdbMAIN = 'POWDERdbMAIN';
let LIQUIDdbMAIN = 'LIQUIDdbMAIN';
let NOXRUSTdbMAIN = 'NOXRUSTdbMAIN';
let dbinMAIN = 'MAIN'


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


router.post('/getweightlist', async (req, res) => {
    let d = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });;
    let day = d;
    //-------------------------------------
    console.log(req.body);
    let input = req.body;
    //-------------------------------------
    let output = [];
    if(input['MATNO']!=undefined ){
        // let MATCP = input['PO'].substring(0, 8);
        let MATCP = input['MATNO']
        // let PO = input['PO'].substring(12, 18);

        let PREMIX = await mongodb.find(PREMIXserver, dbin, { "MATNO": MATCP });
        let COILCOATING = await mongodb.find(COILCOATINGserver, dbin, { "MATNO": MATCP });
        let HYDROPHILIC = await mongodb.find(HYDROPHILICserver, dbin, { "MATNO": MATCP });
        let PLX = await mongodb.find(PLXserver, dbin, { "MATNO": MATCP });
        let TRITRATING = await mongodb.find(TRITRATINGserver, dbin, { "MATNO": MATCP });
        let POWDER = await mongodb.find(POWDERserver, dbin, { "MATNO": MATCP });
        let LIQUID = await mongodb.find(LIQUIDserver, dbin, { "MATNO": MATCP });
        let NOXRUST = await mongodb.find(NOXRUSTserver, dbin, { "MATNO": MATCP });

        let data = {
            "PLANT": "NOdata",
            "STATUS": "ORDER AGAIN"
        };

        if (TRITRATING.length > 0) {
       
        } else if (COILCOATING.length > 0) {
       
        } else if (HYDROPHILIC.length > 0) {
    
        } else if (PLX.length > 0) {
          
        } else if (PREMIX.length > 0) {
        
        } else if (POWDER.length > 0) {
          
        } else if (LIQUID.length > 0) {
            let LIQUIDpo = await mongodb.findnolim(LIQUIDdbMAIN, dbinMAIN, { "MATNO": MATCP },{ "PO": 1 });
         
            let polist = [];
            for (let i = 0; i < LIQUIDpo.length; i++) {
                polist.push(`'${LIQUIDpo[i]['PO']}'`)
                
            }

            let queryS = `SELECT * FROM [ScadaReport].[dbo].[LQprocessinfo] WHERE NumOrder in (${polist})  order by NumOrder  desc, RecordTimeStart  desc`
            let db = await mssql.qurey(queryS);
            console.log(db['recordsets'][0]);
        
        } else if (NOXRUST.length > 0) {
          
        } else {
            output = [];
        }

      

    }


    res.json(output);
});


module.exports = router;