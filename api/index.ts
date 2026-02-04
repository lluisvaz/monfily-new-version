import { app, appPromise } from "../backend/src/index";

export default async (req: any, res: any) => {
  await appPromise;
  return app(req, res);
};
