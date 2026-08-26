/** Shared Redis channel — api publishes, payment (and others) may subscribe */
export const SWC_DRY_RUN_REDIS_CHANNEL = "swc:dry-run:channel";

/** Last dry-run payload (TTL key) for pull-based checks */
export const SWC_DRY_RUN_REDIS_LAST_KEY = "swc:dry-run:last";
