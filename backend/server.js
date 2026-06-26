import { prepareServer } from './app.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const app = await prepareServer();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
}

startServer();
