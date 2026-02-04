import "dotenv/config";
import { app, appPromise } from "../backend/src/index";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await appPromise;
  return app(req, res);
}
