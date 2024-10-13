import {Router,Request,Response} from "express";
const router = Router();
import mySqlData from "../db";
import validateJson from "../../utils/validate-json";
//We can use jsonModify to update the value of a property in the json string and return a new json string.


router.post("/ChangeTheName", async(req:Request,res:Response) =>{
    //Well, now suppose we want to change the name
     //REQUEST ==>
        // {
    
        //     "info":{
        //            "name":"JACK",
        //           "skills":["Node js","React js"]
        //     } ,
        //     "propertyName":"name",
        //       "newName":"SARA"
              
        // }
         
    const {info,propertyName,newName} = req.body;
    const result = await mySqlData(`SELECT JSON_MODIFY(N'${validateJson(info)}',N'$.${propertyName}',N'${newName}') `);
        
     //RESPONSE
//      "info":{
//         "name":"SARA",
//        "skills":["Node js","React js"]
//  } ,

    res.send(result.recordset[0]);
})


router.post("/AddNewField", async(req:Request,res:Response) =>{
    //REQUEST 
    // {
    
    //     "info":{
    //            "name":"JACK",
    //           "skills":["Node js","React js"]
    //     } ,
    //     "newProperty":"age",
    //       "newPropertyValue":38
          
    // }
     const {info,newProperty,newPropertyValue} = req.body;
    let result = await mySqlData(`SELECT JSON_MODIFY(N'${validateJson(info)}',N'$.${newProperty}',N'${newPropertyValue}') AS [JSON] `);
    
    //REPONSE

//     "info":{
//         "name":"JACK",
//        "skills":["Node js","React js"],
//         "age":38           
//  } ,


let result2 = await mySqlData(`SELECT JSON_MODIFY(N'${validateJson(result.recordset[0])}',N'$.age',NULL) AS [DELETE Age]`) ;

//We want to set the age value to null, and be able to remove it completely

//     "info":{
//         "name":"JACK",
//        "skills":["Node js","React js"],      
//  } ,
    res.json({ result1 :result.recordset[0] , result2:result2.recordset[0]});
    

}) 


router.post("/AddNewValueInJsonArray" ,async(req:Request,res:Response) =>{
    //Now we want to add a value in an array

     //REQUEST
    //  {
    
    //     "info":{
    //            "name":"JACK",
    //           "skills":["Node js","React js"]
    //     } ,
    //     "propertyName":"skills",
    //       "newValue":"HTML"
          
    // }
     const {info,propertyName,newValue} = req.body;
     const result = await 
     mySqlData(`SELECT JSON_MODIFY(N'${validateJson(info)}',N'append $.${propertyName}',N'${newValue}') AS [JSON]`);
    

     //RESPONSE 
     //{
     
//    "info":{
    //            "name":"JACK",
    //           "skills":["Node js","React js","HTML"]
    //       } ,
  //  } 

     res.send(result.recordset[0]);

})

export default router;