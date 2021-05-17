const moment = require("moment");
const omise = require("omise")({
  secretKey: process.env.OMISE_SECRET_KEY,
  omiseVersion: "2015-09-10"
});

module.exports.createCustomer = function createCustomer({
  email,
  card,
  description
}) {
  return new Promise((resolve, reject) => {
    omise.customers.create(
      {
        description,
        email,
        card
      },
      function (error, customer) {
        if (error) {
          return reject(error);
        }
        return resolve(customer);
      }
    );
  });
};
const CHARGE_CONFIG = {
  Monthly: {
    every: 1,
    period: "month",
    amount: 10000
  },
  Yearly: {
    every: 12,
    period: "month",
    amount: 10000
  }
};
module.exports.createChargeSchedule = function createChargeSchedule({
  customer,
  type
}) {
  return new Promise((resolve, reject) => {
    const today = moment();
    const CHARGE = CHARGE_CONFIG[type];
    omise.schedules.create(
      {
        every: CHARGE.every,
        period: CHARGE.period,
        start_date: today.toISOString(),
        end_date: today.add(100, "years").toISOString(),
        on: {
          days_of_month: [today.get("date") + 1]
        },
        charge: {
          customer: customer.id,
          // card: "card_test_57m2w8iemdovs4f92m2",
          amount: CHARGE.amount,
          description: `${type} membership fee`
        }
      },
      function (error, schedule) {
        if (error) {
          return reject(error);
        }
        return resolve(schedule);
      }
    );
  });
};
