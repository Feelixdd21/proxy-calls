// server.js
import express from "express";
import twilio from "twilio";

const app = express();
app.use(express.urlencoded({ extended: false }));

// Configuración de Twilio
const accountSid = "AC7d0e7bc87c99d81a56e5f84581c94cda";
const authToken = "511484b260246a81d5153cd671b73c7d";
const client = twilio(accountSid, authToken);

// Número Twilio que será el callerId
const TWILIO_NUMBER = "+19342482237";
// Número destino real
const DESTINO_REAL = "+522741156331";

// 1️⃣ Webhook para llamadas entrantes
app.post("/incoming_call", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  // Saluda y une la llamada a una conference
  twiml.say("Conectando con tu número, por favor espera...");
  const dial = twiml.dial();
  dial.conference({
    startConferenceOnEnter: true,
    endConferenceOnExit: true
  }, "proxy-conference-123");

  res.type("text/xml");
  res.send(twiml.toString());

  // 2️⃣ Crear llamada saliente al número destino y unir a la misma conference
  client.calls
    .create({
      to: DESTINO_REAL,
      from: TWILIO_NUMBER,
      twiml: `<Response><Dial><Conference startConferenceOnEnter="true" endConferenceOnExit="true">proxy-conference-123</Conference></Dial></Response>`
    })
    .then(call => console.log("Llamada saliente creada:", call.sid))
    .catch(err => console.error("Error llamando al destino:", err));
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Servidor Twilio Proxy activo en puerto ${port}`)
);
