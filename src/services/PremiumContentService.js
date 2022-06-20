import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class PremiumContentService{

    async getContent(){
        const res = await api.get('api/ads')
        logger.log(res.data, 'here is the premium content');
        AppState.premiumContent = res.data;
        
    }
}


export const premiumContentService = new PremiumContentService