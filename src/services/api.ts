import axios, {AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';
import { readingTimeRegex } from '../helpers/regex';

class mediumApi {
    token: string

    constructor() {
        this.token = ""
    }

	async accountInfo(): Promise<{
		id: string;
		username: string;
		url: string;
		imageUrl: string;
		name: string;

	
	} | {error: any}>{
		try {
			const response = await axios.get('https://api.medium.com/v1/me', {headers: {Authorization: `Bearer ${this.token}`}});
			return response.data.data
		  } catch (error: any) {
			return error
		  }
		
	}

	async getPublications(userId: string): Promise<{
		data: [
			id: string,
			name: string,
			description: string,
			url: string,
			imageUrl: string,
		]
	} | {error: any}>{
		try {
			const response = await axios.get(`https://api.medium.com/v1/users/${userId}/publications`, {headers: {Authorization: `Bearer ${this.token}`}});
			return response.data.data
		  } catch (error: any) {
			return error
		  }
		
	}

	async getPublicationsContributors(publicationId: string): Promise<{
		data: [
			publicationId: string,
			userId: string,
			role: string,
		]
	} | {error: any}>{
		try {
			const response = await axios.get(`https://api.medium.com/v1/publications/${publicationId}/contributors`, {headers: {Authorization: `Bearer ${this.token}`}});
			return response.data.data
		  } catch (error: any) {
			return error
		  }
		
	}

	async getPostData(postLink: string): Promise<{
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
	} | {error: any}>{
		try{
			
			const config: AxiosRequestConfig = {
				headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
				}
			};
			const response = await axios.get(postLink, config);
			
			const html = response.data;

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

			  let time = '';
			  const twitterData1Content = $('meta[name="twitter:data1"]').attr('content');
			  
			  if (typeof twitterData1Content !== 'undefined') {
				time = twitterData1Content;
			  } else {
				time = "0 min read";
			  }
			  const readingTimeNumber = readingTimeRegex(time)


			  const data = {
				publishedTimeUnfomatted: $('meta[property="article:published_time"]').attr('content') || '',
				title: $('meta[name="title"]').attr('content') || '',
				description: $('meta[name="description"]').attr('content') || '',
				image: $('meta[property="og:image"]').attr('content') || '',
				authorUrl: $('meta[property="article:author"]').attr('content') || '',
				author: $('meta[name="author"]').attr('content') || '',
				dateFormated: $('meta[name="twitter:tile:info2:text"]').attr('content') || '',
				name: $('meta[name="twitter:tile:info1:text"]').attr('content') || '',
				readingTime: $('meta[name="twitter:data1"]').attr('content') || '',
				readingTimeNumber: readingTimeNumber,

			  }
			
			  
			  return data;


		} catch (error: any) {
			return error;
		}
	}
	
}


export default new mediumApi();