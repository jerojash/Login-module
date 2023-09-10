import cors from "cors";
import "dotenv/config";
import Express from 'express';
import  UserRoute  from "./infrastructure/routes/user.route";
import dbInit from "./infrastructure/db/mongo";
import session from "express-session";

const app = Express();
app.use(cors());
app.use(Express.json())
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false
}))

const port = process.env.PORT || 3000;

app.use(UserRoute);
dbInit().then()
app.listen(port, ()=>console.log(`Server listen on port... ${port}`))
