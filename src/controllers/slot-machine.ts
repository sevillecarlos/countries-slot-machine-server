import { Request, Response } from "express";
import { slotMachineRewardRules } from "../helpers";
import { SlotMachine } from "../interfaces/slot-machine.interface";

// get result of slot machine
const resultOfSlotMachine = async (req: Request, res: Response) => {
  const reels: SlotMachine = req.body;
  // check slot machine result and win coins
  const winningCoins = slotMachineRewardRules(reels);
  res.status(200).json({ coins: winningCoins });
};

export default { resultOfSlotMachine };
