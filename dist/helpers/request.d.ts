declare const request: (path: string, method?: string, headers?: {
    [key: string]: string;
}) => Promise<string> | Error;

export { request };
