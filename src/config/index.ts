import dotenv from 'dotenv';
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'dev';

export const MONGO_URL = process.env.MONGO_URL;
export const MONGO_USER = process.env.MONGO_USER;
export const MONGO_DB = process.env.MONGO_DB;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

export const SERVER_PORT = process.env.SERVER_PORT;
