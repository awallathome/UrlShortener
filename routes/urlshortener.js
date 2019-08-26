// used for MongoDB apis
const mongoose = require("mongoose");
const validUrl = require('valid-url');
const UrlShortener = mongoose.model("UrlShortener");
const shortid = require('shortid');
const errorUrl = 'http://localhost/error';

module.exports = app => {
  //GET API for redirecting to orig url
  app.get("/api/item/:code", async(req, res) => {
    console.log("REQ.PARAMS.CODE: ", req.params.code);
    const urlCode = req.params.code;
    console.log("THIS urlCode: ", urlCode);
    const item = await UrlShortener.findOne({ urlCode: urlCode });
    console.log("ITEM: ", item);
    if (item) {
      console.log("GOTTEN: ", item.originalUrl);
      return res.redirect(item.originalUrl);
    } else {
      return res.redirect(errorUrl);
    }
  });
  
  //POST API for creating short url from Original URL
  app.post("/api/item", async(req, res) => {
    const { originalUrl, shortBaseUrl } = req.body;
    // console.log('req: ', req);
    console.log("query: ", req.query);
    console.log("body: ", req.body);
    console.log("orig url: ", originalUrl);
    console.log("base: ", shortBaseUrl);
    if (validUrl.isUri(originalUrl)) {
      console.log("Provided url is valid");
    } else {
      return res.status(401).json("Invalid Base Url (a)");
    }
    const urlCode = shortid.generate();
    console.log("new code: ", urlCode)
    const updatedAt = new Date();
      console.log("before validating orig url")
    if (validUrl.isUri(originalUrl)){
      console.log("after validating orig url");
      try {
        console.log('before schema')
        const item = await UrlShortener.findOne({ originalUrl: originalUrl });
        console.log("after schema");
        if (item) {
          console.log("item created from schema: ", item)
          await item.save();
          res.status(200).json(item);
          console.log("successful save: ", item)
        } else {
          shortUrl = shortBaseUrl + '/' + urlCode;
          console.log("shortUrl")
          const item = new UrlShortener({
            originalUrl,
            shortUrl,
            urlCode,
            updatedAt
          });
          console.log('item created manually: ', item.shortUrl)
          await item.save();
          res.status(200).json(item);
          console.log('saved item: ', item);
        } 

      } catch(err){
          console.log("doh", err)
          res.status(401).json("Invalid User Id")
        }
      } else {
        return res 
          .status(401)
          .json(
            "Invalid Original Url (b)"
          );
      }
  });
};
