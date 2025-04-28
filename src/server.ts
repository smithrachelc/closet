import { app } from './main.server';

const serverApp = app();
export default function handler(req: any, res: any) {
  serverApp(req, res);
}
