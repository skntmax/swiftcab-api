/**
 * Normalize Express `req.params` / `req.query` values to a single string.
 */
export function paramString(value: unknown): string {
  if (value === undefined || value === null) return ""
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  if (Array.isArray(value)) return paramString(value[0])
  return ""
}
