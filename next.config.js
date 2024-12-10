/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Disable SWC minification and compilation
  swcMinify: false,
  compiler: {
    removeConsole: false,
  },
  // Configure webpack for WebContainer environment
  webpack: (config, { isServer }) => {
    // Disable native addons
    config.module.rules.push({
      test: /\.node$/,
      use: 'null-loader'
    });
    
    // Add fallbacks for browser environment
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
        path: false,
        crypto: false,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;