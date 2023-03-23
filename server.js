const app = require("./app");
const { connectMongo } = require("./db/connections");

const startServer = async () => {
  try {
    await connectMongo();

    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
