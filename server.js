// server.js
const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const token =
  "6tQ_CdlzvufRkQkMFh1N0KOjPZCwequLwj5L08qmSgPe3pQn8gDwA5fe5OFAzhoQFHuI3HSwf1EQW51aFlvbOzGL5uOUura9ZUqBRbjO5EMuFP9sMY4sTjEVyWw5NH8Ua-BtgJwtL76bn0VVnNjq-KszqGAQkkjfyYbgpT2aY55uR7bSNhwChSMKNzFtC5y53f8riAOKZGFrLalcTq-u2-CoEoPAVCgbntt8hAFQ_hZiMNFJBpvSqQ9VW8ZE6YuOLoFiQejfihrfZcj08QiGCR7PI-Jlh4lShq6Buix9hb49h3DSKcW52rWhR2uRU3Fh-oWjv8LdePyFVRH7ACu_NDofwFHIThq9QmJqpP7BvWRNmG4RXjCg5xga5v12t1RmCyn5JheDDEqcMNsr28iy7yhv0gxoWIjJAo9zilcAsL48s0Vs4V9AGlIUnVnw9w9QQA2-OfyzfZI_BUjCWKS2lIPhVjl2yibezQB2X1ZpdsD4DMvHNLFYg5898tsX6cYuci0OMx4SdJXcVUv9TZnUNpVD03I_tUd_AuJ5foLUZ-rjtchERD73lpXx9DwT2SI0xOQkqg0m2FbkoT28coErZEfdhRzh203mL36pWoJy3a-fVGunFT59-hHsVVdNWZAYB3KZxJxf0g-nD0qLhT6G_SNAPJye8Bog8EmrmCV6T-TGFGB7tE2TaZ5cJ55kcmxAhUNTOA"; // Secure!
const baseURL = "https://api-qa.myfatoorah.com";

app.post("/initiate-payment", (req, res) => {
  const { InvoiceAmount, CurrencyIso } = req.body;

  const options = {
    method: "POST",
    url: `${baseURL}/v2/InitiatePayment`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: {
      InvoiceAmount,
      CurrencyIso,
    },
    json: true,
  };

  request(options, (error, response, body) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(body);
  });
});
app.post("/execute-payment", (req, res) => {
  const { PaymentMethodId, InvoiceValue } = req.body;

  const options = {
    method: "POST",
    url: `${baseURL}/v2/ExecutePayment`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: {
      PaymentMethodId,
      InvoiceValue,
    },
    json: true,
  };

  request(options, (error, response, body) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(body);
  });
});
// home route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
