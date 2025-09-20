import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
})();
