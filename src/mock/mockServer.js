//引入mockjs
import Mock from 'mockjs'

//引入json格式的数据
import floors from './floors.json';
import recommends from './recommends.json';

//使用mockjs
Mock.mock('/mock/recommends',{code:200,data:recommends})

Mock.mock('/mock/floors',{code:200,data:floors})

console.log('Mockserver已启动');