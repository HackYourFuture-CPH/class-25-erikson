import { Request, Response } from 'express';
import db from '../../config/db-config';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, user_type, uid } = req.body;

    const user = await db('users')
      .insert({
        first_name,
        last_name,
        email,
        user_type,
        uid,
      })
      .returning('*');
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userData = await db('users').where({ id: userId }).first();
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserByUid = async (req: Request, res: Response) => {
  try {
    const userUID = req.params.uid;
    const userData = await db('users').where('uid', userUID).first();
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
