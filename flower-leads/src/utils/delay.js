/**
 * دوال الانتظار والتحكم في معدل الطلبات (Rate Limiting)
 */

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  sleep
};

