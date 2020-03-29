import Cookies from 'js-cookie';
export default class HttpExtension{
    static getUserToken(){
        return Cookies.get((!!process.env.REACT_APP_USER_TOKEN) ? process.env.REACT_APP_USER_TOKEN : '');
    }
    static checkUserToken(){
        return !!this.getUserToken()
    }
    static setUserToken(userToken: String){
        Cookies.set((!!process.env.REACT_APP_USER_TOKEN) ? process.env.REACT_APP_USER_TOKEN : '', userToken, { expires: (!!process.env.REACT_APP_USER_TOKEN) ? Number(process.env.REACT_APP_USER_TOKEN_EXPIRES) : Number.MIN_VALUE  });
    }
    static removeUserToken(){
        Cookies.remove((!!process.env.REACT_APP_USER_TOKEN) ? process.env.REACT_APP_USER_TOKEN : '',{path: ''});
    }
}