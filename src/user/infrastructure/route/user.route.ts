import express, { Router } from "express";
import { UserAdapterRepository } from "../user.adapter";
import UserController from "../controller/user.controller";
import RegisterUserApplication from "../../application/registerUser";
import GetUsersApplication from "../../application/getAllUsers";
import LoginUserApplication from "../../application/loginUser";

const route = express.Router();

const mongoRepository = new UserAdapterRepository;

const registerUserService = new RegisterUserApplication(mongoRepository)

const getUsersService = new GetUsersApplication(mongoRepository)

const loginService = new LoginUserApplication(mongoRepository);

const UserCtrl = new UserController(registerUserService,getUsersService,loginService) 


route.post(`/register`, UserCtrl.insertUser);

route.post('/login', UserCtrl.login)

route.get(`/users`, UserCtrl.findUsers);

export default route

