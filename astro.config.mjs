import { defineConfig } from "astro/config";

const customDomainSite = "https://hortsoc.org";
const repository = process.env.GITHUB_REPOSITORY;
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER ?? repository?.split("/")[0];
const repositoryName = repository?.split("/")[1];
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true" && Boolean(repositoryOwner && repositoryName);

export default defineConfig({
  site: isGitHubPagesBuild ? `https://${repositoryOwner}.github.io` : customDomainSite,
  base: isGitHubPagesBuild ? `/${repositoryName}` : undefined,
  output: "static",
  trailingSlash: "always",
});
