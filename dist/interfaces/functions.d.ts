interface Response<T> {
    statusCode: number;
    data: T;
}
interface getPublicationsReturn {
    id: string;
    name: string;
    description: string;
    url: string;
    imageUrl: string;
}
interface getPublicationsContributors {
    publicationId: string;
    userId: string;
    role: string;
}
interface getPostDataReturn {
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
interface accountInfoReturn {
    id: string;
    username: string;
    url: string;
    imageUrl: string;
    name: string;
}

export { Response, accountInfoReturn, getPostDataReturn, getPublicationsContributors, getPublicationsReturn };
