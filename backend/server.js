const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/dashboard", require("./routes/dashboard"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running without DB on port ${PORT}`);
});
