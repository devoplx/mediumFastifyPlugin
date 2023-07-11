export interface Response<T> {
    statusCode: number;
    data: T;
}

export interface getPublicationsReturn {
    id: string;
    name: string;
    description: string;
    url: string;
    imageUrl: string;
}

export interface getPublicationsContributors {
    publicationId: string;
    userId: string;
    role: string;
}

export interface getPostDataReturn {
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
}

export interface accountInfoReturn {
    id: string;
    username: string;
    url: string;
    imageUrl: string;
    name: string;
}
