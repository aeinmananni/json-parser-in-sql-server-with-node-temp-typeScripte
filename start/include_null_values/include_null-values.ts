import { Router,Request,Response } from "express";
const router = Router();
import mySqlData from "../db";
//This function is used to display null columns in Jason's output mode
router.get("/GET" , async(req:Request,res:Response) =>{
    const result = await mySqlData(`
        SELECT 
              * FROM
                     cityes
                     FOR JSON AUTO,INCLUDE_NULL_VALUES
`)

res.send(result.recordset)
})



export default router;
