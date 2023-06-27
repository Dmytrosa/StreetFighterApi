import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import fs from 'fs';

const router = Router();
const dbPath = "E:/Front/bynary/Street_Fighter/api/lecture-starter-nodejs/lecture-starter-nodejs/config/database.json";

router.post(
  "/login",
  (req, res, next) => {
    try {
      const data = fs.readFileSync(dbPath, 'utf-8');
      if (!data) {
        throw new Error('Empty JSON data');
      }
      const parsedData = JSON.parse(data);
      
      const { email, password } = req.body;
      const user = parsedData.users.find((user) => user.email === email && user.password === password);
      if (user) {
        res.data = user;
      } else {
        res.err = "User not found"; 
      }
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };

