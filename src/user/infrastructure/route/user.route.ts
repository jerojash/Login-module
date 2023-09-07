import { Router } from "express";
import { UserAdapterRepository } from "../user.adapter";
import registerUser from "../../application/registerUser";
import UserController from "../controller/user.controller";

const route = Router();

const mongoRepository = new UserAdapterRepository;

const registerUserService = new registerUser(mongoRepository)

const UserCtrl = new UserController(registerUserService) 

route.post(`/user/register`, UserCtrl.insertUser);

