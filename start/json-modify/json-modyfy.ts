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


//Now we want to add a value in an array
router.post("/AddNewValueInJsonArray" ,async(req:Request,res:Response) =>{

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


//Ok, now we want to add an object to our Json string, but I should note that this object can also be of type string. And we have to convert it into an object for processing
router.post("/addObject" , async(req:Request,res:Response) =>{
      const {info,newObjectName,newObjectValue} = req.body

    const result = await mySqlData(`SELECT JSON_MODIFY(N'${validateJson(info)}',N'$.${newObjectName}',JSON_QUERY(N'${validateJson(newObjectValue)}'))`);
    //Well, now we can use this JSON_QUERY(N'${validateJson(newObjectValue)}') command to turn the object values ​​that have been converted into strings into processable objects.

    res.send(result.recordset[0])

})


//Well, suppose we want to add an Array to our object
router.post("/addArray" , async(req:Request,res:Response) =>{
    const {info,newArrayName,newArrayValue,values} = req.body

    const result1 = await mySqlData(`SELECT JSON_MODIFY(N'${validateJson(info)}','$.${newArrayName}',JSON_QUERY(N'${validateJson(newArrayValue)}')) AS AddArray`);
    //Well, now we can use this JSON_QUERY(N'${validateJson(newObjectValue)}') command to turn the Array values ​​that have been converted into strings into processable objects.

    //---- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
   console.log(result1.recordset[0].AddArray)
    // Well, now we want to add another new value to the list of grades
    const result2 = await mySqlData(`SELECT JSON_MODIFY(N'${result1.recordset[0].AddArray}','append $.${newArrayName}',N'${values}') AS AppendNewValue`);
    res.send({AddArray: result1.recordset[0],AddnewValue:result2.recordset[0]})
})


//We can nest JSON_MODIFY functions and have a set of updates.

router.post("/MultiPle-Update" ,async(req:Request,res:Response) =>{
       const {info , whichField , newValue , addAge,ageValue  } = req.body;
    //   Request =>{
    //     {
    
    //         "info":{
    //                "name":"JACK",
    //               "skills":["Node js","React js"]
    //         },
    //         "whichField":"name",
    //         "newValue":"TOM"
              
    //     }
    // }
       const changeName = await mySqlData(`SELECT JSON_MODIFY(N'${validateJson(info)}','$.${whichField}',N'${newValue}') AS ChangeName`);
    //    Response =>
    //     {
    //         "ChangeName": "{\"name\":\"TOM\",\"skills\":[\"Node js\",\"React js\"]}"
    //     }

    //-------------------------------------------------------------------------------------------------------------------------------
        
     //We want to update again and add the age field this time
       const setAge = await mySqlData(`SELECT JSON_MODIFY(N'${changeName.recordset[0]?.ChangeName}','$.${addAge}','${ageValue}') AS AddAgeProperties`);

       //------------------------------------------------------------------------------------------------------------------------------------------------------

       //This time we want to add a new value to the skills presentation
       const setValueInSkillsArray = await mySqlData(`SELECT JSON_MODIFY(N'${setAge.recordset[0].AddAgeProperties}','append $.skills',N'HTML') AS setValueInSkillsArray`);

       res.send({Change_Name:changeName.recordset[0],newAge:setAge.recordset[0],newSkills:setValueInSkillsArray.recordset[0]});
})

//How to update the properties of an object

router.post("/edite-property-name" , async(req:Request,res:Response) =>{
    const {info,addAgeProperty,ageValue,newAge} = req.body;
    //First, based on this new structure, we add the age property

    //  Request =>{
    //     {
    
    //         "info":{
    //                "name":"JACK",
    //               "skills":["Node js","React js"]
    //         },
    //         "addAgeProperty":"age",
    //          "ageValue":24,
    //          "newAge":"Age"
        
              
    //     }
    //  }


   const firstAddAgeProperty = await mySqlData(`SELECT JSON_MODIFY(N'${validateJson(info)}','$.${addAgeProperty}',${ageValue}) AS AgeProperty`);
   
   const AddNewPropertyAndSetValueAge = await mySqlData(`SELECT JSON_MODIFY(N'${firstAddAgeProperty.recordset[0].AgeProperty}','$.${newAge}', CAST(JSON_VALUE(N'${firstAddAgeProperty.recordset[0].AgeProperty}','$.${addAgeProperty}') AS INT)) AS SetNewAgeProperty`);
   //We must be aware that since the JSON_VALUE function replaces a string value, we must convert it to a number.
   //CAST(JSON_VALUE(N'${firstAddAgeProperty.recordset[0].AgeProperty}','$.${addAgeProperty}') AS INT)
//    Response =>{
//     {
//         "firstAddAge": {
//             "AgeProperty": "{\"name\":\"JACK\",\"skills\":[\"Node js\",\"React js\"],\"age\":24}"
//         },
//         "add_and_update": {
//             "SetNewAgeProperty": "{\"name\":\"JACK\",\"skills\":[\"Node js\",\"React js\"],\"age\":24,\"Age\":\"24\"}"
//         }
//     }
//    }

 // ----------------------------------------------------------------------------------------------------------------------------------------

 //Well, now I want to remove the lower case age
   
 const removeLowerCaseAge = await mySqlData(`SELECT JSON_MODIFY(N'${AddNewPropertyAndSetValueAge.recordset[0]?.SetNewAgeProperty}','$.${addAgeProperty}',NULL) AS Removed`);

//  Response =>{
//     {
//         "firstAddAge": {
//             "AgeProperty": "{\"name\":\"JACK\",\"skills\":[\"Node js\",\"React js\"],\"age\":24}"
//         },
//         "add_and_update": {
//             "SetNewAgeProperty": "{\"name\":\"JACK\",\"skills\":[\"Node js\",\"React js\"],\"age\":24,\"Age\":24}"
//         },
//         "removeLowerCaseAge": {
//             "Removed": "{\"name\":\"JACK\",\"skills\":[\"Node js\",\"React js\"],\"Age\":24}"
//         }
//     }
//  }

   res.send({firstAddAge:firstAddAgeProperty.recordset[0],add_and_update:AddNewPropertyAndSetValueAge.recordset[0],removeLowerCaseAge:removeLowerCaseAge.recordset[0]});
})

//Now we want to have an object of clicks and be able to increase its value again and update it

router.post("/counter" , async(req:Request,res:Response) =>{
     const {info,whichField} =req.body;

    //  Request =>{
    //     {
    //         "info":{"counter_value":120},
    //         "whichField":"counter_value"
    //     }
    //  }

     const getvalueInObject = await mySqlData(`SELECT CAST(JSON_VALUE(N'${validateJson(info)}','$.${whichField}') AS INT) AS [count]`);

     //Well, now we want to update the value of the info field

     const modifyObject = await mySqlData(`SELECT JSON_MODIFY(N'${validateJson(info)}','$.${whichField}',${getvalueInObject.recordset[0]?.count + 1}) AS [Modify]`);


    //  Response = >{
    //     {
    //         "GetValue": 120,
    //         "SetValue": {
    //             "Modify": "{\"counter_value\":121}"
    //         }
    //     }
    //  }
     res.send({GetValue: getvalueInObject.recordset[0]?.count,SetValue:modifyObject.recordset[0]})
})



export default router;