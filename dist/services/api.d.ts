import { accountInfoReturn, getPublicationsReturn, getPublicationsContributors, getPostDataReturn } from '../interfaces/functions.js';

declare class mediumApi {
    token: string;
    constructor();
    accountInfo(): Promise<accountInfoReturn | {
        error: any;
    }>;
    getPublications(userId: string): Promise<getPublicationsReturn[] | {
        error: any;
    }>;
    getPublicationsContributors(publicationId: string): Promise<getPublicationsContributors[] | {
        error: any;
    }>;
    getPostData(postLink: string): Promise<getPostDataReturn | {
        error: any;
    }>;
}
declare const _default: mediumApi;

export { _default as default };
