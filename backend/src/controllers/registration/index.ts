import { Request, Response } from "express";
import db from "../../config/db-config";

export const register = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, user_type } = req.body;
   
    await db("users").insert({
      first_name,
      last_name,
      email,
      user_type,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById= async (req: Request, res: Response) => {
  try {
    const userId = req.params.id; 
    const userData = await db("users").where({ id: userId }).first();
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
 

 

 
 
 
 
 