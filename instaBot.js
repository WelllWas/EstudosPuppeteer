require('dotenv').config();
const cheerio = require("cheerio");
const fs = require('fs');
const puppeteer = require('puppeteer');
const BASE_URL = "https://instagram.com/";
const TAG_URL = (tag) => `https://www.instagram.com/explore/tags/${tag}/`;

const instagram = {
    browser: null,
    page: null,

    initialize: async () => {
        instagram.browser = await puppeteer.launch({
            headless: false
        })

        instagram.page = await instagram.browser.newPage();
    },

    login: async (user, password) => {
        await instagram.page.goto(BASE_URL, { waitUntil: 'networkidle2' });

        // await instagram.page.waitFor(2000);
        // await instagram.page.waitForNavigation({waitUntil: 'networkidle2'});

        await instagram.page.type('input[name="username"]', user, { delay: 50 });
        await instagram.page.type('input[name="password"]', password, { delay: 50 });

        loginButton = await instagram.page.$x('//div[contains(text(), "Entrar")]');
        await loginButton[0].click();

        await instagram.page.waitForTimeout(10000);
        await instagram.page.waitForTimeout('a > span[aria-label="Profile"]');

        debugger;
    },

    likeTagsProcess: async (tags = []) => {
        for (let tag of tags) {
            await instagram.page.goto(TAG_URL(tag), { waitUntil: 'networkidle2' });
            await instagram.page.waitForTimeout(8000);

            let posts = await instagram.page.$$('article > div:nth-child(3) img[crossorigin="anonymous"]');

            for (let i = 0; i < 3; i++) {
                let post = posts[i];

                await post.click();

                await instagram.page.waitForTimeout('span[id="react-root"][aria-hidden="true"]');

                await instagram.page.waitForTimeout(1000);

                let isLikable = await instagram.page.$('span > svg[aria-label="Curtir"]');

                if (isLikable) {
                    await instagram.page.click('span > svg[aria-label="Curtir"]');
                } else {
                    return
                }

                await instagram.page.waitForTimeout(2000);

                //download image
                const IMAGE_SELECTOR = 'article > div > div > div > div > div >div > img[style="object-fit: cover;"]';
                let srcUrl = await instagram.page.$eval(IMAGE_SELECTOR, el=> el.srcset);
                const info = srcUrl.split("1080w");
                const imgUrl = info[0];
                console.log(imgUrl);
                const imgPage = await instagram.browser.newPage();
                await imgPage.goto(imgUrl);
                await instagram.page.waitForTimeout(3000);
                await imgPage.screenshot({path: tag+i+".png"});
                await instagram.page.waitForTimeout(2000);
                await imgPage.close();

                await instagram.page.waitForTimeout(2000);

                await instagram.page.click('svg[aria-label="Fechar"]');
                // let closeModalButton = await instagram.page.$x('//svg[contains(text(), "Fechar")]');
                // await closeModalButton[0].click();

                await instagram.page.waitForTimeout(1000);

            }
            await instagram.page.waitForTimeout(30000);
        }
        await browser.close();
    }
}

module.exports = instagram;