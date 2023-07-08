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
}


export default new mediumApi();