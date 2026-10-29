// Repo is stealthcheetah/RunaThxs.github.io, so GitHub serves it at
// https://stealthcheetah.github.io/RunaThxs.github.io/
// If you rename the repo to stealthcheetah.github.io (root site), set this to "".
const BASE_PATH = "/RunaThxs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: BASE_PATH,
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
  reactStrictMode: true,
  reactCompiler: true,
};

export default nextConfig;