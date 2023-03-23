const functions = require("firebase-functions");

const clientApi = require("./router/client");

exports.clientApi = functions.https.onRequest(clientApi);
