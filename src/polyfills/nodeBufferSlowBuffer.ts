/**
 * Node.js 21+ removed `SlowBuffer` from `require("buffer")`.
 * `buffer-equal-constant-time` (pulled in by jwa → jsonwebtoken) still reads it at module load.
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const buf = require("buffer") as typeof import("buffer") & {
  SlowBuffer?: typeof Buffer
}
if (buf.SlowBuffer === undefined) {
  buf.SlowBuffer = buf.Buffer
}

export {}
