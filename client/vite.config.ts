import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/liveroom-client-element.ts",
      name: "LiveroomClientElement",
      formats: ["es", "umd"],
      fileName: (format) => `liveroom-client-element.${format}.js`,
    },
    // rollupOptions: {
    //   // make sure to externalize deps that shouldn't be bundled
    //   // into your library
    // TODO: Do it for Lit?
    //   external: ["vue"],
    //   output: {
    //     // Provide global variables to use in the UMD build
    //     // for externalized deps
    //     globals: {
    //       vue: "Vue",
    //     },
    //   },
    // },
  },
});
