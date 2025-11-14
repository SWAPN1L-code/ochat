import dotenv from "dotenv";
dotenv.config();

export const environment = process.env.NODE_ENV || "development";
export const port = parseInt(process.env.PORT || "5000", 10);
export const serverUrl = process.env.SERVER_URL?.trim() || "";

export const db = {
  name: process.env.DB_NAME || "",
  url: process.env.DB_URL || "",
  minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || "5"),
  maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || "10"),
};

// splitting the corsUrl and return url string array
export const corsUrl = process.env.CORS_URL?.split(",").map(url => url.trim()).filter(Boolean) || [];

export const cookieValidity = process.env.COOKIE_VALIDITY_SEC || "0";

export const tokenInfo = {
  jwtSecretKey: process.env.JWT_SECRET_KEY || "",
  accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || "0"),
  refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || "0"),
  issuer: process.env.TOKEN_ISSUER || "",
  audience: process.env.TOKEN_AUDIENCE || "",
};

// Validate critical environment variables
const requiredEnvVars = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  DB_URL: process.env.DB_URL,
  DB_NAME: process.env.DB_NAME,
  CORS_URL: process.env.CORS_URL,
};

const missingEnvVars: string[] = [];

Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value || value.trim() === "") {
    missingEnvVars.push(key);
  }
});

if (missingEnvVars.length > 0 && environment === "production") {
  console.error(
    `❌ Missing required environment variables: ${missingEnvVars.join(", ")}`
  );
  console.error("Please set all required environment variables before starting the server.");
  process.exit(1);
}

if (missingEnvVars.length > 0 && environment !== "production") {
  console.warn(
    `⚠️  Missing environment variables (non-critical in ${environment}): ${missingEnvVars.join(", ")}`
  );
}
