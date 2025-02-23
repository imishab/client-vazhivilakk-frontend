const CHUNK_PUBLIC_PATH = "server/pages/_app.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules_1a3ee4._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__4a9a79._.js");
runtime.loadChunk("server/chunks/ssr/_cf1730._.css");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/src/pages/_app.jsx [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
