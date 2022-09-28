const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true
    // disable: process.env.NODE_ENV === 'development'
})

module.exports = withPWA({
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true
    },
    webpack(config, options) {
        if (!options.isServer) {
            config.resolve.fallback.fs = false
        }
        config.experiments = { asyncWebAssembly: true, layers: true }
        return config
    }
})
