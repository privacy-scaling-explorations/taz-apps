const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true
  // disable: process.env.NODE_ENV === 'development'
})

module.exports = withPWA({
  reactStrictMode: true,
  eslint: {
      ignoreDuringBuilds: true
  },
  experimental: {
      esmExternals: false
  },
  webpack(config, options) {
      if (!options.isServer) {
          config.resolve.fallback.fs = false
      }
      config.experiments = { asyncWebAssembly: true, layers: true }

      // Add a new rule for TypeScript files
      config.module.rules.push({
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
              loader: "ts-loader",
              options: {
                  configFile: "tsconfig.json",
                  transpileOnly: true,
              },
          },
      })

      return config
  },
})
