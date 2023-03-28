import React, { useCallback, useEffect, useState } from 'react';
import './css/index.css';
import { useSelector, useDispatch } from 'react-redux';
import { __UPDATE_DETAIL_DATA__, __UPDATE_DETAIL_STATE__ } from '@dispatchers/layout';

function Detail() {
  const session = useSelector((state) => state.auth.session);
  const dispatch = useDispatch();
  const detailData = useSelector((state) => state.layouts.detailData);
  const [userProfile, setUserProfile] = useState(undefined);
  const [feedUserProfile, setFeedUserProfile] = useState(undefined);

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
              <div className="like">
                <div className="asset">
                  <img src="/assets/feed/like-dac.svg" alt="좋아요" />
                </div>
                <div className="title txt-bold">{detailData.feed.like}</div>
              </div>
              <div className="comment">
                <div className="asset">
                  <img src="/assets/feed/comment.svg" alt="댓글" />
                </div>
                <div className="title txt-bold">
                  {detailData.feed.comment ? detailData.feed.comment.length : 0}
                </div>
              </div>
            </div>
          </div>
          <div className="feed-comments">
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
            </div>
          </div>
          <div className="feed-write-comment">
            <div
              className="profile-image"
              style={userProfile && { backgroundImage: `url(${userProfile})` }}
            ></div>
            <div className="write-comment">
              <input type="text" placeholder="댓글을 남겨주세요" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
