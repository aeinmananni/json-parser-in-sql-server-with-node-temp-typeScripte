import { Router,Request,Response } from "express";
const router = Router();
import mySqlData from "./db";

router.get("/" , async (req:Request,res:Response) =>{
   
    const result = await mySqlData(`SELECT  N'ffffff' AS [myJson]`)
    res.send(result.recordset[0]);
})


export default router;