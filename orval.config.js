module.exports = {
  "my-api": {
    input: "http://localhost:3000/api-docs-json",
    output: {
      target: "./src/api/generated.ts",
      client: "react-query", // или просто 'axios'
    },
  },
}
