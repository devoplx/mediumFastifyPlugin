import * as cheerio from 'cheerio';
import { parseTime } from '../helpers/regex';
import { request } from '../helpers/request';
import { FastifyError } from 'fastify';
import {
    accountInfoReturn,
    Response,
    getPublicationsReturn,
    getPublicationsContributors,
    getPostDataReturn,
} from '../interfaces/functions';

class mediumApi {
    token: string;

    constructor() {
        this.token = '';
    }

    async accountInfo(): Promise<accountInfoReturn | { error: any }> {
        try {
            const response: Response<accountInfoReturn> | FastifyError =
                await request('/v1/me', 'GET', {
                    Authorization: `Bearer ${this.token}`,
                });
            if (response instanceof Error) throw response;
            const data: accountInfoReturn = {
                id: response.data.id,
                url: response.data.url,
                username: response.data.username,
                imageUrl: response.data.imageUrl,
                name: response.data.name,
            };
            return response.data;
        } catch (error: any) {
            return error;
        }
    }

    async getPublications(
        userId: string
    ): Promise<getPublicationsReturn[] | { error: any }> {
        try {
            const response: Response<getPublicationsReturn[]> | FastifyError =
                await request(`/v1/users/${userId}/publications`, 'GET', {
                    Authorization: `Bearer ${this.token}`,
                });
            if (response instanceof Error) throw response;
            // @ts-ignore
            return response.data;
        } catch (error: any) {
            return error;
        }
    }

    async getPublicationsContributors(
        publicationId: string
    ): Promise<getPublicationsContributors[] | { error: any }> {
        try {
            const response:
                | Response<getPublicationsContributors[]>
                | FastifyError = await request(
                `/v1/publications/${publicationId}/contributors`,
                'GET',
                { Authorization: `Bearer ${this.token}` }
            );
            // return JSON.parse(response);
            // @ts-ignore
            return response.data;
        } catch (error: any) {
            return error;
        }
    }

    async getPostData(
        postLink: string
    ): Promise<getPostDataReturn | { error: any }> {
        try {
            const response: Response<{ html: '' }> | FastifyError =
                await request(postLink);
            if (response instanceof Error) throw response;
            const html = response.data;
            // @ts-ignore
            const $ = cheerio.load(html);

            const metaTags = $('meta');

            let metaInfo = {};

            metaTags.each((_, element) => {
                const name = $(element).attr('name');
                const property = $(element).attr('property');
                const content = $(element).attr('content');

                // Store the meta tag values in the metaInfo object
                if (name || property) {
                    // @ts-ignore
                    metaInfo[name || property] = content;
                }
            });

            let time = '0 min read';
            if ($('meta[name="twitter:data1"]').attr('content') !== undefined) {
                // @ts-ignore
                time = $('meta[name="twitter:data1"]').attr('content');
            }
            const readingTimeNumber = parseTime(time);

            const data = {
                publishedTimeUnfomatted:
                    $('meta[property="article:published_time"]').attr(
                        'content'
                    ) || '',
                title: $('meta[name="title"]').attr('content') || '',
                description:
                    $('meta[name="description"]').attr('content') || '',
                image: $('meta[property="og:image"]').attr('content') || '',
                authorUrl:
                    $('meta[property="article:author"]').attr('content') || '',
                author: $('meta[name="author"]').attr('content') || '',
                dateFormated:
                    $('meta[name="twitter:tile:info2:text"]').attr('content') ||
                    '',
                name:
                    $('meta[name="twitter:tile:info1:text"]').attr('content') ||
                    '',
                readingTime:
                    $('meta[name="twitter:data1"]').attr('content') || '',
                readingTimeNumber: readingTimeNumber,
            };

            return data;
        } catch (error: any) {
            return error;
        }
    }
}

export default new mediumApi();
