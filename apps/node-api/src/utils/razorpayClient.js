// import Razorpay from 'razorpay';

import Razorpay from 'razorpay';

let razorpayClients = {};

function getRazorpayClient(storeId, keyId, keySecret) {
  if (!razorpayClients[storeId]) {
    razorpayClients[storeId] = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }
  return razorpayClients[storeId];
}

export default getRazorpayClient;
