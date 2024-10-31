//We assume that the output of our json function is a record

import { Router,Request,Response } from "express";
const router = Router();
import mySqlData from "../db";
//When we make sure that our output is only one record, we can remove the bracket with this command
router.get("/" , async(req:Request,res:Response) =>{
  const result = await mySqlData(`    SELECT 
	      personId,
		  firstName,
		  lastName,
		  cityId
		    FROM Persons
			WHERE
			     personId = 2
				 FOR JSON AUTO , WITHOUT_ARRAY_WRAPPER
`)

res.json(result.recordset[0])
})



export default router;