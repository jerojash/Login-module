import cors from "cors";
import "dotenv/config";
import Express from 'express';
import  UserRoute  from "./infrastructure/route/user.route";
import dbInit from "./infrastructure/db/mongo";

const app = Express();
app.use(cors());
app.use(Express.json())

const port = process.env.PORT || 3000;

app.use(UserRoute);
dbInit().then()
app.listen(port, ()=>console.log(`Server listen on port... ${port}`))
