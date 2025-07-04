const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/getResponse', async (req, res) => {
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai'); // dynamic import
    const genAI = new GoogleGenerativeAI("AIzaSyAumLRZMbcGFQV4XaMuOH5X0xCzut6IkII");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(req.body.question);
    const text = await result.response.text();

    res.status(200).json({ response: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

app.use('*', (req, res) => {
  res.status(404).json({
    msg: 'bad request'
  })
})


module.exports = app;