const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const db = require("./config/connection");

const typeDefs = require("./schemas/typeDefs");
const resolvers = require("./schemas/resolvers");

const app = express();
const PORT = process.env.PORT || 4000;

// Create a new Apollo server instance
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  try {
    await server.start();

    app.use(cors({ origin: "*" })); // Allow all origins (or specify frontend URL)
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Set up the GraphQL endpoint
    app.use("/graphql", expressMiddleware(server));

    db.once("open", () => {
      console.log(`✅ Database connected. Preparing to start the server...`);

      app.listen(PORT, () => {
        console.log(`🌍 Server running on port ${PORT}`);
        console.log(`🚀 GraphQL API available at http://localhost:${PORT}/graphql`);
      });
    });

    // Handle database connection errors
    db.on("error", (err) => {
      console.error("❌ Database connection error:", err);
    });

  } catch (error) {
    console.error("🔥 Error starting server:", error);
  }
}

startServer();
