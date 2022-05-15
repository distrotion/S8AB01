const e = require("express");
const express = require("express");
const router = express.Router();
let mongodb = require('../../function/mongodb');

let PREMIXserver = 'PREMIX_MASTER';
let COILCOATINGserver = 'COILCOATING_MASTER';
let HYDROPHILICserver = 'HYDROPHILIC_MASTER';
let PLXserver = 'PLX_MASTER';
let TRITRATINGserver = 'TRITRATING_MASTER';
let POWDERserver = 'POWDER_MASTER';
let LIQUIDserver = 'LIQUID_MASTER';
let dbin = 'specification';

const d = new Date();
let day = d;

router.post('/RegisterPO', async (req, res) => {
    //-------------------------------------
    console.log(req.body);
    let input = req.body;
    //-------------------------------------
    let MATCP = input['PO'].substring(0, 8);
    let PO = input['PO'].substring(12, 18);

    let PREMIX = await mongodb.find(PREMIXserver,dbin,{"MATNO":MATCP});
    let COILCOATING = await mongodb.find(COILCOATINGserver,dbin,{"MATNO":MATCP});
    let HYDROPHILIC = await mongodb.find(HYDROPHILICserver,dbin,{"MATNO":MATCP});
    let PLX = await mongodb.find(PLXserver,dbin,{"MATNO":MATCP});
    let TRITRATING = await mongodb.find(TRITRATINGserver,dbin,{"MATNO":MATCP});
    let POWDER = await mongodb.find(POWDERserver,dbin,{"MATNO":MATCP});
    let LIQUID = await mongodb.find(LIQUIDserver,dbin,{"MATNO":MATCP});

    let data = {
        "PLANT":"NOdata",
        "STATUS":"ORDER AGAIN"
    };

    if(TRITRATING.length > 0){
        data = {
            "MATCP":MATCP,
            "PO":PO,
            "PLANT":"TRITRATING",
            "MASTERdb":TRITRATINGserver,
            "MATDATA":TRITRATING[0],
            "ProductName":TRITRATING[0]['ProductName'],
        };
    }else if(COILCOATING.length > 0){
        data = {
            "MATCP":MATCP,
            "PO":PO,
            "PLANT":"COILCOATING",
            "MASTERdb":COILCOATINGserver,
            "MATDATA":COILCOATING[0],
            "ProductName":COILCOATING[0]['ProductName'],
        };
    }else if(HYDROPHILIC.length > 0){
        data = {
            "MATCP":MATCP,
            "PO":PO,
            "PLANT":"HYDROPHILIC",
            "MASTERdb":HYDROPHILICserver,
            "MATDATA":HYDROPHILIC[0],
            "ProductName":HYDROPHILIC[0]['ProductName'],
        };
    }else if(PLX.length > 0){
        data = {
            "MATCP":MATCP,
            "PO":PO,
            "PLANT":"PLX",
            "MASTERdb":PLXserver,
            "MATDATA":PLX[0],
            "ProductName":PLX[0]['ProductName'],
        };
    }else if(PREMIX.length > 0){
        data = {
            "MATCP":MATCP,
            "PO":PO,
            "PLANT":"PREMIX",
            "MASTERdb":PREMIXserver,
            "MATDATA":PREMIX[0],
            "ProductName":PREMIX[0]['ProductName'],
        };
    }else if(POWDER.length > 0){
        data = {
            "MATCP":MATCP,
            "PO":PO,
            "PLANT":"POWDER",
            "MASTERdb":POWDERserver,
            "MATDATA":POWDER[0],
            "ProductName":POWDER[0]['ProductName'],
        };
    }
    else if(LIQUID.length > 0){
        data = {
            "MATCP":MATCP,
            "PO":PO,
            "PLANT":"LIQUID",
            "MASTERdb":LIQUIDserver,
            "MATDATA":LIQUID[0],
            "ProductName":LIQUID[0]['ProductName'],
        };
    }

    let neworder={
        "POID":input['PO'],
        "MATNO":MATCP,
        "PO":PO,
        "PLANT":data["PLANT"],
        "MASTERdb":data["MASTERdb"],
        "ProductName":data["ProductName"],
        "SumStatus" : "IP",
        "DEP":"STAFF"
    };

    let output = 'The order Incorrect';

    if(data["PLANT"]!=="NOdata"){
        // console.log(Object.keys(data["MATDATA"]["SPEC"]))
        let INSlist = Object.keys(data["MATDATA"]["SPEC"]);
        let checklist = [];
        for(i=0;i<INSlist.length;i++){
            
            if(INSlist[i] === 'COLOR'){
                checklist.push(INSlist[i]);
                neworder['COLOR'] = {
                    "SPEC" : data["MATDATA"]["SPEC"]["COLOR"],
                    "T1" : "",
                    "T1St" : "",
                    "T1Stc" : "orange",
                    "T2" : "",
                    "T2St" : "",
                    "T2Stc" : "orange",
                    "T3" : "",
                    "T3St" : "",
                    "T3Stc" : "orange",
                    "AllSt" : "IP",
                    "T1Stc_comment" : "",
                    "T2Stc_comment" : "",
                    "T3Stc_comment" : "",
                }
            }else if(INSlist[i] === 'APPEARANCE'){
                checklist.push(INSlist[i])
                neworder['APPEARANCE'] = {
                    "SPEC" : data["MATDATA"]["SPEC"]["APPEARANCE"],
                    "T1" : "",
                    "T1St" : "",
                    "T1Stc" : "orange",
                    "T2" : "",
                    "T2St" : "",
                    "T2Stc" : "orange",
                    "T3" : "",
                    "T3St" : "",
                    "T3Stc" : "orange",
                    "AllSt" : "IP",
                    "T1Stc_comment" : "",
                    "T2Stc_comment" : "",
                    "T3Stc_comment" : "",
                }
            }else{
                if((data["MATDATA"]["SPEC"][`${INSlist[i]}`]["HI"] !== "")&&(data["MATDATA"]["SPEC"][`${INSlist[i]}`]["LOW"] !== "")){
                    checklist.push(INSlist[i])
                    neworder[`${INSlist[i]}`] = {
                        "SPEC" : data["MATDATA"]["SPEC"][`${INSlist[i]}`],
                        "T1" : "",
                        "T1St" : "",
                        "T1Stc" : "orange",
                        "T2" : "",
                        "T2St" : "",
                        "T2Stc" : "orange",
                        "T3" : "",
                        "T3St" : "",
                        "T3Stc" : "orange",
                        "AllSt" : "IP",
                        "T1Stc_comment" : "",
                        "T2Stc_comment" : "",
                        "T3Stc_comment" : "",
                    }
                }
            }
        }

        let check = await mongodb.find(`${neworder['PLANT']}dbMAIN`,'MAIN',{"POID":neworder['POID'] });

        if(check.length === 0){
            neworder['date'] = day;
            neworder['checklist'] =checklist;
            var ins = await mongodb.insertMany(`${neworder['PLANT']}dbMAIN`,'MAIN',[neworder]);
            output = `The order have added to PLANT:${data["PLANT"]}`;
        }else{
            // let upd = await mongodb.update(`${neworder['PLANT']}dbMAIN`,'MAIN',{ "POID":neworder['POID'] }, { $set: neworder });
            output = `The order have already had in DB`;
        }
        
    }else{

    }
    

    res.json(output);
});

module.exports = router;