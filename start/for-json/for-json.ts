import { Router,Request,Response } from "express";
const router = Router();
import mySqlData from "../db";
// Json output formatting
//We can convert the output of SQL tables to JSON format using this command

  router.get("/AUTO" , async(req:Request,res:Response) =>{
      
     const result = await mySqlData(`
        SELECT [P].personId,
               [P].firstName + SPACE(2) + [P].lastName AS [FullName],       
               [P].cityId,
               [C].cityName,
               [C].cityCode
         FROM Persons [P] INNER JOIN cityes [C]
        ON
        [P].cityId = [C].cityId
        FOR JSON AUTO
`)

// Response =>[
//     {
//         "JSON_F52E2B61-18A1-11d1-B105-00805F49916B":  
  //"[
  
   //{\

   //"personId\":1,
   //\"FullName\":\"hadi  najafi\",\
   //"cityId\":2,\
   //"C\":[{\"cityName\":\"mazandran\",\"cityCode\":11}]

   //},

   //{\
   //"personId\":2,
   //\"FullName\":\"sara  bayati\",\
   //"cityId\":1,\
   //"C\":[{\"cityName\":\"tehran\",\"cityCode\":21}]

   //}
//  ,{
//     \"personId\":3,
//     \"FullName\": \"hossine  rohi\",
//     \"cityId\":2,
//     \"C\":[{\"cityName\":\"mazandran\",\"cityCode\":11}]
    
//   },
//   {\
//     "personId\":4,
//     \"FullName\":\"kamran  rezaei\",
//     \"cityId\":3,
//     \"C\":[{\"cityName\":\"bushehr\",\"cityCode\":771}]
//    }
// ]"
//     }
// ]
res.send(result.recordset);

  })

 //We want from FOR JSON PATH let's use
  router.get("/PATH" , async (req,res) =>{
          
     const result = await mySqlData(`
        SELECT [P].personId,
               [P].firstName + SPACE(2) + [P].lastName AS [FullName],       
               [P].cityId,
               [C].cityName,
               [C].cityCode
         FROM Persons [P] INNER JOIN cityes [C]
        ON
        [P].cityId = [C].cityId
        FOR JSON PATH
`)

//  Response => 
//     [
//         {
//             "JSON_F52E2B61-18A1-11d1-B105-00805F49916B": 
            //    "[
               
            //    {\
            //     "personId\":1
            //     ,\"FullName\":\"hadi  najafi\"
            //     ,\"cityId\":2
            //     ,\"cityName\":\"mazandran\"
            //     ,\"cityCode\":11
            //     }
            //     ,{
                    
            //         \"personId\":2
            //         ,\"FullName\":\"sara  bayati\"
            //         ,\"cityId\":1
            //         ,\"cityName\":\"tehran\"
            //         ,\"cityCode\":21
                    
            //     }
            //     ,{
            //         \"personId\":3
            //         ,\"FullName\":\"hossine  rohi\"
            //         ,\"cityId\":2
            //         ,\"cityName\":\"mazandran\"
            //         ,\"cityCode\":11
                    
            //     }
            //     ,{
            //         \"personId\":4,
            //         \"FullName\":\"kamran  rezaei\"
            //         ,\"cityId\":3
            //         ,\"cityName\":\"bushehr\"
            //         ,\"cityCode\":771
                    
            //     }
                
            //    ]"
//         }
//     ]

res.send(result.recordset)
 }) 
 
//I want to use the PATH command to convert the output of the columns that we connected with it into an object

router.get("/PATH/Convert" , async (req,res) =>{
          
    const result = await mySqlData(`
       SELECT [P].personId,
              [P].firstName + SPACE(2) + [P].lastName AS [FullName],       
              [P].cityId AS 'city.id',
              [C].cityName AS 'city.name',
              [C].cityCode AS  'city.code'
        FROM Persons [P] INNER JOIN cityes [C]
       ON
       [P].cityId = [C].cityId
       FOR JSON PATH
`)

//  Response => 
// [
//     {
//         "JSON_F52E2B61-18A1-11d1-B105-00805F49916B": "[{\"personId\":1,\"FullName\":\"hadi  najafi\",\"city\":{\"id\":2,\"name\":\"mazandran\",\"code\":11}},{\"personId\":2,\"FullName\":\"sara  bayati\",\"city\":{\"id\":1,\"name\":\"tehran\",\"code\":21}},{\"personId\":3,\"FullName\":\"hossine  rohi\",\"city\":{\"id\":2,\"name\":\"mazandran\",\"code\":11}},{\"personId\":4,\"FullName\":\"kamran  rezaei\",\"city\":{\"id\":3,\"name\":\"bushehr\",\"code\":771}}]"
//     }
// ]

res.send(result.recordset)
}) 


export default router;