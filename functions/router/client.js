const firebaseApp = require("../config/firebaseModule");
const express = require("express");
const cors = require("cors");
const { credential } = require("../config/firebaseModule");

const Fauth = firebaseApp.auth();
const Fdatabase = firebaseApp.database();

const router = express.Router();
router.use(cors());
router.options("*", cors);

router.post("/user/new", (req, res, next) => {
  const { email, password, nickname } = req.body;

  Fauth.createUser({
    email,
    password,
    displayName: nickname,
  })
    .then((credential) => {
      const { uid } = credential;
      // 유저 프로필 데이터베이스를 만들고 DB에 저장하기

      Promise.all([
        Fdatabase.ref(`users/${uid}/profile`).set({
          //유저 프로필저장
          email,
          nickname,
          timestamp: Date.now(),
        }),
        Fdatabase.ref(`statics/nicknames/${uid}`).set(nickname), //닉네임저장
      ])
        .then(() => {
          res.status(200).json({
            msg: "유저 생성 완료",
          });
        })
        .catch((err) => {
          res.status(400).json({
            err,
          });
        });
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
});

router.post("/feed/new", (req, res, next) => {
  const { feed, profile, timestamp } = req.body;

  const { uid } = profile;

  Fdatabase.ref("feed")
    .push({
      feed,
      profile,
      timestamp,
    })
    .then((snapshot) => {
      const fid = snapshot.key; //랜덤키 생성후 반환
      Fdatabase.ref(`users/${uid}/feed`)
        .push({
          fid,
        })
        .then(() => {
          res.status(200).json({
            msg: "피드가 올라갔습니다.",
          });
        })
        .catch((err) => {
          res.status(400).json({
            err,
          });
        }); // 유저가 본인 글을 가져올때 사용
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
});

router.post("/user/profile/image", (req, res, next) => {
  const { uid } = req.body;
  Fdatabase.ref(`users/${uid}/profile/image`)
    .once("value", (snapshot) => {
      if (snapshot.exists) {
        res.status(200).json({
          image: snapshot.val(),
        });
      } else {
        res.status(200).json({
          image: undefined,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
});

router.post("/user/profile/quote", (req, res, next) => {
  const { uid } = req.body;
  Fdatabase.ref(`users/${uid}/profile/quote`)
    .once("value", (snapshot) => {
      if (snapshot.exists) {
        res.status(200).json({
          quote: snapshot.val(),
        });
      } else {
        res.status(200).json({
          quote: undefined,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
});

router.post("/user/feed", (req, res, next) => {
  const { uid } = req.body;

  Fdatabase.ref("feed")
    .orderByChild("profile/uid")
    .equalTo(uid)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        const value = snapshot.val(); // 내가 쓴 글 목록
        const feedlength = Object.keys(value).length;
        res.status(200).json({
          feed: Object.values(value),
          msg: `피드가 ${feedlength}개 존재합니다.`,
        });
      } else {
        res.status(200).json({
          feed: [],
          msg: "피드가 없습니다.",
        });
      }
    })
    .catch((err) => [
      res.status(400).json({
        err,
      }),
    ]);
});

router.post("/friends/recommand", (req, res, next) => {
  const { uid } = req.body;

  Fdatabase.ref("users")
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const userValue = Object.values(val);
        const objectToArr = Object.keys(val).map((item, idx) => {
          return {
            uid: item,
            data: userValue[idx],
          };
        });

        const exceptSelf = objectToArr.filter((i) => i.uid !== uid);

        const exceptMyNode = exceptSelf;

        res.status(200).json({
          friends: exceptSelf,
          msg: "추천친구를 불러왔습니다.",
        });
      } else {
        res.status(200).json({
          friends: [],
          msg: "유저가 없습니다.",
        });
      }
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
