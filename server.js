import express from "express";
import twilio from "twilio";

const app = express();
app.use(express.urlencoded({ extended: false }));

// Ruta que Twilio llamará
app.post("/incoming_call", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  // Redirige la llamada al número real
 twiml.dial({ callerId: "+19342482237" }, "+522741155287");

  res.type("text/xml");
  res.send(twiml.toString());
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor Twilio Proxy activo en puerto ${port}`));
