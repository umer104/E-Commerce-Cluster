const path = require("path");

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@utils': path.resolve(__dirname, 'src/utils/')
      // Add more aliases as needed
    },
    // Additional webpack configuration
    // Example:
    // plugins: [
    //   new MyCustomWebpackPlugin()
    // ],
    // loaders: [
    //   {
    //     test: /\.csv$/,
    //     use: ['csv-loader']
    //   }
    // ]
  },
  babel: {
    presets: [],
    plugins: [
      // Example babel plugin
      // Remember to npm install any dependencies
      // ['@babel/plugin-proposal-decorators', { legacy: true }]
    ],
  },
  eslint: {
    enable: true, // Set to true to enable ESLint
    configure: {
      // Any eslint configuration options
      // Example:
      // rules: {
      //   'no-console': 'off',
      //   'no-unused-vars': 'warn'
      // }
    },
  },
  devServer: {
    allowedHosts: [
	    'frontend.example.com',
    ],
    // Proxy configuration
    // Example:
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:5000',
    //     changeOrigin: true,
    //     pathRewrite: { '^/api': '' },
    //   },
    // },
  },
};
