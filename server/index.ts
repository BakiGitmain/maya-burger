import "dotenv/config";

import app from "./api/index";

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(
    `Maya Burger API running on http://localhost:${PORT}`
  );
});