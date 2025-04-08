const HoldingModel = require("../models/HoldingModel");
const PositionModel = require("../models/PositionModel");
const OrderModel = require("../models/OrdersModel");

const allHolding = async (req, res) => {
  let allHoldings = await HoldingModel.find({});
  res.json(allHoldings);
};
const allPositions = async (req, res) => {
  let allPositions = await PositionModel.find({});
  res.json(allPositions);
};
const newOrder = async (req, res) => {
  try {
    let name = req.body.name;
    let newQty = Number(req.body.qty);
    let newPrice = Number(req.body.price);
    let mode = req.body.mode?.toUpperCase();

    let order = await OrderModel.findOne({ name: req.body.name });
    if (!order) {
      if (mode === "SELL") {
        console.log("Cannot sell stock that is not owned");

        return res.send("Cannot sell stock that is not owned");
      }
      order = new OrderModel({
        name,
        qty: newQty,
        price: newPrice,
        mode,
      });
    } else {
      let existingQty = order.qty;
      let existingPrice = order.price;
      if (mode === "BUY") {
        const totalprice =
          (existingQty * existingPrice + newQty * newPrice) /
          (newQty + existingQty);

        const totalQty = newQty + existingQty;
        order.qty = Number(totalQty);
        order.price = Number(weightedPrice.toFixed(2));
      } else if (mode == "SELL") {
        if (newQty > existingQty) {
          console.log("Not enough quantity to sell");

          return res.send("Not enough quantity to sell");
        }
        order.qty = existingQty - newQty;
        if (order.qty === 0) {
          await OrderModel.deleteOne({ name: order.name });
          console.log("Order fully sold and removed.");

          return res.send("Order fully sold and removed.");
        }
      }
    }

    await order.save();

    res.send("order saved");
  } catch (error) {
    console.log(error);
  }
};
const allOrders = async (req, res) => {
  let allOrders = await OrderModel.find();
  res.json(allOrders);
};

module.exports = {
  allHolding,
  allPositions,
  newOrder,
  allOrders,
};
