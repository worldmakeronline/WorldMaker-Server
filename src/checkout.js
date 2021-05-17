const { createGhostMember } = require("./services/ghost");
const { createCustomer, createChargeSchedule } = require("./services/omise");

module.exports = async function checkout(data) {
  const customer = await createCustomer(data);
  const schedule = await createChargeSchedule({ customer, ...data });
  const ghostUser = await createGhostMember({
    customer,
    ...data
  });
  return {
    customer,
    schedule,
    ghostUser
  };
};
