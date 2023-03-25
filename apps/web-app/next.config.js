const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true
})

module.exports = withPWA({
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.imgur.com",
                port: ""
            },
            {
                protocol: "https",
                hostname: "polcxtixgqxfuvrqgthn.supabase.co",
                port: ""
            }
        ]
    },
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
            exclude:
                /node_modules\/(?!(@pcd\/passport-interface|@pcd\/semaphore-signature-pcd|@pcd\/pcd-types|@pcd\/semaphore-group-pcd|@pcd\/semaphore-identity-pcd|@pcd\/semaphore-group-pcd))/,
            use: {
                loader: "ts-loader",
                options: {
                    configFile: "tsconfig.json",
                    transpileOnly: true
                }
            }
        })

        return config
    }
})
