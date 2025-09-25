export default {
    PORT: 3000,
    MONGODB_URI:"mongodb://localhost:27017/safecampus",
    JWT_SECRET: process.env.JWT_SECRET || "123456",
    CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173"
  };
