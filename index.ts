import app from "./app";
import { connectToDB } from "./src/config/database";

connectToDB();
const port = 5000;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port || 3000}`);
});
