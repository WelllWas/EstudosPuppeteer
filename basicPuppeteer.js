const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const cron = require('node-cron');

async function start( ){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://learnwebcode.github.io/practice-requests/");
    // await page.screenshot({path: "amazing.png", fullPage}); 
    //fullPage é opcional, só para páginas muito longas

    const names = await page.evaluate(() => {
        //dentro dessa função, nenhum log funcionaria, pois está "roando no browser"
        return Array.from(document.querySelectorAll(".info strong")).map(x=> x.textContent);
        // document.querySelectorAll(".info strong"); Para seleções simples 
        //  truque google. clique direito > copy selector. Para seleções complexas
    })
    await fs.writeFile("names.txt", names.join("\r\n")); 
    //todo array tem a função join, que converte como você planeja juntar todos os itens deu um array numa string

    await page.click("#clickme");
    const clickedData = await page.$eval("#data", el => el.textContent) //se for na mesma linha a função ja impõe um return
    //nesse caso, o $eval serve para receber só 1 elemento, porém, com ele n é necessário o document.querySelectorAll
    console.log(clickedData)

    await page.type("#ourfield", "blue");
    await Promise.all([page.click("#ourform button"), page.waitForNavigation()])

    const info = await page.$eval("#message", el=> el.textContent)
    console.log(info);

    const photos = await page.$$eval("img", (imgs)=> {
        return imgs.map(x => x.src)
    });
    //$$eval é usado para selecionar múltiplos elementos

    for(const photo of photos){
        const imagePage = await page.goto(photo);
        await fs.writeFile(photo.split("/").pop(), await imagePage.buffer())
        //split para dividir a partir do indicador, e pop para ser o último dos indicadores
        //buffer, propriedade do puppeteer para salvar
    }

    await browser.close();
    //momento em que parei do vídeo ta no zap!!!
}

//maneiras de fazer um processo automatizado

//setInterval(start, 5000) //para rodar a cada intervalo de tempo (setado em milisegundos)

cron.schedule("*/5 * * * * *", start) //lib cron para ser específico. Rodar em tal dia do mês, que horas...

