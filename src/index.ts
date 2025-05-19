import app from './app';
import { connectToDB } from './config/database';

connectToDB();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});