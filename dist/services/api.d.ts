declare class mediumApi {
    token: string;
    constructor();
    accountInfo(): Promise<{
        id: string;
        username: string;
        url: string;
        imageUrl: string;
        name: string;
    } | {
        error: any;
    }>;
    getPublications(userId: string): Promise<{
        data: [
            id: string,
            name: string,
            description: string,
            url: string,
            imageUrl: string
        ];
    } | {
        error: any;
    }>;
    getPublicationsContributors(publicationId: string): Promise<{
        data: [
            publicationId: string,
            userId: string,
            role: string
        ];
    } | {
        error: any;
    }>;
}
declare const _default: mediumApi;

export { _default as default };
