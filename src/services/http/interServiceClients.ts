import {
  interServiceJson,
  interServiceRequest,
  type InterServiceRequestOptions,
} from "./interServiceHttp";

/**
 * Outbound API to the BO (back-office) service via gateway or direct URL.
 * Paths must include the `/v1/...` prefix your BO app exposes.
 */
export const boClient = {
  request: (path: string, init?: InterServiceRequestOptions) =>
    interServiceRequest("bo", path, init),
  json: <T>(path: string, init?: InterServiceRequestOptions) =>
    interServiceJson<T>("bo", path, init),
};

/**
 * Outbound API to the payment service via gateway or direct URL.
 * Paths must include the `/v1/payment/...` prefix.
 */
export const paymentClient = {
  request: (path: string, init?: InterServiceRequestOptions) =>
    interServiceRequest("payment", path, init),
  json: <T>(path: string, init?: InterServiceRequestOptions) =>
    interServiceJson<T>("payment", path, init),
};
