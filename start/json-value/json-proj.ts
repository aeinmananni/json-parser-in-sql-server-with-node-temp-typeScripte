import { Router,Request,Response } from "express";
import validateJson from "../../utils/validate-json";
const router = Router();
import mySqlData from "../db";

//Posted by Json from postman  and Extracting elements from Json
router.post("/" , async (req:Request,res:Response) =>{

    // Posted by Json from postman => 
    //     {
    //         "pattern":"addrres.country",
    //         "info":{
    //             "id":1,
    //              "addrres":{
    //                    "country":"Iran",
    //                    "city":"sari"
    //              },
    //              "tags":["sports","water-polo"]
    //         },
    //         "type":"basices"
    //     }
     
    
    const {pattern,info} = req.body;
    const result = await mySqlData(`EXECUTE [json].GetJsonValue N'${validateJson(info)}',N'$.${pattern}'`);
    res.send(result.recordset[0]);
})

//Well, now, according to the data in json form that we send from postman to Sql, we can process the data and put the age in the tables.
router.post("/Add", async(req:Request,res:Response) =>{
     const {productType,jsonContent} = req.body;

   const result = await mySqlData(` EXECUTE [json].AddProduct N'${productType}',N'${validateJson(jsonContent)}'`)
     res.send(result.recordset);
})



export default router;