import path from "path";
import { promises as fs } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const dir = path.join(process.cwd(), "data");
    const fileContent = await fs.readFile(dir + "/data.json", "utf8");
    res.status(200).json(fileContent);
}
