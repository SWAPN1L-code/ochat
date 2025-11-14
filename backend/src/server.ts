import httpServer, { app } from "./app";
import { port, environment } from "./config";
import { connection } from "./database";

// Handle database connection errors
connection.on("error", (error) => {
  console.error("❌ Database connection error:", error);
  if (environment === "production") {
    process.exit(1);
  }
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("❌ Unhandled Promise Rejection:", err);
  if (environment === "production") {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

// Graceful shutdown (only for traditional server, not Vercel)
if (!process.env.VERCEL) {
  const gracefulShutdown = async (signal: string) => {
    console.log(`${signal} signal received: closing HTTP server`);
    httpServer.close(() => {
      console.log("HTTP server closed");
      connection.close(false).then(() => {
        console.log("Database connection closed");
        process.exit(0);
      }).catch((err) => {
        console.error("Error closing database connection:", err);
        process.exit(1);
      });
    });
  };

  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
}

// For Vercel serverless, export the Express app directly
// Note: Socket.io has limitations in serverless environments - real-time features may not work
if (process.env.VERCEL) {
  module.exports = app;
} else {
  // Traditional server startup
  httpServer.listen(port, "0.0.0.0", () => {
    console.log(`⚙️  Server running on port ${port} in ${environment} mode`);
    console.log(`📍 Health check available at http://localhost:${port}/health`);
  });
}
