import axios from "axios";

const api = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true,
});


api.interceptors.response.use(
    (res)=> res,
    async (err)=>{
        const {config, response: {data}} = err;
        const originReq = config;

        if(data.code === "AUTH-002"){
            await axios({
                method: "GET",
                url: `${process.env.BASE_URL}/auth/accessToken`,
                withCredentials:true,
            })

            return axios(originReq);

        }
    }
)

const getApi = async (url)=>{
    try{
        const res = await api.get(url);
        const data = res.data;
        return data;
    } catch (err){
        console.log(err);
    }
}

const postApi = async (url)=>{
    try{
        const res = await api.post(url);
        const data = res.data;
        if(data !== undefined){
            return data;
        }
        return null;
    } catch (err){
        console.log(err);
    }
}

export {api, getApi, postApi};