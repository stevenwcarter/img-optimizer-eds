import { defineConfig } from "rolldown";

export default defineConfig([
  {
    input: "src/index.ts",
    output: {
      dir: "dist/esm",
      format: "esm",
      sourcemap: true,
    },
    resolve: {
      conditionNames: ["import"],
    },
  },
  {
    input: "src/index.ts",
    output: {
      dir: "dist/cjs",
      format: "cjs",
      sourcemap: true,
    },
    resolve: {
      conditionNames: ["import"],
    },
  },
]);
