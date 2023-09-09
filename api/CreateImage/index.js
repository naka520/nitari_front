const Replicate = require("replicate");
global.fetch = require('node-fetch');
global.Headers = global.fetch.Headers;

module.exports = async function (context, req) {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const output = await replicate.run(
    "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
    {
      input: {
        prompt: req.body.prompt,
        width: 512,
        height: 512,
      }
    }
  );

  context.res = {
    body: output
  };
};