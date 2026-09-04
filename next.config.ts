// Configurations to add:
// Cloudinary url allowed. File upload size limit to be more than 4mb.

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['*.run.app', 'localhost:3000'],
};

export default nextConfig;
