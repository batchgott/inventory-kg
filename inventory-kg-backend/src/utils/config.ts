import * as dotenv from "dotenv";

dotenv.config();

// switch (process.env.NODE_ENV) {
//   case "test":
//     path = `${__dirname}/../../.env.test`;
//     break;
//   case "production":
//     path = `${__dirname}/../../.env.production`;
//     break;
//   default:
//     path = `${__dirname}/../../.env.development`;
// }
// dotenv.config({ path: path });

export const DB_CONNECTION = process.env.DB_CONNECTION;
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
