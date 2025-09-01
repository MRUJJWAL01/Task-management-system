//server.js
const app = require("./src/app.js");
const connectDB = require("./src/db/db.js");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
connectDB();

app.listen(PORT, () =>{ 
    console.log(`✅ Server running on port ${PORT}`)
});

