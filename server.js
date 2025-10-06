
// Configuración de Twilio


import express from "express";
import twilio from "twilio";

const app = express();
app.use(express.urlencoded({ extended: false }));

// Tu número Twilio (con voz activa)
const TWILIO_NUMBER = "+19342482237";
// El número real al que quieres enlazar la llamada
const DESTINO_REAL = "+522741156331";

// Cuando alguien llama a tu número Twilio:
app.post("/incoming_call", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  // Twilio marcará de inmediato al destino
  const dial = twiml.dial({
    callerId: TWILIO_NUMBER, // se muestra este número, no el real
    answerOnBridge: true, // asegura que ambos escuchen solo cuando contestan
    timeout: 20
  });

  dial.number(DESTINO_REAL);

  res.type("text/xml");
  res.send(twiml.toString());
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor Twilio activo en puerto ${port}`));
