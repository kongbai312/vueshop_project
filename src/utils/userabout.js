//导入uuid包，用来生成唯一标识符
import { v4 as uuidv4 } from 'uuid';

//定义token的键
let TOKEN_KEY = 'TOKEN_KEY'

//用来生成临时标识符
function getUserTempId(){
    //从localStorage中获取唯一标识符
    let userTempId = localStorage.getItem('USERTEMPID_KEY')
    //如果浏览器中没有唯一标识符，则生成一个
    if(!userTempId){
        userTempId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        localStorage.setItem('USERTEMPID_KEY',userTempId)
    }
    //返回标识符
    return userTempId
}

//用来将token存入本地localStorage
function setToken(token){
    localStorage.setItem(TOKEN_KEY,token)
}

//获取本地localStorage的token
function getToken(){
    return localStorage.getItem(TOKEN_KEY)
}

//移除本地localStorage的token
function removeToken(){
    localStorage.removeItem(TOKEN_KEY)
}

export {
    getUserTempId,
    setToken,
    getToken,
    removeToken
}