import { prepareServer } from '../backend/app.js';

let appPromise = null;

async function getApp() {
  if (!appPromise) {
    appPromise = prepareServer();
  }
  return appPromise;
}

export default async function handler(req, res) {
  const app = await getApp();

  app(req, res);
}

export const config = {
  runtime: 'nodejs'
};
