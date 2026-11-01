import nextConfig from 'eslint-config-next';

export default [
  nextConfig,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react/jsx-no-comment-textnodes": "error",
      "react/jsx-no-target-blank": "error"
    }
  }
];
