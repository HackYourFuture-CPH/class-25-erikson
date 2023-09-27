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

export const getUserById= async (req: Request, res: Response) => {
  try {
    // Assuming you want to retrieve user data based on a user ID, which you would pass as a query parameter
    const userId = req.params.id; // Assuming the query parameter is named "userId"

    // Fetch user data from the database based on the user ID
    const userData = await db("users").where({ id: userId }).first();

    if (!userData) {
      // If no user with the provided ID is found, return a 404 Not Found response
      return res.status(404).json({ error: "User not found" });
    }

    // If a user is found, send the user data as a JSON response
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
 

 

 
 
 
 
 