const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Import the appropriate service and chosen wrappers
const {
    dialogflow,
    Image,
    BasicCard,
    Button,
    Carousel,
    Suggestions,
} = require('actions-on-google')

var latestSwagsList = {
    'Alligator.io': 'https://d33wubrfki0l68.cloudfront.net/a990a98d41f502b3813c6bd209c5a56ec85b71cf/25849/assets/swag-img/alligator_io-1b9eb1984c.webp',
    'devRant': 'https://d33wubrfki0l68.cloudfront.net/364081ddea9ea65def0e11245ae2fccedc80135a/bc2f7/assets/swag-img/devrant-26d3018fd4.webp',
    'Google Assistant': 'https://d33wubrfki0l68.cloudfront.net/5b9902f0d1a60bb1c234a4862504a40793001d9d/90b0e/assets/swag-img/google_assistant-e23521d1fe.webp',
    'Alexa': 'https://d33wubrfki0l68.cloudfront.net/5dbb9f50e5dbbf1dd777071d845f049eb005a6ce/33767/assets/swag-img/alexa-cc54409642.webp',
    'npm': 'https://d33wubrfki0l68.cloudfront.net/79f863e9a84d3582224d5a0ece0e99a9d2fe5f7e/ea5f1/assets/swag-img/npm-73bff1ec55.webp',
    'Codeship': 'https://d33wubrfki0l68.cloudfront.net/e0ab1b9cff9b0f776527188f6e8fba9eca44650e/e2448/assets/swag-img/codeship-69a0101a2c.webp',
    'Gatsby': 'https://d33wubrfki0l68.cloudfront.net/7d6c247e2f77a7459da1540c70e8b3d66da16b1c/e64f8/assets/swag-img/gatsby-906a30759d.webp',
};

var stickerSwagsList = {
    '7PHP': 'https://d33wubrfki0l68.cloudfront.net/3280a4cc1aa92b7e004e937c3fc8d188a8215e52/0ee3a/assets/swag-img/7php-efc74f948c.webp',
    'Alligator.io': 'https://d33wubrfki0l68.cloudfront.net/a990a98d41f502b3813c6bd209c5a56ec85b71cf/25849/assets/swag-img/alligator_io-1b9eb1984c.webp',
    'devRant': 'https://d33wubrfki0l68.cloudfront.net/364081ddea9ea65def0e11245ae2fccedc80135a/bc2f7/assets/swag-img/devrant-26d3018fd4.webp',
    'JS Bin': 'https://d33wubrfki0l68.cloudfront.net/f40c872c2f9b47a6100d55f9d0a6c01659a9b9f7/b7503/assets/swag-img/js_bin-86b5799399.webp',
    'Mullvad': 'https://d33wubrfki0l68.cloudfront.net/5f908dd9c0f1abd38f50bd80633cb37cb8307904/64bd2/assets/swag-img/mullvad-7a46de178f.webp',
    'NativeScript': 'https://d33wubrfki0l68.cloudfront.net/7898c65f8a967adda2eb1a51f62ff157cb590a84/7b523/assets/swag-img/nativescript-cb275a82da.webp',
    'Netlify': 'https://d33wubrfki0l68.cloudfront.net/061396e0cff4b6a680795ca1d9fe46f84d71684b/a001a/assets/swag-img/netlify-a8f30b714a.webp',
    'opsdroid': 'https://d33wubrfki0l68.cloudfront.net/df099559b87aee4f12d5f43fd9fee039feb2e841/19783/assets/swag-img/opsdroid-620fe817d4.webp',
    'WhatIsMyBrowser': 'https://d33wubrfki0l68.cloudfront.net/68eef2e0a1af04a298d44aeed3121379253635bc/b787a/assets/swag-img/whatismybrowser-a43fc9c198.webp',

};

var clothingSwagsList = {
    'Codeship': 'https://d33wubrfki0l68.cloudfront.net/e0ab1b9cff9b0f776527188f6e8fba9eca44650e/e2448/assets/swag-img/codeship-69a0101a2c.webp',
    'Gatsby': 'https://d33wubrfki0l68.cloudfront.net/7d6c247e2f77a7459da1540c70e8b3d66da16b1c/e64f8/assets/swag-img/gatsby-906a30759d.webp',
    'Google Assistant': 'https://d33wubrfki0l68.cloudfront.net/5b9902f0d1a60bb1c234a4862504a40793001d9d/90b0e/assets/swag-img/google_assistant-e23521d1fe.webp',
    'Kong': 'https://d33wubrfki0l68.cloudfront.net/0cceebdfd12f078b19c422e08f7edc62a6d3f9fa/1305e/assets/swag-img/kong-7defb804da.webp',
    'Twilio': 'https://d33wubrfki0l68.cloudfront.net/73baf81729a5dc983761f686091ce862443bbe5e/a0f9a/assets/swag-img/twilio-a64a64ba59.webp',
    'npm': 'https://d33wubrfki0l68.cloudfront.net/79f863e9a84d3582224d5a0ece0e99a9d2fe5f7e/ea5f1/assets/swag-img/npm-73bff1ec55.webp',
    'Alexa': 'https://d33wubrfki0l68.cloudfront.net/5dbb9f50e5dbbf1dd777071d845f049eb005a6ce/33767/assets/swag-img/alexa-cc54409642.webp',
};

var deviceSwagsList = {
    'Google Assistant': 'https://d33wubrfki0l68.cloudfront.net/5b9902f0d1a60bb1c234a4862504a40793001d9d/90b0e/assets/swag-img/google_assistant-e23521d1fe.webp',
    'Alexa': 'https://d33wubrfki0l68.cloudfront.net/5dbb9f50e5dbbf1dd777071d845f049eb005a6ce/33767/assets/swag-img/alexa-cc54409642.webp',
};

var swagCompanyDescList = {
    '7PHP': 'If you are a fan of 7PHP, send them an email and receive some free stickers!',
    'Alligator.io': 'Write a blog post on frontend development topics, get some cool Alligator stickers!',
    'Alexa': 'ublish a skill, get a t-shirt and an Echo Spot (if 50 customers per month use your Display skill for the first three months after publication)! Earn a 2-pack of Echo Buttons if you publish a Gadgets skill!',
    'Codeship': 'Submit 15 builds in 30 days, get t-shirts & stickers sent your way! (Ships only to North America and Europe)',
    'devRant': "Get 30 ++'s on a single rant you've posted to devRant to receive 3 free high-quality devRant laptop stickers! Or post an awesome rant that gets over 750 ++'s to receive a free devRant squishy stress ball!",
    'Gatsby': 'Get a pull request merged into Gatsby and receive a free shirt, socks, or stickers.',
    'Google Assistant': 'Make an app for the Google Assistant available to users, get an exclusive Google Assistant t-shirt and a Google Home (if a certain number of users engage with it)!',
    'JS Bin': 'Fill out a Google form with your name and address and get a sticker. There’s no cost to you, but they will be restricting the send outs to bi-monthly or quaterly depending on demand.',
    'Kong': 'Everyone who gets 1 PR accepted to a Kong repo can get a Kong Contributor T-shirt!',
    'Mullvad': 'Send an email to Mullvad to get an assortment of stickers sent your way.',
    'NativeScript': "Make your first contribution to the NativeScript community and win an awesome set of stickers. Among the stickers you will find a limited edition 'Contributor' sticker.",
    'Netlify': 'Complete the survey about using Netlify for documentation and get stickers.',
    'npm': 'Fix a bug, get a fashionable pair of socks!',
    'opsdroid': 'Contribute to opsdroid and receive some stickers!',
    'Twilio': 'Complete the first set of objectives in Twilio Quest and get a Twilio Quest t-shirt right to your door.',
    'WhatIsMyBrowser': 'Send an API request, get some sweet vinyl laptop stickers!',
};

var swagCompanyImageUrlList = {
    '7PHP': 'https://7php.com/stickers/',
    'Alligator.io': 'https://alligator.io/write-for-us/',
    'Alexa': 'https://developer.amazon.com/alexa-skills-kit/alexa-developer-skill-promotion-india',
    'Codeship': 'https://codeship.com/swag',
    'devRant': 'https://devrant.com/free-stickers',
    'Gatsby': 'https://www.gatsbyjs.org/docs/contributor-swag/',
    'Google Assistant': 'https://developers.google.com/actions/community/overview',
    'JS Bin': 'https://jsbin.com/help/stickers/',
    'Kong': 'https://github.com/Kong/kong/blob/master/CONTRIBUTING.md#contributor-t-shirt',
    'Mullvad': 'https://www.mullvad.net/en/guides/mullvad-stickers-and-merchandise/',
    'NativeScript': 'https://www.nativescript.org/blog/nativescript-first-time-contribution-contest-continued-and-extended',
    'Netlify': 'https://swag.netlify.com/docs/',
    'npm': 'http://blog.npmjs.org/post/129827785565/npm-weekly-30-package-scripts-for-tooling-a',
    'opsdroid': 'https://medium.com/opsdroid/contributor-sticker-packs-738058ceda59',
    'Twilio': 'https://www.youtube.com/watch?v=r9MPBJjPQdA',
    'WhatIsMyBrowser': 'https://developers.whatismybrowser.com/api/swag/',
};

var swagCompanyUrlList = {
    'Alligator.io': 'https://d33wubrfki0l68.cloudfront.net/a990a98d41f502b3813c6bd209c5a56ec85b71cf/25849/assets/swag-img/alligator_io-1b9eb1984c.webp',
    'devRant': 'https://d33wubrfki0l68.cloudfront.net/364081ddea9ea65def0e11245ae2fccedc80135a/bc2f7/assets/swag-img/devrant-26d3018fd4.webp',
    'Google Assistant': 'https://d33wubrfki0l68.cloudfront.net/5b9902f0d1a60bb1c234a4862504a40793001d9d/90b0e/assets/swag-img/google_assistant-e23521d1fe.webp',
    'Alexa': 'https://d33wubrfki0l68.cloudfront.net/5dbb9f50e5dbbf1dd777071d845f049eb005a6ce/33767/assets/swag-img/alexa-cc54409642.webp',
    'npm': 'https://d33wubrfki0l68.cloudfront.net/79f863e9a84d3582224d5a0ece0e99a9d2fe5f7e/ea5f1/assets/swag-img/npm-73bff1ec55.webp',
    'Codeship': 'https://d33wubrfki0l68.cloudfront.net/e0ab1b9cff9b0f776527188f6e8fba9eca44650e/e2448/assets/swag-img/codeship-69a0101a2c.webp',
    'Gatsby': 'https://d33wubrfki0l68.cloudfront.net/7d6c247e2f77a7459da1540c70e8b3d66da16b1c/e64f8/assets/swag-img/gatsby-906a30759d.webp',
};

// Create an app instance
const app = dialogflow()

// Register handlers for Dialogflow intents

app.intent('Default Welcome Intent', conv => {
    conv.ask('Hi, how is it going?')
    conv.ask(`Here's a picture of a cat`)
    conv.ask(new Image({
        url: 'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
        alt: 'A cat',
    }))
})

app.intent('latest_swag_opportunity', conv => {
    conv.ask("Here are some latest swags")

    if (conv.screen) return conv.ask(getSwagByTypeCarousel(latestSwagsList, "Swag"));

    conv.ask(new Suggestions('Swags to get Stickers', 'Swags to get T-Shirts'));
})

app.intent('swag_by_language', (conv, {
    swag_language
}) => {
    conv.ask(swag_language)

})

app.intent('swag_by_type', (conv, {
    swag_type
}) => {
    conv.ask("Here are some swags to get a " + swag_type);
    // conv.ask(new BasicCard({
    //     title: swag_type,
    //     text: swag_type + "text",
    //     image: new Image({
    //         url: 'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
    //         alt: "A cat",
    //     }),
    //     buttons: new Button({
    //         title: swag_type + "button",
    //         url: "www.google.com",
    //     }),
    //     display: 'DEFAULT',
    // }));
    if (conv.screen) {
        if (swag_type === "sticker") {
            return conv.ask(getSwagByTypeCarousel(stickerSwagsList, "Sticker"))
        } else if (swag_type === "clothing") {
            return conv.ask(getSwagByTypeCarousel(clothingSwagsList, "T-Shirt"))
        } else if (swag_type === "device") {
            return conv.ask(getSwagByTypeCarousel(deviceSwagsList, "Device"))
        } else {
            conv.ask("Uh Oh! Looks like there are no swags available to get " + swag_type)
            conv.ask(new Suggestions('Swags to get Stickers', 'Swags to get T-Shirts', 'Swags to get Devices'))
        }
    }
})

app.intent('swag_by_company', (conv, {
    swag_company
}) => {
    conv.ask("Here's more info about " + swag_company + " swag.")
    conv.ask(new BasicCard({
        text: swagCompanyDescList[swag_company],
        title: swag_company,
        image: new Image({
            url: swagCompanyImageUrlList[swag_company],
            alt: swag_company + "swag image",
        }),
        buttons: new Button({
            title: 'Check it out',
            url: swagCompanyUrlList[swag_company],
        }),
        display: 'DEFAULT'
    }));
})


const getSwagByTypeCarousel = (itemList, type) => {
    const items = {};
    for (const item in itemList) {
        items[item] = {
            title: item,
            image: new Image({
                url: itemList[item],
                alt: item + " " + type + " image",
            })
        }
    }
    const carousel = new Carousel({
        items
    });
    return carousel;
};



exports.fulfillment = functions.https.onRequest(app)