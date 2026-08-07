import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // O certificado sobe pela Server Action da área restrita. O padrão de 1 MB
    // não cabe um PDF escaneado; o teto da plataforma na Vercel é 4,5 MB.
    serverActions: { bodySizeLimit: '5mb' },
  },
};

export default nextConfig;
