import { execSync } from "child_process";

// Run `prisma generate` before tests start
execSync("npm run db-generate", { stdio: "inherit" });
