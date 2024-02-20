/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'k.kakaocdn.net',
      'lh3.googleusercontent.com',
      'ssl.pstatic.net',
      'w7.pngwing.com',
    ],
  },
};

export default nextConfig;
