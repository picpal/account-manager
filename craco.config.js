module.exports = {
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        // Modify the `webpackConfig` here
  
        // Example: Ensuring that devServer headers are set for CSP
        if (env === 'development') {
          webpackConfig.devServer = {
            ...webpackConfig.devServer,
            headers: {
              'Content-Security-Policy': "script-src 'self' 'unsafe-eval';"
            }
          };
        }
  
        return webpackConfig;
      }
    }
  };