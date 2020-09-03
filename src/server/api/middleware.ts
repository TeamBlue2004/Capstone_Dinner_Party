import express from 'express';
import path from 'path';
import app from './server';

const DIST_PATH = path.join(__dirname, '../../dist');
const PUBLIC_PATH = path.join(__dirname, '../../public');

app.use(express.json());

const expressMiddleware = () => {
  app.use(express.static(DIST_PATH));
  app.use(express.static(PUBLIC_PATH));
};

module.exports = expressMiddleware;
