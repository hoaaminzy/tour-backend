const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dsnu89olo",
  api_key: "479598388294263",
  api_secret: "JRabQFvNq7OG4XGikQ4xmKjjBqo", // Click 'View API Keys' above to copy your API secret
});
module.exports = cloudinary;
