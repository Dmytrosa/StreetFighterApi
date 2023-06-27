import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const db = "E:/Front/bynary/Street_Fighter/api/lecture-starter-nodejs/lecture-starter-nodejs/config/database.json";

const router = Router();

router.get('/', function(req, res, next){
  const data = fs.readFileSync(db, 'utf-8');
  const parsedData = JSON.parse(data);
  res.setHeader('Content-Type', 'application/json'); 
  res.send(parsedData.users); 
});

router.get('/:id', function(req, res, next){
  const data = fs.readFileSync(db, 'utf-8');
  const parsedData = JSON.parse(data);
  
  const userId = req.params.id;
  const user = parsedData.users.find(user => user.id === userId);

  if (!user) {
    res.status(404).send('User not found');
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.send(user);
  }
});

router.delete('/:id', function(req, res, next) {
  const userId = req.params.id; 
  const data = fs.readFileSync(db, 'utf-8');
  const parsedData = JSON.parse(data);
  
  const userIndex = parsedData.users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  parsedData.users.splice(userIndex, 1);
  fs.writeFileSync(db, JSON.stringify(parsedData, null, 2));
  
  res.json({ message: 'User deleted successfully' });
});


router.put('/:id', (req, res, next)=> {
  console.log(next)
  console.log(req.body)
  const id = req.params.id; 
  const updatedUser = req.body; 
  const data = fs.readFileSync(db, 'utf-8');
  const parsedData = JSON.parse(data);
  const user = parsedData.users.find(user => user.id === id);
  if (!user) {
    res.status(404).send('User not found');
  } else {
    user.email = updatedUser.email;
    user.password = updatedUser.password;
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    user.phoneNumber = updatedUser.phoneNumber;
    fs.writeFileSync(db, JSON.stringify(parsedData, null, 2));
    res.send('User updated successfully');
  }
});
router.post('/', (req, res, next) => {
  const data = fs.readFileSync(db, 'utf-8');
  const parsedData = JSON.parse(data);
  const newId = uuidv4();
  const newUser = {
    id: newId,
    ...req.body
  };

  parsedData.users.push(newUser);
  fs.writeFileSync(db, JSON.stringify(parsedData, null, 2));
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ message: 'Object added successfully' })); 
});

export { router };
