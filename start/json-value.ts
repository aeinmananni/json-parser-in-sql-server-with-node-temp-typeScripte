import { Router,Request,Response } from "express";
const router = Router();
import mySqlData from "./db";

router.post("/" , async (req:Request,res:Response) =>{
    // send post method with postman => 
    //     {
    //         "pattern":"addrres.country",
    //         "info":{
    //             "id":1,
    //              "addrres":{
    //                    "country":"Iran",
    //                    "city":"sari"
    //              },
    //              "tags":["sports","eater-polo"]
    //         },
    //         "type":"basices"
    //     }
    
    
    
    const {pattern,info} = req.body;
      const validatJson = (data:object) => JSON.stringify(data);

    const result = await mySqlData(`EXECUTE [json].GetJsonValue N'${validatJson(info)}',N'$.${pattern}'`);
 
    res.send(result.recordset[0]);
})


export default router;