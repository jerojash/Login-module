import express, { Router } from "express";
import { UserAdapterRepository } from "../user.adapter";
import UserController from "../controller/user.controller";
import RegisterUserApplication from "../../application/registerUser";
import GetUsersApplication from "../../application/getAllUsers";

const route = express.Router();

const mongoRepository = new UserAdapterRepository;

const registerUserService = new RegisterUserApplication(mongoRepository)

const getUsersService = new GetUsersApplication(mongoRepository)

const UserCtrl = new UserController(registerUserService,getUsersService) 


route.post(`/user/register`, UserCtrl.insertUser);

route.get('/login', (_req,res)=>{
    res.send('Login')
})

route.get(`/users`, UserCtrl.findUsers);

export default route

