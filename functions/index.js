const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().keys.webhooks);
const endpointSecret = functions.config().keys.signing;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Get the signature from the request header

exports.events = functions.https.onRequest((request, response) => {
  let sig = request.headers['stripe-signature'];

  // Verify the request against our endpointSecret
  try {
    let event = stripe.webhooks.constructEvent(
      request.rawBody,
      sig,
      endpointSecret
    );
  } catch (err) {
    return response.status(400).end();
  }

  response.send('Endpoint for Stripe Webhooks!');
});
