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
    getPostData(postLink: string): Promise<{
        publishedTimeUnfomatted: string;
        title: string;
        description: string;
        image: string;
        authorUrl: string;
        author: string;
        dateFormated: string;
        name: string;
        readingTime: string;
        readingTimeNumber: number | Error;
    } | {
        error: any;
    }>;
}
declare const _default: mediumApi;

export { _default as default };
