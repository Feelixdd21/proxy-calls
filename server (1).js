import express from "express";
import twilio from "twilio";

const app = express();
app.use(express.urlencoded({ extended: false }));

// Ruta que Twilio llamará
app.post("/incoming_call", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  // Redirige la llamada al número real
  twiml.dial("+522741156331"); 

  res.type("text/xml");
  res.send(twiml.toString());
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor Twilio Proxy activo en puerto ${port}`));
