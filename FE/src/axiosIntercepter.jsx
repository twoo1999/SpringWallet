import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});


api.interceptors.response.use(
    (res)=> res,
    async (r)=>{
        const {config, code, response} = r;
        if(code === "ERR_NETWORK"){
            window.location.href = "/error";
        }

        if(response){
            const data= response.data;
            if(data){
                if (data.code === "AUTH-002") {
                    await axios({
                        method: "GET",
                        url: `${process.env.REACT_APP_API_URL}/auth/accessToken`,
                        withCredentials:true,
                    })
                    return axios(config);
                } else if (data.code === "AUTH-003") {

                    alert("로그인 세션이 만료됐습니다. 다시 로그인해주세요.")
                    window.location.href = "/login";
                }
            }
        }

    }
)

const getApi = async (url)=>{
    const res = await api.get(url);
    const data = res.data;
    return data;
}

const postApi = async (url, body)=>{

    const res = await api.post(url, body);
    const data = res.data;
    if (data !== undefined) {
        return data;
    }
    return null;
}


const deleteApi = async (url, body)=>{
    const res = await api.delete(url, {data: body});
    const data = res.data;
    if (data !== undefined) {
        return data;
    }
    return null;

}

export {api, getApi, postApi, deleteApi};