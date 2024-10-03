import express,{Application} from 'express';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import jsonValueFile from '../start/json-value/json-proj';

export default  (app:Application) =>{
   app.use(express.json());
   app.use(compression());
   app.use(cors());
   app.use(bodyParser.json());
   app.use("/api/jsonValue" , jsonValueFile);
}
