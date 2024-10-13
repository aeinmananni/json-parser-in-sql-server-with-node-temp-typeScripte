import {Router,Request,Response} from "express";
const router = Router();
import mySqlData from "../db";
import validateJson from "../../utils/validate-json";

//In the following API, we want to use a Json format

router.post("/" , async (req:Request,res:Response) =>{
    const {productType,jsonContent} =req.body;
    //First, we send the following data in postman and then we receive this output from the database
    // {
    //     "productType":"Shose",
    //     "jsonContent":{
    //         "details":{
    //             "color":"black",
    //             "price":786000,
    //             "size":"43"
    //         }
    //     }
    // }

    const result = await mySqlData(`EXECUTE DataProcessingWithJsonQuery N'${productType}',N'${validateJson(jsonContent)}'`);
    res.send(result.recordset[0]);

    //Out Put 
    // {
    //     "productId": 1,
    //     "productType": "T-shirt",
    //     "jsonContent": "{\"details\":{\"color\":\"red\",\"price\":432000,\"size\":\"XXL\"}}",
    //     "details": "{\"color\":\"red\",\"price\":432000,\"size\":\"XXL\"}"
    // }
})

//Well, now we can retrieve the values ​​using jsonValue
router.get("/" , async(req,res) =>{
  const {whatColorIsIt,howMuch,WhatSizeIsIt } =req.query;

  const result = await mySqlData(`
 SELECT 
		      JSON_VALUE(details,'$.${whatColorIsIt}') AS Color,
			  JSON_VALUE(details,'$.${howMuch}') AS price,
			  JSON_VALUE(details,'$.${WhatSizeIsIt}') AS size
		
		FROM ProductFetchWithJsonQuery
    `)
    res.send(result.recordset[0]);

})



export default router;