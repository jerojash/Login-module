import { connect } from "mongoose";

const DB_URI = `${process.env.DB_URI}`;


const uri = DB_URI;



const dbInit = async() => {
    await connect(uri);
    console.log('Connection Succesfull!')
}

export default dbInit