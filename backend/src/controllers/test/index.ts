import { Request, Response } from "express";
import db from "../../config/db-config";

export const testDB = async (req: Request, res: Response) => {
  try {
    await db.raw("SELECT VERSION()");
    res.status(200).send({message: "connected to db"});
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
