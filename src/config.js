export const config = {
  apiUrl: process.env.REACT_APP_API_URL || '',
  siteUrl: process.env.REACT_APP_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : ''),
  paddleEnv: process.env.REACT_APP_PADDLE_ENV || 'sandbox',
  paddleClientToken: process.env.REACT_APP_PADDLE_CLIENT_TOKEN || '',
  paddlePriceId: process.env.REACT_APP_PADDLE_PRICE_ID || '',
  crmPriceUsd: 2500,
  crmPlanName: 'PingList.io',
};
