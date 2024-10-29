import { Router ,Request,Response} from "express";
const router = Router();
import mySqlData from "../db";


//Adding the root node to the Json output and we can set a title to our Json output
router.post("/POST" , async(req:Request,res:Response) =>{
    const result = await mySqlData(`
    SELECT 
       personId,
	   firstName,
	   lastName
  FROM Persons    
  FOR JSON AUTO ,ROOT('INFO')    
`)

  res.send(result.recordset)
})



export default router;