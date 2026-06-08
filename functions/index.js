const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');

admin.initializeApp();
const db = admin.firestore();

exports.verifyPayPalTransaction = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be logged in.');
  }
  
  const { orderId, videoId } = data;
  if (!orderId || !videoId) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing orderId or videoId.');
  }

  const clientId = process.env.PAYPAL_CLIENT_ID || (functions.config().paypal && functions.config().paypal.client_id);
  const secret = process.env.PAYPAL_SECRET || (functions.config().paypal && functions.config().paypal.secret);

  if (!clientId || !secret) {
    throw new functions.https.HttpsError('internal', 'PayPal API keys not configured. Add them to functions/.env file');
  }

  try {
    const authString = Buffer.from(`${clientId}:${secret}`).toString('base64');
    const tokenRes = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    if (!tokenRes.ok) {
      throw new Error('Failed to fetch PayPal token');
    }
    
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    const orderRes = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!orderRes.ok) {
      throw new Error('Failed to fetch Order details');
    }

    const orderData = await orderRes.json();

    if (orderData.status !== 'COMPLETED') {
      throw new functions.https.HttpsError('failed-precondition', 'Transaction is not completed.');
    }

    // Securely grant video access in Firestore
    await db.collection('users').doc(context.auth.uid).update({
      unlockedVideos: admin.firestore.FieldValue.arrayUnion(videoId)
    });

    return { success: true };
  } catch (error) {
    console.error('PayPal Verification Error:', error);
    throw new functions.https.HttpsError('internal', 'Error verifying transaction.');
  }
});
