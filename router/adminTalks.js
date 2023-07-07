const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { updateGameData } = require("../controllers/gameData");

router.post("/message", authController.verifyToken, async (req, res) => {
  const { message } = req.body;
  // authController.signIn(req).then((user)=>{

  let req1 = {
    gameStatus: "result",
    gameResult: message,
  };
  await updateGameData({ body: req1 }, {}).catch((err) => {
    console.log("reeeeeeeeeeeeeeeeee", err);
  });
  io.emit("message", message);
  res.status(200).send(message);
  // }).catch((err)=>{
  //     res.status(400).send(err)
  // })
});

module.exports = router;
