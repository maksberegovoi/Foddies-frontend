module.exports = {
  foodies: {
    input: {
      target: "http://localhost:3000/api-docs-json",
    },
    output: {
      mode: "tags-split",
      target: "./app/api/generated/endpoints",
      schemas: "./app/api/generated/model",
      client: "react-query",
      override: {
        mutator: {
          name: "customInstance",
          path: "./app/api/axios-instance.ts",
        },
      },
    },
  },
}
