import {
  getUserRepos,
  getRepoBranches,
} from "../services/githubService.ts";

export const fetchRepos = async (req: any, res: any) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token" });

    const repos = await getUserRepos(token);

    res.json(repos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch repos" });
  }
};

export const fetchBranches = async (req: any, res: any) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const owner = Array.isArray(req.params.owner) ? req.params.owner[0] : req.params.owner;
    const repo = Array.isArray(req.params.repo) ? req.params.repo[0] : req.params.repo;

    if (!token) return res.status(401).json({ message: "No token" });
    if (!owner || !repo) return res.status(400).json({ message: "Missing owner or repo" });

    const branches = await getRepoBranches(token, owner, repo);

    res.json(branches);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch branches" });
  }
};