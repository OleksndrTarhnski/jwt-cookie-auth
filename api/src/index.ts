import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import connectToDatabase from './db';
import User from './db/models/User';
import { verifyToken, IAuthenticateRequest } from './middlewares';

const corsConfig = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: 'Content-Type, Accepts, Authorization, Access-Control-Allow-Credentials',
  credentials: true,
};

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Express + TypeScript Server' });
});

app.post('/register', async (req: Request, res: Response) => {
  const { email, userName, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: `User with email ${email} already exists` });

    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    
    const newUser = new User({
      email,
      userName,
      password: hashedPassword,
    });

    newUser.save();
    return res.status(201).json({ message: 'Success!', user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret_key', {
      expiresIn: '1h',
    });

    res.cookie('token', token, { httpOnly: true });

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/me', verifyToken, async (req: IAuthenticateRequest, res: Response) => {
  try {
    const currentUser = await User.findById(req.userId);

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { _id, email, userName } = currentUser;

    return res.status(200).json({ user: { _id, email, userName } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

connectToDatabase();
