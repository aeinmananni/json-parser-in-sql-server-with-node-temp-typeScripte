import sql, { IResult } from 'mssql/msnodesqlv8';
import "dotenv-safe/config";
const config = {
     database:process.env.DATABASE || "",
     server:process.env.SERVER || "",
     options:{
         trustedConnection:true
     }
}

const mySqlData = async (sqlQuery:string):Promise<IResult<any>> =>{
    try{
        let pool = await sql.connect(config);
        let result = await pool.request().query(sqlQuery);
        await pool.close();
        return result;

    }catch(error){
        throw error
    }
}

export default mySqlData;