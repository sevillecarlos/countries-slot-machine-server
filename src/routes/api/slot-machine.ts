import express from "express";
import { body, param } from "express-validator";

// controllers
import controller from "../../controllers/slot-machine";

const router = express.Router();

// get the result os the slot machine
router.post(
  "/slot-machine",
  body("reels").isObject(),
  controller.resultOfSlotMachine
);

export default router;
