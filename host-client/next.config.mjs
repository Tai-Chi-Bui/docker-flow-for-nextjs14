/** @type {import('next').NextConfig} */
const nextConfig = {
    // This options allow hot reload on docker window destop for this app 
    webpackDevMiddleware: config => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        }
        return config
    },
};

export default nextConfig;
