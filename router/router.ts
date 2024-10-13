import express,{Application} from 'express';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import jsonValueFile from '../start/json-value/json-proj';
import jsonQuery  from '../start/json-query/json-query';
import jsonModify from '../start/json-modify/json-modyfy'

export default  (app:Application) =>{
   app.use(express.json());
   app.use(compression());
   app.use(cors());
   app.use(bodyParser.json());
   app.use("/api/jsonValue" , jsonValueFile);
   app.use("/api/jsonQuery" , jsonQuery);
   app.use("/api/jsonModify" , jsonModify);
}
