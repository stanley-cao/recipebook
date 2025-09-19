module.exports = {
  src: "./src",
  schema: "./schema.graphql",
  language: "typescript",
  exclude: ["**/node_modules/**", "**/__generated__/**"],
  noFutureProofEnums: true,  
  persistConfig: null,        
  eagerEsModules: true,  
};