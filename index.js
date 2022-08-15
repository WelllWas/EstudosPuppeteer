require('dotenv').config();
const ig = require('./instaBot');
let user = process.env.USER;
let password = process.env.PASSWORD;
let tag1 = process.env.TAG_ONE;
let tag2 = process.env.TAG_TWO;
let tag3 = process.env.TAG_THREE;

(async () => {

    await ig.initialize();
    await ig.login(user, password);
    await ig.likeTagsProcess([tag1, tag2,tag3]);

    debugger;
})()