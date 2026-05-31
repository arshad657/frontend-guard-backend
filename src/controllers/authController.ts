import { exchangeCodeForToken } from "../services/githubService.ts";
import { env } from "../config/env.ts";

export const githubLogin = (req: any, res: any) => {
  const redirectUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${env.GITHUB_CLIENT_ID}` +
    `&user:email`;

  res.redirect(redirectUrl);
};

export const githubCallback = async (req: any, res: any) => {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).json({ message: "Missing code" });
  }

  try {
    const token = await exchangeCodeForToken(code);

    console.log("OAuth successful, token:", token);

    res.cookie("github_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return res.redirect(`${env.FRONTEND_URL}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "OAuth failed" });
  }
};

export const getGithubStatus = async (
  req: any,
  res: any
) => {
  const token = req.cookies.github_token;

  if (!token) {
    return res.json({
      connected: false,
    });
  }

  return res.json({
    connected: true,
  });
};
