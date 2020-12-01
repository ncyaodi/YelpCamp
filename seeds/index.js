const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '5fc098b71b61cc39fc02d73f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/460289',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            price: price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dpjiogavr/image/upload/v1606712973/YelpCamp/gcrmtfjw2bqrqgfyzpxk.jpg',
                    imgName: 'YelpCamp/gcrmtfjw2bqrqgfyzpxk'
                },

            ]

        })
        await camp.save().then(console.log('saved!'));
        console.log(camp)
    }
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log('db closed!')
})

