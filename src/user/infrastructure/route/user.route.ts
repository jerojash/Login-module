import express, { Router } from "express";
import { UserAdapterRepository } from "../user.adapter";
import UserController from "../controller/user.controller";
import RegisterUserApplication from "../../application/registerUser";

const route = express.Router();

const mongoRepository = new UserAdapterRepository;

const registerUserService = new RegisterUserApplication(mongoRepository)

const UserCtrl = new UserController(registerUserService) 


route.post(`/user/register`, UserCtrl.insertUser);

route.get('/login', (_req,res)=>{
    res.send('Login')
})

export default route

