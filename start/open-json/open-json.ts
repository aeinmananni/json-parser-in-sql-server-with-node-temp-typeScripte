
import { Router ,Request,Response } from "express";
import validateJson from "../../utils/validate-json";
import mySqlData from "../db";
const router = Router();


//Well, now we want to use the OPENJSON command to get a list of SQL tables

router.post("/example1" , async(req:Request,res:Response) =>{
    // Request =>{
    //     {
    //         "info":{
    //               "name":"Johan",
    //               "age":24,
    //               "score":"18.54",
    //               "married":false,
    //               "validate":true,
    //               "city":null,
    //               "skills":["c#","sql","node js"],
    //               "details":{"sports":["tennis","water polo"]}
    //         }
    //    }
    // }

  const {info} = req.body;
  const result = await mySqlData(`SELECT * FROM OPENJSON(N'${validateJson(info)}')`);
  res.send(result.recordset);

})

//Now we can convert a specific element in the Jason string to a key and value vert, for example "details":{"sports":["tennis","water polo"]

router.post("/example2" , async(req:Request,res:Response) =>{
    const {info} = req.body;
    const result = await mySqlData(`SELECT * FROM OPENJSON(N'${validateJson(info)}','$.details.sports')`);
    res.send(result.recordset);
})

//We can format the OPENJSON output


router.post("/example3" , async(req:Request,res:Response) =>{
// Request => "info":{
//      "info":[
//         {"id":1,"firstName":"AAA","lastName":"aaa" ,"details":{"cityId":1 , "cityName":"sari"}},
//         {"id":2,"firstName":"BBB","lastName":"bbb","details":{"cityId":2 , "cityName":"Tehran"}}
//         {"id":3,"firstName":"CCC","lastName":"ccc","details":{"cityId":3 , "cityName":"babol"}}
//         ]
//    }
    const {info} = req.body;
    const result = await mySqlData(`
        SELECT 
        * 
        FROM 
        OPENJSON(N'${validateJson(info)}')
         WITH(
              id INT,
              firstName NVARCHAR(50),
              lastName NVARCHAR(50),
              cityId  INT   '$.details.cityId',
              cityName NVARCHAR(50) '$.details.cityName',  --Now, when we want to get the value of the field from an internal object, we act like this
              details NVARCHAR(MAX)   AS JSON               --How to get the data of a field with an object
         )
        `);
    res.send(result.recordset);

    // Response  =>[
    //     {
    //         "id": 1,
    //         "firstName": "AAA",
    //         "lastName": "aaa"
    //     },
    //     {
    //         "id": 2,
    //         "firstName": "BBB",
    //         "lastName": "bbb"
    //     },
    //     {
    //         "id": 3,
    //         "firstName": "CCC",
    //         "lastName": "ccc"
    //     }
    // ]
})




export default router;
