const {
  allHolding,
  allPositions,
  newOrder,
  allOrders,
} = require("../Controller/dashboardController.js");

const { isLoggedIn } = require("../Middleware/auth.js");

const router = require("express").Router();

router.get("/allHoldings", isLoggedIn, allHolding);
router.get("/allPositions", isLoggedIn, allPositions);
router.post("/newOrder", isLoggedIn, newOrder);
router.get("/allOrders", isLoggedIn, allOrders); 

module.exports = router;
