module.exports = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: "**",
          port: '',
        },
      ],
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.pdf$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      });
      return config;
    }
  }