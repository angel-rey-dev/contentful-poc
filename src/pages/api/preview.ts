import { COOKIE_NAME_PRERENDER_BYPASS } from "next/dist/server/api-utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { secret, slug } = req.query;

  if (secret !== process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_SECRET || !slug) {
    return res.status(401).json({ message: "Invalid secret or missing path" });
  }
  // Enable Preview Mode by setting the cookie
  res.setPreviewData({});

  // Override cookie header for preview mode for usage in live-preview
  // https://github.com/vercel/next.js/issues/49927
  // https://github.com/vercel/next.js/blob/62af2007ce78fdbff33013a8145efbcacbf6b8e2/packages/next/src/server/api-utils/node.ts#L293
  const headers = res.getHeader("Set-Cookie");
  if (Array.isArray(headers)) {
    res.setHeader(
      "Set-Cookie",
      headers.map((cookie) => {
        if (cookie.includes(COOKIE_NAME_PRERENDER_BYPASS)) {
          return cookie.replace(
            "SameSite=Lax",
            "auth=true; SameSite=None; Secure"
          );
        }
        return cookie;
      })
    );
  }
  res.writeHead(307, { Location: `/${slug}` });
  res.end();
}
