import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
const router = Router();

const db = "E:/Front/bynary/Street_Fighter/api/lecture-starter-nodejs/lecture-starter-nodejs/config/database.json";

router.get("/", (req, res, next) => {
  try {
    const data = fs.readFileSync(db, "utf-8");
    const parsedData = JSON.parse(data);

    const fighters = parsedData.fighters;

    res.send(fighters);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", (req, res, next) => {
  try {
    const fighterId = req.params.id;
    const data = fs.readFileSync(db, "utf-8");
    const parsedData = JSON.parse(data);
    const fighters = parsedData.fighters;
    const fighter = fighters.find(fighter => fighter.id === fighterId);

    if (!fighter) {
      return res.status(404).json({ message: 'Fighter not found' });
    }
    res.send(fighter);
  } catch (err) {
    next(err);
  }
});
router.put("/:id", (req, res, next) => {
  try {
    const fighterId = req.params.id; 
    const updatedFighter = req.body; 

    const data = fs.readFileSync(db, "utf-8");
    const parsedData = JSON.parse(data);
    const fighterIndex = parsedData.fighters.findIndex(
      (fighter) => fighter.id === fighterId
    );

    if (fighterIndex === -1) {
      return res.status(404).json({ message: "Fighter not found" });
    }
    parsedData.fighters[fighterIndex] = {
      ...parsedData.fighters[fighterIndex],
      ...updatedFighter,
    };
    fs.writeFileSync(db, JSON.stringify(parsedData, null, 2));

    res.json({ message: "Fighter updated successfully" });
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", (req, res, next) => {
  try {
    const fighterId = req.params.id; 
    const data = fs.readFileSync(db, "utf-8");
    const parsedData = JSON.parse(data);

    const fighters = parsedData.fighters;
    const fighterIndex = fighters.findIndex((fighter) => fighter.id === fighterId);

    if (fighterIndex === -1) {
      return res.status(404).json({ message: "Fighter not found" });
    }
    fighters.splice(fighterIndex, 1);
    fs.writeFileSync(db, JSON.stringify(parsedData, null, 2));
    res.json({ message: "Fighter deleted successfully" });
  } catch (err) {
    next(err);
  }
});



router.post("/", (req, res, next) => {
  try {
    const newFighter = {
      id: uuidv4(),
      ...req.body
    };

    const data = fs.readFileSync(db, "utf-8");
    const parsedData = JSON.parse(data);

    parsedData.fighters.push(newFighter);

    fs.writeFileSync(db, JSON.stringify(parsedData, null, 2));

    res.send("Fighter added successfully");
  } catch (err) {
    next(err);
  }
}, responseMiddleware);


export { router };
