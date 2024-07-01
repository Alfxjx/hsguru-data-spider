import Crawler from "crawler";
import { saveToFileByDate } from "./utils/index.js";



const c = new Crawler({
    maxConnections: 1,
    rateLimit: 2000,
    // This will be called for each crawled page
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            const $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($("title").text());
        }
        done();
    },
});

c.add([
    {
        url: "https://www.hsguru.com/",
        callback: (error, res, done) => {
            if (error) {
                console.log(error);
            } else {
                const $ = res.$;
                console.log("Grabbed", res.body.length, "bytes");
                const datas = [];
                $('div.columns.is-multiline.is-mobile.is-narrow.is-centered').children('div.column').each(function () {
                    // const code = $(this).find('.clip-btn-value.is-shown-js').attr('data-clipboard-text');
                    const title = $(this).find('h2.deck-title > span > a').text().trim();
                    const code = $(this).find('h2.deck-title > span').children('span').last().text().trim();
                    if (title && code) {
                        datas.push({
                            title: title,
                            code: code
                        });
                    }

                });
                saveToFileByDate(JSON.stringify(datas), './data', 'd0nkey');
            }
            done();
        },
    }
]);
