const express = require('express')
const app = express()
const ppt = require("puppeteer")
const cors = require("cors")

app.use(cors({ origin: "*" }))

app.use("/greetings", (req, res) => {
    res.status(200)
        .json({
            message: "Hello World"
        })
})

app.use("/track", async (req, res) => {
    try {
        const { postal_code } = req.query
        console.log(postal_code)

        if (!postal_code) throw Error("invalid postal code")

        const browser = await ppt.launch({
            headless: true,
            'args' : [
                '--no-sandbox',
                '--disable-setuid-sandbox'
              ]
        })

        const page = await browser.newPage()

        await page.goto("https://covid-19.ontario.ca/book-vaccine/")

        await page.click('label[for=dose_1]', { delay: 50 })

        await page.type('input[id=postal_code_input]', postal_code, { delay: 50 })
        // K8N5W6

        await page.click('label[for=health_card_none]', { delay: 50 })

        await page.type('input[name=birthyear]', "1990", { delay: 50 })

        await page.click('label[for=fnim_yes]', { delay: 50 })

        await page.click('button[id=start_btn]', { delay: 50 })

        await page.waitForSelector("span[class=phu-name]")

        const unit = await (await page.$("span[class=phu-name]")).evaluate(el => el.textContent)

        await page.waitForSelector("div[class=tab-content__inner]")

        const vacc = await (await page.$("div[class=tab-content__inner]")).$$("p")

        const texts = []

        vacc.map(async ele => {
            const txt = await ele.evaluate(e => e.textContent)
            texts.push(txt)
        })

        // const kkk = await page.waitForSelector("select[id=phu_selection]")
        // console.log("kkkkkkkkkkk ", kkk)

        setTimeout(async () => {
            await page.close()
            await browser.close()

            if (texts.length < 2) throw Error("vaccination data not found")

            return res.status(200)
                .json({
                    success: true,
                    texts: texts.splice(2, 3),
                    unit: unit
                })
        }, 1200)

    } catch (error) {
        return res.status(400)
            .json({
                success: false,
                texts: [],
                unit: null,
                error: error.toString()
            })
    }
})

module.exports = {
    app
}
