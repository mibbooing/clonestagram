import firebaseApp from '@config/firebaseApp';
import { __UPDATE_COMMENT_TARGET__, __UPDATE_IS_COMMENT_TO_FEED__ } from '@dispatchers/layout';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Reply from './Reply';

const Fdatabase = firebaseApp.database();

const oneDay = 1000 * 60 * 60 * 24;

function makeArray(obj) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);

  const result = keys.map((item, idx) => {
    return {
      rid: item,
      data: values[idx]
    };
  });

  return result.reverse();
}

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

function CommentSection({
  cid,
  fid,
  data: {
    text,
    profile: { uid },
    timestamp,
    reply,
    like
  }
}) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.auth.session);
  const [userNickname, setUserNickname] = useState('');
  const [userImage, setUserImage] = useState(undefined);
  const [replyData, setReplyData] = useState([]);
  const likelist = useSelector((state) => state.auth.likelist);
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

  const __changeTargetID = useCallback(() => {
    dispatch({
      type: __UPDATE_IS_COMMENT_TO_FEED__,
      payload: false
    });
    dispatch({
      type: __UPDATE_COMMENT_TARGET__,
      payload: cid
    });
  }, [dispatch, cid]);

  const __updateLike = useCallback(() => {
    const { uid } = session;

    const clone = [...likelist];

    if (likelist.indexOf(cid) !== -1) {
      setLikeCount(likeCount - 1);
      clone.splice(likelist.indexOf(cid), 1);
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
          targetId: cid,
          type: 'comment',
          like
        })
      })
        .then((res) => res.json())
        .then(({ msg }) => {
          console.log(msg);
        });
    } else {
      setLikeCount(likeCount + 1);
      clone.push(cid);
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
          targetId: cid,
          type: 'comment',
          like
        })
      })
        .then((res) => res.json())
        .then(({ msg }) => {
          console.log(msg);
        });
    }
  }, [likelist, fid, session, likeCount, like]);

  useEffect(() => {
    __getUserNickname();
    __getUserProfileFromServer();
    if (reply) {
      setReplyData(makeArray(reply));
    } else {
      setReplyData([]);
    }

    return () => {};
  }, [__getUserNickname, __getUserProfileFromServer, reply]);

  return (
    <div className="comment-section">
      <div className="comment-form comment">
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
                    likelist.indexOf(cid) !== -1
                      ? '/assets/feed/like-ac.svg'
                      : '/assets/feed/like-dac.svg'
                  }
                  alt="좋아요"
                />
              </div>
              <div className="title txt-bold">{likeCount}</div>
            </div>
            <div className="reply-btn" onClick={__changeTargetID}>
              답글
            </div>
          </div>
        </div>
        <div className="body">{text}</div>
      </div>
      {replyData.map((item, idx) => {
        return <Reply key={idx} {...item} fid={fid} cid={cid} />;
      })}
    </div>
  );
}

export default CommentSection;
