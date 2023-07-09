import axios from 'axios';

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

	
}


export default new mediumApi();