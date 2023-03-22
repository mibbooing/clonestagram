const firebaseApp = require("../config/firebaseModule");
const express = require("express");
const cors = require("cors");
const { credential } = require("../config/firebaseModule");

const Fauth = firebaseApp.auth();

const router = express.Router();
router.use(cors());
router.options("*", cors);

router.post("/user/new", (req, res, next) => {
  const { email, password } = req.body;

  Fauth.createUser({
    email: email,
    password: password,
  })
    .then((credential) => {
      const { uid } = credential;
      // 유저 프로필 데이터베이스를 만들고 DB에 저장하기
      res.status(200).json({
        msg: "유저 생성 완료",
      });
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
});

router.get("/helloworld", (req, res, next) => {
  res.json({
    msg: "helloworld",
  });
});

module.exports = router;
