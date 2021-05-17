const GhostAdminAPI = require("@tryghost/admin-api");

const api = new GhostAdminAPI({
  url: "https://world-maker.ghost.io",
  version: "canary",
  key: process.env.GHOST_ADMIN_API_KEY
});

module.exports.createGhostMember = async function createGhostMember({
  customer,
  email
}) {
  console.log(email);
  const member = await api.members.add(
    {
      // name: "Test",
      email,
      subscribed: true,
      note: `Omise Customer ID: ${customer.id}`
      // subscriptions: [],
      // comped: false,
      // email_count: 0,
      // email_opened_count: 0,
      // email_open_rate: null,
      // products: [],
      // labels: []
    },
    { include: "labels%2Cemail_recipients" }
  );
  return member;
};
