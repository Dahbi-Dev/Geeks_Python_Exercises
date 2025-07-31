// ES6 syntax
import express from "express";

import Routers from './routes/index.js'

const app = express();
const PORT = 3000;



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


app.use(express.json())
app.use('/' , Routers)