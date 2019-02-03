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
    List,
    Suggestions,
} = require('actions-on-google')

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
    conv.ask("Here you are some latest swags")

    if (conv.screen) return conv.ask(latestSwagCarousel());

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
            return conv.ask(getSwagByTypeCarousel(stickerSwagsList, "T-Shirt"))
        } else if (swag_type === "device") {
            return conv.ask(getSwagByTypeCarousel(deviceSwagsList, "Device"))
        } else {
            return conv.ask("Looks like there are no swags available to get ${swag_type}")
        }
    }
})

app.intent('swag_by_company', (conv, {
    swag_company
}) => {
    conv.ask(swag_language)

})


const latestSwagCarousel = () => {
    const carousel = new Carousel({
        items: {
            'Codeship': {
                title: 'Codeship',
                image: new Image({
                    url: 'https://d33wubrfki0l68.cloudfront.net/e0ab1b9cff9b0f776527188f6e8fba9eca44650e/e2448/assets/swag-img/codeship-69a0101a2c.webp',
                    alt: 'CodeShip Swag images',
                }),
            },
            'Gatsby': {
                title: 'Gatsby',
                image: new Image({
                    url: 'https://d33wubrfki0l68.cloudfront.net/7d6c247e2f77a7459da1540c70e8b3d66da16b1c/e64f8/assets/swag-img/gatsby-906a30759d.webp',
                    alt: 'Gatsby Tshirt Image',
                }),
            },
            'GoogleAssistant': {
                title: 'Google Assistant',
                image: new Image({
                    url: 'https://d33wubrfki0l68.cloudfront.net/5b9902f0d1a60bb1c234a4862504a40793001d9d/90b0e/assets/swag-img/google_assistant-e23521d1fe.webp',
                    alt: 'Google Assistant Tshirt Image',
                }),
            },
            'aliigator.io': {
                title: 'Alligator.io',
                text: "Write a blog post on frontend development topics, get some cool Alligator stickers!",
                image: new Image({
                    url: 'https://d33wubrfki0l68.cloudfront.net/a990a98d41f502b3813c6bd209c5a56ec85b71cf/25849/assets/swag-img/alligator_io-1b9eb1984c.webp',
                    alt: 'Alligatio.io Logo',
                }),
            },
            'devRant': {
                title: 'devRant',
                synonyms: ['pink', 'unicorn'],
                text: "Get 30 ++'s on a single rant you've posted to devRant to receive 3 free high-quality devRant laptop stickers! Or post an awesome rant that gets over 750 ++'s to receive a free devRant squishy stress ball!",
                image: new Image({
                    url: 'https://d33wubrfki0l68.cloudfront.net/364081ddea9ea65def0e11245ae2fccedc80135a/bc2f7/assets/swag-img/devrant-26d3018fd4.webp',
                    alt: 'Devrant Sticker Image',
                }),
            },
            'Alexa': {
                title: 'Alexa',
                image: new Image({
                    url: 'https://d33wubrfki0l68.cloudfront.net/5dbb9f50e5dbbf1dd777071d845f049eb005a6ce/33767/assets/swag-img/alexa-cc54409642.webp',
                    alt: 'Alexa Tshirt Image',
                }),
            },
        }
    });
    return carousel;
};


const getSwagByTypeCarousel = (itemList, type) => {
    const items = {};
    for (const item in itemList) {
        items[item] = {
            title: item,
            image: new Image({
                url: itemList[item],
                alt: "${item} ${type} image",
            })
        }
    }
    const carousel = new Carousel({
        items
    });
    return carousel;
};



exports.fulfillment = functions.https.onRequest(app)