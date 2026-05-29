import axios from "axios";
import { env } from "../config/env.ts";

export async function exchangeCodeForToken(code: string) {
  const res = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    },
    {
      headers: { Accept: "application/json" },
    }
  );

  return res.data.access_token;
}

export async function getUserRepos(token: string) {
  const res = await axios.get("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function getRepoBranches(
  token: string,
  owner: string,
  repo: string
) {
  const res = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/branches`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}