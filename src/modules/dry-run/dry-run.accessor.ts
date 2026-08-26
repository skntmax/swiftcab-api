import type { DryRunService } from "./dry-run.service";

/** Allows Express controllers to use Nest DryRunService after bootstrap. */
let dryRunService: DryRunService | null = null;

export function setDryRunService(service: DryRunService): void {
  dryRunService = service;
}

export function getDryRunService(): DryRunService {
  if (!dryRunService) {
    throw new Error(
      "DryRunService not ready — Nest bootstrap must call setDryRunService()",
    );
  }
  return dryRunService;
}
