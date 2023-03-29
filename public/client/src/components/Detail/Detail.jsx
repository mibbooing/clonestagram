import React, { useCallback, useEffect, useRef, useState } from 'react';
import './css/index.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  __UPDATE_COMMENT_TARGET__,
  __UPDATE_DETAIL_DATA__,
  __UPDATE_DETAIL_STATE__,
  __UPDATE_IS_COMMENT_TO_FEED__
} from '@dispatchers/layout';
import CommentSection from './components/CommentSection';
import firebaseApp from '@config/firebaseApp';

const Fdatabase = firebaseApp.database();

function makeArray(obj) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);

  const result = keys.map((item, idx) => {
    return {
      cid: item,
      data: values[idx]
    };
  });

  return result.reverse();
}

function Detail() {
  const session = useSelector((state) => state.auth.session);
  const dispatch = useDispatch();
  const detailData = useSelector((state) => state.layouts.detailData);
  const [userProfile, setUserProfile] = useState(undefined);
  const [feedUserProfile, setFeedUserProfile] = useState(undefined);
  const [comment, setComment] = useState('');
  const commentRef = useRef(null);
  const [commentDate, setCommentDate] = useState([]);
  const targetId = useSelector((state) => state.layouts.targetId);
  const isToFeed = useSelector((state) => state.layouts.isToFeed);
  const likelist = useSelector((state) => state.auth.likelist);
  const [likeCount, setLikeCount] = useState(detailData.feed.like);

  const __closeDetail = useCallback(() => {
    dispatch({
      type: __UPDATE_DETAIL_STATE__,
      payload: false
    });

    dispatch({
      type: __UPDATE_DETAIL_DATA__,
      payload: undefined
    });
  }, [dispatch]);

  const __whenKeyDown = useCallback(
    (e) => {
      const code = e.code;
      if (code === 'Escape') {
        __closeDetail();
      }
    },
    [__closeDetail]
  );

  const __getFeedUserImage = useCallback(() => {
    if (detailData) {
      const {
        profile: { uid }
      } = detailData;

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
          setFeedUserProfile(image);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [detailData]);

  const __getProfileImage = useCallback(() => {
    if (session) {
      const { uid } = session;

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
          setUserProfile(image);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [session]);

  const __loadComments = useCallback(() => {
    if (detailData) {
      const { fid } = detailData;

      dispatch({
        type: __UPDATE_COMMENT_TARGET__,
        payload: fid
      });
      dispatch({
        type: __UPDATE_IS_COMMENT_TO_FEED__,
        payload: true
      });

      let url = '/comment/load';

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
          console.log(data);
          console.log(makeArray(data));
          setCommentDate(makeArray(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [detailData, dispatch]);

  const __uploadComment = useCallback(
    (e) => {
      e.preventDefault();
      if (session) {
        const { fid } = detailData;
        const { uid } = session;

        let url = '/comment/new';

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Allow-Control-Access-Origin': '*'
          },
          body: JSON.stringify({
            fid,
            targetId,
            isToFeed,
            comment: {
              text: comment,
              timestamp: Date.now(),
              like: 0,
              profile: {
                uid
              }
            }
          })
        })
          .then((res) => res.json())
          .then(({ msg }) => {
            commentRef.current.value = '';
            setComment('');
            __loadComments();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [detailData, comment, session, commentRef, __loadComments, isToFeed, targetId]
  );

  const __updateLike = useCallback(() => {
    if (detailData) {
      const {
        fid,
        feed: { like }
      } = detailData;
      const { uid } = session;

      const clone = [...likelist];

      if (likelist.indexOf(fid) !== -1) {
        setLikeCount(likeCount - 1);
        clone.splice(likelist.indexOf(fid), 1);
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
            targetId: fid,
            type: 'feed',
            like
          })
        })
          .then((res) => res.json())
          .then(({ msg }) => {
            console.log(msg);
          });
      } else {
        setLikeCount(likeCount + 1);
        clone.push(fid);
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
            targetId: fid,
            type: 'feed',
            like
          })
        })
          .then((res) => res.json())
          .then(({ msg }) => {
            console.log(msg);
          });
      }
    }
  }, [likelist, detailData, session, likeCount]);

  useEffect(() => {
    __loadComments();
  }, [__loadComments]);

  useEffect(() => {
    __getProfileImage();
    __getFeedUserImage();
    return () => {};
  }, [__getFeedUserImage, __getProfileImage]);

  useEffect(() => {
    window.addEventListener('keydown', __whenKeyDown);
    return () => {
      window.removeEventListener('keydown', __whenKeyDown);
    };
  }, [__whenKeyDown]);

  return (
    <div className="feed-detail">
      <div className="bg" onClick={__closeDetail}></div>
      <div className="wrapper">
        <div className="close">
          <img src="/assets/feed/close.svg" alt="닫기" onClick={__closeDetail} />
        </div>
        {detailData.feed.image && (
          <div
            className="main-image"
            style={{ backgroundImage: `url(${detailData.feed.image})` }}
          ></div>
        )}
        <div className="contents">
          <div className="feed-content">
            <div className="top">
              <div
                className="profile-image"
                style={feedUserProfile && { backgroundImage: `url(${feedUserProfile})` }}
              ></div>
              <div className="feed-desc">
                <div className="nickname txt-bold">{detailData.profile.nickname}</div>
                <div className="timestamp">{detailData.config.time}</div>
              </div>
            </div>
            <div className="body">{detailData.feed.context}</div>
            <div className="bottom">
              <div className="like" onClick={__updateLike}>
                <div className="asset">
                  <img
                    src={
                      likelist.indexOf(detailData.fid) !== -1
                        ? '/assets/feed/like-ac.svg'
                        : '/assets/feed/like-dac.svg'
                    }
                    alt="좋아요"
                  />
                </div>
                <div className="title txt-bold">{likeCount}</div>
              </div>
              <div className="comment">
                <div className="asset">
                  <img src="/assets/feed/comment.svg" alt="댓글" />
                </div>
                <div className="title txt-bold">{commentDate.length}</div>
              </div>
            </div>
          </div>
          <div className="feed-comments">
            {commentDate.map((item, idx) => {
              return <CommentSection key={idx} {...item} fid={detailData.fid} />;
            })}

            {/* <div className="comment-form comment">
              <div className="top">
                <div className="left">
                  <div className="profile-image"></div>
                  <div className="feed-desc">
                    <div className="nickname txt-bold">mibboo</div>
                    <div className="timestamp">8:15pm, yesterday</div>
                  </div>
                </div>
                <div className="right">
                  <div className="like">
                    <div className="asset">
                      <img src="/assets/feed/like-dac.svg" alt="좋아요" />
                    </div>
                    <div className="title txt-bold">25K</div>
                  </div>
                  <div className="reply-btn">답글</div>
                </div>
              </div>
              <div className="body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quisquam corporis
                blanditiis, ducimus dolores harum rerum possimus sapiente, adipisci iure debitis
                similique consequuntur esse. Voluptatem quam fugit reiciendis consequatur
                reprehenderit?
              </div>
            </div>

            <div className="comment-form reply">
              <div className="top">
                <div className="left">
                  <div className="profile-image"></div>
                  <div className="feed-desc">
                    <div className="nickname txt-bold">mibboo</div>
                    <div className="timestamp">8:15pm, yesterday</div>
                  </div>
                </div>
                <div className="right">
                  <div className="like">
                    <div className="asset">
                      <img src="/assets/feed/like-dac.svg" alt="좋아요" />
                    </div>
                    <div className="title txt-bold">25K</div>
                  </div>
                  <div className="reply-btn">답글</div>
                </div>
              </div>
              <div className="body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quisquam corporis
                blanditiis, ducimus dolores harum rerum possimus sapiente, adipisci iure debitis
                similique consequuntur esse. Voluptatem quam fugit reiciendis consequatur
                reprehenderit?
              </div>
            </div>

            <div className="comment-form comment">
              <div className="top">
                <div className="left">
                  <div className="profile-image"></div>
                  <div className="feed-desc">
                    <div className="nickname txt-bold">mibboo</div>
                    <div className="timestamp">8:15pm, yesterday</div>
                  </div>
                </div>
                <div className="right">
                  <div className="like">
                    <div className="asset">
                      <img src="/assets/feed/like-dac.svg" alt="좋아요" />
                    </div>
                    <div className="title txt-bold">25K</div>
                  </div>
                  <div className="reply-btn">답글</div>
                </div>
              </div>
              <div className="body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quisquam corporis
                blanditiis, ducimus dolores harum rerum possimus sapiente, adipisci iure debitis
                similique consequuntur esse. Voluptatem quam fugit reiciendis consequatur
                reprehenderit?
              </div>
            </div>

            <div className="comment-form comment">
              <div className="top">
                <div className="left">
                  <div className="profile-image"></div>
                  <div className="feed-desc">
                    <div className="nickname txt-bold">mibboo</div>
                    <div className="timestamp">8:15pm, yesterday</div>
                  </div>
                </div>
                <div className="right">
                  <div className="like">
                    <div className="asset">
                      <img src="/assets/feed/like-dac.svg" alt="좋아요" />
                    </div>
                    <div className="title txt-bold">25K</div>
                  </div>
                  <div className="reply-btn">답글</div>
                </div>
              </div>
              <div className="body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quisquam corporis
                blanditiis, ducimus dolores harum rerum possimus sapiente, adipisci iure debitis
                similique consequuntur esse. Voluptatem quam fugit reiciendis consequatur
                reprehenderit?
              </div>
            </div> */}
          </div>
          <form className="feed-write-comment" onSubmit={__uploadComment}>
            <div
              className="profile-image"
              style={userProfile && { backgroundImage: `url(${userProfile})` }}
            ></div>
            <div className="write-comment">
              <input
                type="text"
                placeholder="댓글을 남겨주세요"
                ref={commentRef}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Detail;
