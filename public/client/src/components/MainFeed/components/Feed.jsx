import { __UPDATE_DETAIL_DATA__, __UPDATE_DETAIL_STATE__ } from '@dispatchers/layout';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

function Feed({ fid }) {
  const dispatch = useDispatch();
  const [
    {
      feed: { like, comment, context, image },
      profile: { uid },
      timestamp
    },
    setData
  ] = useState({
    feed: {
      like: 0,
      comment: '',
      context: '',
      image: undefined
    },
    profile: {
      uid: undefined
    },
    timestamp: 0
  });
  const session = useSelector((state) => state.auth.session);
  const [userImage, setUserImage] = useState(undefined);
  const [userNickname, setUserNickname] = useState(undefined);

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

  const __getData = useCallback(() => {
    let url = '/feed/detail';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Allow-Control-Access-Origin': '*'
      },
      body: JSON.stringify({
        fid
      })
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fid]);

  const __openFeedDetail = useCallback(() => {
    const feedData = {
      feed: {
        like,
        comment,
        image,
        context
      },
      profile: { uid, nickname: userNickname ? userNickname : '', image: userImage },
      timestamp,
      config: {
        time: makeFeedTime(timestamp)
      },
      fid
    };

    dispatch({
      type: __UPDATE_DETAIL_DATA__,
      payload: feedData
    });

    dispatch({
      type: __UPDATE_DETAIL_STATE__,
      payload: true
    });
  }, [dispatch, like, comment, image, context, uid, timestamp, userNickname, userImage, fid]);

  useEffect(() => {
    __getData();
    __getUserNickname();
    __getUserProfileFromServer();
    return () => {};
  }, [__getUserProfileFromServer, __getData, __getUserNickname]);

  return (
    <div className="feed" onClick={__openFeedDetail}>
      <div className="top">
        <div
          className="profile-image"
          style={userImage && { backgroundImage: `url(${userImage})` }}
        ></div>
        <div className="profile-desc">
          <div className="nickname text-bold">{userNickname ? userNickname : ''}</div>
          <div className="timestamp">{makeFeedTime(timestamp)}</div>
        </div>
      </div>
      <div className="contents">
        {context}
        {image && <div className="image" style={{ backgroundImage: `url(${image})` }}></div>}
      </div>
      <div className="bottom">
        <div className="like">
          <div className="asset">
            <img src="/assets/feed/like-dac.svg" alt="좋아요" />
          </div>
          <div className="count text-bold">{like}</div>
        </div>
        <div className="comment">
          <div className="asset">
            <img src="/assets/feed/comment.svg" alt="댓글" />
          </div>
          <div className="count text-bold">{comment ? Object.keys(comment).length : 0}</div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
