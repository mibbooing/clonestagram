import firebaseApp from '@config/firebaseApp';
import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Fdatabase = firebaseApp.database();

const oneDay = 1000 * 60 * 60 * 24;

function makeTwoDigits(time) {
  return time.toString().length !== 2 ? `0${time}` : time;
}

function makeFeedTime(timestamp) {
  // console.log(timestamp);
  const feedDate = new Date(timestamp);
  const nowDate = Date.now();

  const timeGap = nowDate - timestamp;

  const date = parseInt(timeGap / oneDay);

  const hour = feedDate.getHours();
  const minutes = feedDate.getMinutes();

  return `${hour > 12 ? '오후' : '오전'} ${
    hour > 12 ? makeTwoDigits(hour - 12) : makeTwoDigits(hour)
  }:${makeTwoDigits(minutes)}, ${date === 0 ? '오늘' : date === 1 ? '어제' : `${date}일전`}`;
}

function Reply({
  fid,
  cid,
  rid,
  data: {
    text,
    profile: { uid },
    timestamp,
    like
  }
}) {
  const [userNickname, setUserNickname] = useState('');
  const [userImage, setUserImage] = useState(undefined);
  const likelist = useSelector((state) => state.auth.likelist);
  const session = useSelector((state) => state.auth.session);
  const [likeCount, setLikeCount] = useState(like);
  const __getUserNickname = useCallback(() => {
    if (uid) {
      let url = '/user/profile/nickname';

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Allow-Control-Access-Origin': '*'
        },
        body: JSON.stringify({
          uid
        })
      })
        .then((res) => res.json())
        .then(({ nickname }) => {
          setUserNickname(nickname);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [uid]);

  const __getUserProfileFromServer = useCallback(() => {
    if (uid) {
      let url = '/user/profile/image';

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Allow-Control-Access-Origin': '*'
        },
        body: JSON.stringify({
          uid
        })
      })
        .then((res) => res.json())
        .then(({ image }) => {
          setUserImage(image);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [uid]);

  const __updateLike = useCallback(() => {
    const { uid } = session;

    const clone = [...likelist];

    if (likelist.indexOf(rid) !== -1) {
      setLikeCount(likeCount - 1);
      clone.splice(likelist.indexOf(rid), 1);
      Fdatabase.ref(`users/${uid}/likelist`).set(clone);

      let url = '/like/decrease';

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Allow-Control-Access-Origin': '*'
        },
        body: JSON.stringify({
          fid,
          cid,
          targetId: rid,
          type: 'reply',
          like
        })
      })
        .then((res) => res.json())
        .then(({ msg }) => {
          console.log(msg);
        });
    } else {
      setLikeCount(likeCount + 1);
      clone.push(rid);
      Fdatabase.ref(`users/${uid}/likelist`).set(clone);

      let url = '/like/increase';

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Allow-Control-Access-Origin': '*'
        },
        body: JSON.stringify({
          fid,
          cid,
          targetId: rid,
          type: 'reply',
          like
        })
      })
        .then((res) => res.json())
        .then(({ msg }) => {
          console.log(msg);
        });
    }
  }, [likelist, fid, session, likeCount, like, cid, rid]);

  useEffect(() => {
    __getUserNickname();
    __getUserProfileFromServer();

    return () => {};
  }, [__getUserNickname, __getUserProfileFromServer]);
  return (
    <div className="comment-form reply">
      <div className="top">
        <div className="left">
          <div
            className="profile-image"
            style={userImage && { backgroundImage: `url(${userImage})` }}
          ></div>
          <div className="feed-desc">
            <div className="nickname txt-bold">{userNickname}</div>
            <div className="timestamp">{makeFeedTime(timestamp)}</div>
          </div>
        </div>
        <div className="right">
          <div className="like" onClick={__updateLike}>
            <div className="asset">
              <img
                src={
                  likelist.indexOf(rid) !== -1
                    ? '/assets/feed/like-ac.svg'
                    : '/assets/feed/like-dac.svg'
                }
                alt="좋아요"
              />
            </div>
            <div className="title txt-bold">{likeCount}</div>
          </div>
        </div>
      </div>
      <div className="body">{text}</div>
    </div>
  );
}

export default Reply;
