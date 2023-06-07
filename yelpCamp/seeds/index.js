const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('コネクション成功');
    })
    .catch(err => {
        console.log('コネクションロスト');
        console.log(err);
    });

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i+=1) {
        const randomCityIndex = Math.floor(Math.random() * cities.length);
        const price = Math.floor(Math.random() * 2000) + 1000;
        const camp = new Campground({
            author:'646a8858cb44923c44e57148',
            location: `${cities[randomCityIndex].prefecture}, ${cities[randomCityIndex].city}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'キャンプは、自然の中でアウトドアを楽しむのに最適な方法です。また、友人や家族と絆を深め、思い出に残る時間を過ごすのにも最適な方法です。キャンプにはさまざまな方法がありますが、一般的にはハイキング、釣り、水泳、バーベキューなどのアウトドアアクティビティを楽しむことが含まれます。また、星空を眺めたり、焚き火を囲んだり、ただリラックスしたりすることもできます。キャンプに行くときは、天候に備えて、寝袋、テント、調理器具、食料、水、その他の必需品を必ず用意してください。経験豊富なキャンパーと相談して、役立つヒントを入手することをお勧めします。キャンプは、リラックスして充電するのに最適な方法です。また、新しい経験をしたり、新しい友達を作ったりするのにも最適な方法です。ですから、アウトドアを楽しむ方法を探しているなら、キャンプは素晴らしい選択です。',
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[randomCityIndex].longitude,
                    cities[randomCityIndex].latitude
                ]
            },
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/drswsdakz/image/upload/v1684882653/YelpCamp/iiiivu4cvmidpxsevodc.png',
                    filename: 'YelpCamp/iiiivu4cvmidpxsevodc'
                },
                {
                    url: 'https://res.cloudinary.com/drswsdakz/image/upload/v1684883875/YelpCamp/z7ud2bdhyt6ojd8suuhm.png',
                    filename: 'YelpCamp/z7ud2bdhyt6ojd8suuhm' 
                }     

            ]
        })
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});

