import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Clear preview data
    res.clearPreviewData();

    // Redirect to the last page the user was on
    const redirectUrl = req.headers?.referer || "/";
    res.redirect(redirectUrl);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
