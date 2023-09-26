import { Request, Response } from "express";
import { adminFireAuth } from "../../firebase/config";
import db from "../../config/db-config";

export const register = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, user_type } = req.body;
   
    console.log(req.body);
    const newUser = await db("users").insert({
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


 

 

 
 
 
 
 