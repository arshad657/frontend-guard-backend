import { exchangeCodeForToken } from "../services/githubService.ts";
import { env } from "../config/env.ts";

export const githubLogin = (req: any, res: any) => {
  const redirectUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${env.GITHUB_CLIENT_ID}` +
    `&scope=repo user:email`;

  res.redirect(redirectUrl);
};

export const githubCallback = async (req: any, res: any) => {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).json({ message: "Missing code" });
  }

  try {
    const token = await exchangeCodeForToken(code);

    return res.redirect(`${env.FRONTEND_URL}/dashboard?token=${token}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "OAuth failed" });
  }
};
