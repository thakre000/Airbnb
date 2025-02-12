const cloudinary = require('cloudinary').v2;
const CloudinaryStorage = require("cloudinary");



cloudinary.config({
    cloud_name :process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SEC

})

// const storage = new CloudinaryStorage({
//     cloudinary : cloudinary,
//     params :{
//         folder:"wanderlust",
//         allowedFormats:["png", "jpg", "jpeg"]
//     }
// })
