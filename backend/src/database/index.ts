import mongoose from "mongoose";
import { db } from "../config";
import colorsUtils from "../helpers/colorsUtils";
import seedRoles from "../seeds/seedRoles";

// db con URI
const dbURI = `${db.url}/${db.name}`;

// additional configuration option for db
const options = {
  minPoolSize: db.minPoolSize,
  maxPoolSize: db.maxPoolSize,
  connectTimeoutMS: 60000,
  socketTimeoutMS: 45000,
};

mongoose.set("strictQuery", true);

function setRunValidators(this: any): void {
  this.setOptions({ runValidators: true });
}

// create a connection to the database
mongoose
  .plugin((schema: any) => {
    schema.pre("findOneAndUpdate", setRunValidators);
    schema.pre("updateMany", setRunValidators);
    schema.pre("updateOne", setRunValidators);
    schema.pre("update", setRunValidators);
  })
  .connect(dbURI, options)
  .then(() => {
    colorsUtils.log("success", "🛢  mongoose connection done");
  })
  .catch((e) => {
    console.error("❌ mongoose connection error: " + e.message);
    console.error("Stack:", e.stack);
    // In production, exit if database connection fails
    if (process.env.NODE_ENV === "production") {
      console.error("Exiting due to database connection failure in production mode");
      process.exit(1);
    }
  });

// connection events
mongoose.connection.on("connected", () => {
  colorsUtils.log(
    "success",
    "🔗 mongoose connection opened : " + mongoose.connection.host
  );
});

// seed the roles once db is opened
mongoose.connection.once("open", async () => {
  await seedRoles();
});

mongoose.connection.on("disconnected", () => {
  colorsUtils.log("warning", "mongoose connection disconnected");
});

export const connection = mongoose.connection;
