
// What This Ingestion Engine Does:

// 1. Fetches the ZIP archive of the specified GitHub repository and branch using the GitHub API.
// 2. Uses `adm-zip` to read the ZIP file directly from memory without writing it to disk.
// 3. Normalizes the file paths by replacing the original root folder (which is typically named like `owner-repo-hash`) with a consistent `/repo` prefix.
// 4. Populates a virtual file system (using `memfs`) with the extracted files, allowing for efficient in-memory access.

// GitHub Repository
//        ↓
// ZIP Download
//        ↓
// ZIP Extraction
//        ↓
// Virtual File System (memfs)
//        ↓
// Structured Repository Tree

import axios from "axios";
import { Volume } from "memfs";
import AdmZip from "adm-zip";

export async function ingestRepository(
  owner: string,
  repo: string,
  branch = "main",
  token?: string,
) {
  const url = `https://api.github.com/repos/${owner}/${repo}/zipball/${branch}`;

  const vol = new Volume();

  vol.reset();

  // Initialize root
  vol.mkdirSync("/", { recursive: true });

  try {
    console.log(`Fetching ${owner}/${repo}...`);

    const response = await axios({
      method: "get",
      url,
      responseType: "arraybuffer",
      headers: {
        Authorization: token ? `token ${token}` : undefined,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Repo-Analyzer",
      },
    });

    const zip = new AdmZip(Buffer.from(response.data));

    const entries = zip.getEntries();

    // Get the original root folder name (e.g., "facebook-react-d5736f0")
    const rootFolder = entries[0].entryName.split("/")[0];

    for (const entry of entries) {
      if (!entry.isDirectory) {
        // 1. Split the entry name into parts
        const parts = entry.entryName.split("/");

        // 2. Replace the first part (the root) with "repo"
        if (parts[0] === rootFolder) {
          parts[0] = "repo";
        }

        // 3. Reconstruct the path
        const normalizedPath = `/${parts.join("/")}`;
        const dir = normalizedPath.substring(
          0,
          normalizedPath.lastIndexOf("/"),
        );

        // 4. Create the directory and write the file
        vol.mkdirSync(dir, { recursive: true });
        vol.writeFileSync(normalizedPath, entry.getData());
      }
    }

    console.log(`Loaded ${entries.length} files into memory`);

    return vol;
  } catch (error: any) {
    console.error("Ingestion failed:", error.message);
    throw error;
  }
}

