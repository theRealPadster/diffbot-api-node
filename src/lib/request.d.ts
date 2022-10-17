export function generate(url: string, method?: string, body?: string, customHeaders?: object): Request;
export function exec(request: Request): any;
/**
 * Generate a simple request object
 */
export type Request = object;
