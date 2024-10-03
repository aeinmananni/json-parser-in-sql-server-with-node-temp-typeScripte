import express,{Application} from 'express';
import 'dotenv-safe/config';
const app:Application = express();
import("./router/router").then((module)=>{
    (module as any as{default:(app:Application)=>void}).default(app);
})
const port = process.env.SERVER_PORT || 3030;
app.listen(port,()=>console.log(`Listening On Port : ${port}`));