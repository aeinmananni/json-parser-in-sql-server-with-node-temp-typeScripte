import express,{Application} from 'express';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import jsonValueFile from '../start/json-value/json-proj';
import jsonQuery  from '../start/json-query/json-query';
import jsonModify from '../start/json-modify/json-modyfy';
import openJson from '../start/open-json/open-json';
import forJson from '../start/for-json/for-json';
export default  (app:Application) =>{
   app.use(express.json());
   app.use(compression());
   app.use(cors());
   app.use(bodyParser.json());
   app.use("/api/jsonValue" , jsonValueFile);
   app.use("/api/jsonQuery" , jsonQuery);
   app.use("/api/jsonModify" , jsonModify);
   app.use("/api/openJson" , openJson);
   app.use("/api/forJson" , forJson);

}
