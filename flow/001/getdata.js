const e = require("express");
const express = require("express");
const router = express.Router();
let mongodb = require('../../function/mongodb');

let PREMIXdbMAIN = 'PREMIXdbMAIN';
let COILCOATINGdbMAIN = 'COILCOATINGdbMAIN';
let HYDROPHILICdbMAIN = 'HYDROPHILICdbMAIN';
let PLXdbMAIN = 'PLXdbMAIN';
let TRITRATINGdbMAIN = 'TRITRATINGdbMAIN';
let POWDERdbMAIN = 'POWDERdbMAIN';
let LIQUIDdbMAIN = 'LIQUIDdbMAIN';
let dbin = 'specification';
let dbinMAIN = 'MAIN'

router.post('/getliststaff', async (req, res) => {
    //-------------------------------------
    console.log(req.body);
    let input = req.body;
    //-------------------------------------

    let output = [];

    try {

        let PREMIX = await mongodb.find(PREMIXdbMAIN, dbinMAIN, { $and: [{ "DEP": "STAFF" }] }); //{ "SumStatus": "IP" }, { "DEP": "STAFF" }
        if (PREMIX.length > 0) {
            for (i = 0; i < PREMIX.length; i++) {
                output.push(PREMIX[i]);
            }
        }
        let COILCOATING = await mongodb.find(COILCOATINGdbMAIN, dbinMAIN, { $and: [{ "DEP": "STAFF" }] });
        if (COILCOATING.length > 0) {
            for (i = 0; i < COILCOATING.length; i++) {
                output.push(COILCOATING[i]);
            }
        }
        let HYDROPHILIC = await mongodb.find(HYDROPHILICdbMAIN, dbinMAIN, { $and: [{ "DEP": "STAFF" }] });
        if (HYDROPHILIC.length > 0) {
            for (i = 0; i < HYDROPHILIC.length; i++) {
                output.push(HYDROPHILIC[i]);
            }
        }
        let PLX = await mongodb.find(PLXdbMAIN, dbinMAIN, { $and: [{ "DEP": "STAFF" }] });
        if (PLX.length > 0) {
            for (i = 0; i < PLX.length; i++) {
                output.push(PLX[i]);
            }
        }
        let TRITRATING = await mongodb.find(TRITRATINGdbMAIN, dbinMAIN, { $and: [{ "DEP": "STAFF" }] });
        if (TRITRATING.length > 0) {
            for (i = 0; i < TRITRATING.length; i++) {
                output.push(TRITRATING[i]);
            }
        }

        let POWDER = await mongodb.find(POWDERdbMAIN, dbinMAIN, { $and: [{ "DEP": "STAFF" }] });
        if (POWDER.length > 0) {
            for (i = 0; i < POWDER.length; i++) {
                output.push(POWDER[i]);
            }
        }
        let LIQUID = await mongodb.find(LIQUIDdbMAIN, dbinMAIN, { $and: [{ "DEP": "STAFF" }] });
        if (LIQUID.length > 0) {
            for (i = 0; i < LIQUID.length; i++) {
                output.push(LIQUID[i]);
            }
        }

        for (i = 0; i < output.length; i++) {
            // console.log(output[i]['checklist']);
            let passcount = 0;
            for (j = 0; j < output[i]['checklist'].length; j++) {

                if (output[i][output[i]['checklist'][j]]['AllSt'] === 'PASS') {
                    passcount++;
                } else if (output[i][output[i]['checklist'][j]]['AllSt'] === 'REJECT') {
                    output[i]['SumStatus'] = 'REJECT'

                    let upd = await mongodb.update(`${output[i]['PLANT']}dbMAIN`, 'MAIN', { $and: [{ "POID": output[i]['POID'] }, { $or: [{ "DEP": "MANA" }, { "DEP": "STAFF" }] }] }, { $set: { "SumStatus": "REJECT", "DEP": "REJECT" } });
                }
                //REJECT



            };

            if (passcount === output[i]['checklist'].length) {
                output[i]['SumStatus'] = 'ALL-PASS'
                let upd = await mongodb.update(`${output[i]['PLANT']}dbMAIN`, 'MAIN', { $and: [{ "POID": output[i]['POID'] }, { $or: [{ "DEP": "MANA" }, { "DEP": "STAFF" }] }] }, { $set: { "SumStatus": "ALL-PASS" } });
            }

        };

        // console.log(output);

    }
    catch (err) {
        output = [];
    }

    res.json(output);
});

router.post('/getlistmana', async (req, res) => {
    //-------------------------------------
    console.log(req.body);
    let input = req.body;
    //-------------------------------------

    let output = [];

    try {

        let PREMIX = await mongodb.find(PREMIXdbMAIN, dbinMAIN, { $and: [{ "DEP": "MANA" }] }); //{ "SumStatus": "IP" }, { "DEP": "STAFF" }
        if (PREMIX.length > 0) {
            for (i = 0; i < PREMIX.length; i++) {
                output.push(PREMIX[i]);
            }
        }
        let COILCOATING = await mongodb.find(COILCOATINGdbMAIN, dbinMAIN, { $and: [{ "DEP": "MANA" }] });
        if (COILCOATING.length > 0) {
            for (i = 0; i < COILCOATING.length; i++) {
                output.push(COILCOATING[i]);
            }
        }
        let HYDROPHILIC = await mongodb.find(HYDROPHILICdbMAIN, dbinMAIN, { $and: [{ "DEP": "MANA" }] });
        if (HYDROPHILIC.length > 0) {
            for (i = 0; i < HYDROPHILIC.length; i++) {
                output.push(HYDROPHILIC[i]);
            }
        }
        let PLX = await mongodb.find(PLXdbMAIN, dbinMAIN, { $and: [{ "DEP": "MANA" }] });
        if (PLX.length > 0) {
            for (i = 0; i < PLX.length; i++) {
                output.push(PLX[i]);
            }
        }
        let TRITRATING = await mongodb.find(TRITRATINGdbMAIN, dbinMAIN, { $and: [{ "DEP": "MANA" }] });
        if (TRITRATING.length > 0) {
            for (i = 0; i < TRITRATING.length; i++) {
                output.push(TRITRATING[i]);
            }
        }

        let POWDER = await mongodb.find(POWDERdbMAIN, dbinMAIN, { $and: [{ "DEP": "MANA" }] });
        if (POWDER.length > 0) {
            for (i = 0; i < POWDER.length; i++) {
                output.push(POWDER[i]);
            }
        }
        let LIQUID = await mongodb.find(LIQUIDdbMAIN, dbinMAIN, { $and: [{ "DEP": "MANA" }] });
        if (LIQUID.length > 0) {
            for (i = 0; i < LIQUID.length; i++) {
                output.push(LIQUID[i]);
            }
        }

    }
    catch (err) {
        output = [];
    }


    res.json(output);
});


router.post('/getone', async (req, res) => {
    //-------------------------------------
    console.log(req.body);
    let input = req.body;
    //-------------------------------------
    let output = [];

    try {

        let poid = `${input['poid']}`



        let PREMIX = await mongodb.find(PREMIXdbMAIN, dbinMAIN, { $and: [{ "POID": poid }, { "DEP": "SCADA" }] }); //{ "SumStatus": "IP" }, { "DEP": "STAFF" }
        if (PREMIX.length > 0) {
            for (i = 0; i < PREMIX.length; i++) {
                output.push(PREMIX[i]);
            }
        }
        let COILCOATING = await mongodb.find(COILCOATINGdbMAIN, dbinMAIN, { $and: [{ "POID": poid }, { "DEP": "SCADA" }] });
        if (COILCOATING.length > 0) {
            for (i = 0; i < COILCOATING.length; i++) {
                output.push(COILCOATING[i]);
            }
        }
        let HYDROPHILIC = await mongodb.find(HYDROPHILICdbMAIN, dbinMAIN, { $and: [{ "POID": poid }, { "DEP": "SCADA" }] });
        if (HYDROPHILIC.length > 0) {
            for (i = 0; i < HYDROPHILIC.length; i++) {
                output.push(HYDROPHILIC[i]);
            }
        }
        let PLX = await mongodb.find(PLXdbMAIN, dbinMAIN, { $and: [{ "POID": poid }, { "DEP": "SCADA" }] });
        if (PLX.length > 0) {
            for (i = 0; i < PLX.length; i++) {
                output.push(PLX[i]);
            }
        }
        let TRITRATING = await mongodb.find(TRITRATINGdbMAIN, dbinMAIN, { $and: [{ "POID": poid }, { "DEP": "SCADA" }] });
        if (TRITRATING.length > 0) {
            for (i = 0; i < TRITRATING.length; i++) {
                output.push(TRITRATING[i]);
            }
        }

        let POWDER = await mongodb.find(POWDERdbMAIN, dbinMAIN, { $and: [{ "POID": poid }, { "DEP": "SCADA" }] });
        if (POWDER.length > 0) {
            for (i = 0; i < POWDER.length; i++) {
                output.push(POWDER[i]);
            }
        }
        let LIQUID = await mongodb.find(LIQUIDdbMAIN, dbinMAIN, { $and: [{ "POID": poid }, { "DEP": "SCADA" }] });
        if (LIQUID.length > 0) {
            for (i = 0; i < LIQUID.length; i++) {
                output.push(LIQUID[i]);
            }
        }

    }
    catch (err) {
        output = [];
    }
    
    res.json(output);
});

module.exports = router;