module.exports = {
  module: {
    rules: [
      {
        test: /\.(shex)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
};
