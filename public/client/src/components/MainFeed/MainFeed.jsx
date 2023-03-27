import React, { useCallback, useRef, useState } from 'react';
import './css/index.css';
import { useSelector } from 'react-redux';
import firebaseApp from '@config/firebaseApp';

const Fstorage = firebaseApp.storage();

function uploadImageToFirebaseStorage(data, timestamp) {
  return new Promise((resolve, reject) => {
    Fstorage.ref(`feed/${timestamp}/feed.jpg`)
      .putString(data.split(',')[1], 'base64', {
        contentType: 'image/jpg'
      })
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log('이미지 업로드 완료');
            resolve(url);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function MainFeed() {
  const contextRef = useRef(null);
  const session = useSelector((state) => state.auth.session);
  const [context, setContext] = useState(undefined);
  const [feed_image, setFeed_image] = useState(undefined);

  const __makeFeed = useCallback(
    async (e) => {
      e.preventDefault();

      if (session && (context || feed_image)) {
        const nowTime = Date.now();
        let downloadUrl;
        if (feed_image) {
          downloadUrl = await uploadImageToFirebaseStorage(feed_image, nowTime).catch((err) => {
            console.log(err);
          });
        }
        const { uid } = session;
        let url = '/feed/new';

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Allow-Control-Access-Origin': '*'
          },
          body: JSON.stringify({
            feed: {
              context,
              image: downloadUrl,
              like: 0
            },
            profile: {
              uid
            },
            timestamp: nowTime
          })
        })
          .then((res) => res.json())
          .then(({ msg }) => {
            contextRef.current.value = '';
            setContext(undefined);
            setFeed_image(undefined);
            alert(msg);
            console.log(msg);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [context, feed_image, session, contextRef]
  );

  const __getData64FromImage = useCallback((e) => {
    const filelist = e.target.files[0];

    const reader = new FileReader();

    reader.onload = (e) => {
      setFeed_image(e.target.result);
      console.log(e.target.result);
    };

    reader.readAsDataURL(filelist);
  }, []);

  return (
    <div className="mainfeed">
      <div className="wrapper">
        <div className="feed-list">
          <form className="write-feed" onSubmit={__makeFeed}>
            <div className="profile-image"></div>
            <div className="inp">
              <input
                ref={contextRef}
                type="text"
                placeholder="오늘 무슨일이 있었나요?"
                onChange={(e) => setContext(e.target.value)}
              />
            </div>
            <div className="get-image">
              <label htmlFor="get-image-input">
                <img src="/assets/main/add-image.svg" alt="이미지 추가하기" />
              </label>
              <input id="get-image-input" type="file" onChange={__getData64FromImage} />
            </div>
          </form>
          <div className="feed">
            <div className="top">
              <div className="profile-image"></div>
              <div className="profile-desc">
                <div className="nickname text-bold">mibboo</div>
                <div className="timestamp">8:15 pm, yesterday</div>
              </div>
            </div>
            <div className="contents">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore obcaecati eveniet
              ullam, ipsam dolor libero officia veniam cumque est suscipit repudiandae. Autem
              aliquid laudantium nemo placeat vel est aspernatur temporibus.
            </div>
            <div className="bottom">
              <div className="like">
                <div className="asset">
                  <img src="/assets/feed/like-dac.svg" alt="좋아요" />
                </div>
                <div className="count text-bold">2k</div>
              </div>
              <div className="comment">
                <div className="asset">
                  <img src="/assets/feed/comment.svg" alt="댓글" />
                </div>
                <div className="count text-bold">2k</div>
              </div>
            </div>
          </div>

          <div className="feed">
            <div className="top">
              <div className="profile-image"></div>
              <div className="profile-desc">
                <div className="nickname text-bold">mibboo</div>
                <div className="timestamp">8:15 pm, yesterday</div>
              </div>
            </div>
            <div className="contents">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore obcaecati eveniet
              ullam, ipsam dolor libero officia veniam cumque est suscipit repudiandae. Autem
              aliquid laudantium nemo placeat vel est aspernatur temporibus.
              <div className="image"></div>
            </div>
            <div className="bottom">
              <div className="like">
                <div className="asset">
                  <img src="/assets/feed/like-dac.svg" alt="좋아요" />
                </div>
                <div className="count text-bold">2k</div>
              </div>
              <div className="comment">
                <div className="asset">
                  <img src="/assets/feed/comment.svg" alt="댓글" />
                </div>
                <div className="count text-bold">2k</div>
              </div>
            </div>
          </div>

          <div className="feed">
            <div className="top">
              <div className="profile-image"></div>
              <div className="profile-desc">
                <div className="nickname text-bold">mibboo</div>
                <div className="timestamp">8:15 pm, yesterday</div>
              </div>
            </div>
            <div className="contents">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore obcaecati eveniet
              ullam, ipsam dolor libero officia veniam cumque est suscipit repudiandae. Autem
              aliquid laudantium nemo placeat vel est aspernatur temporibus.
            </div>
            <div className="bottom">
              <div className="like">
                <div className="asset">
                  <img src="/assets/feed/like-dac.svg" alt="좋아요" />
                </div>
                <div className="count text-bold">2k</div>
              </div>
              <div className="comment">
                <div className="asset">
                  <img src="/assets/feed/comment.svg" alt="댓글" />
                </div>
                <div className="count text-bold">2k</div>
              </div>
            </div>
          </div>

          <div className="feed">
            <div className="top">
              <div className="profile-image"></div>
              <div className="profile-desc">
                <div className="nickname txt-bold">mibboo</div>
                <div className="timestamp">8:15 pm, yesterday</div>
              </div>
            </div>
            <div className="contents">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore obcaecati eveniet
              ullam, ipsam dolor libero officia veniam cumque est suscipit repudiandae. Autem
              aliquid laudantium nemo placeat vel est aspernatur temporibus.
              <div className="image"></div>
            </div>
            <div className="bottom">
              <div className="like">
                <div className="asset">
                  <img src="/assets/feed/like-dac.svg" alt="좋아요" />
                </div>
                <div className="count txt-bold">2k</div>
              </div>
              <div className="comment">
                <div className="asset">
                  <img src="/assets/feed/comment.svg" alt="댓글" />
                </div>
                <div className="count txt-bold">2k</div>
              </div>
            </div>
          </div>
        </div>

        <div className="friend-list">
          <div className="my-profile">
            <div className="profile-image"></div>
            <div className="nickname txt-bold">Mibboo</div>
          </div>
          <div className="my-friends">
            <div className="title txt-bold">나의 친구</div>
            <ul className="friend-list-wrapper">
              <li className="friend">
                <div className="profile-image"></div>
                <div className="nickname txt-bold">Obboo</div>
              </li>
              <li className="friend">
                <div className="profile-image"></div>
                <div className="nickname txt-bold">Obboo</div>
              </li>
              <li className="friend">
                <div className="profile-image"></div>
                <div className="nickname txt-bold">Obboo</div>
              </li>
              <li className="friend">
                <div className="profile-image"></div>
                <div className="nickname txt-bold">Obboo</div>
              </li>
              <li className="friend">
                <div className="profile-image"></div>
                <div className="nickname txt-bold">Obboo</div>
              </li>
              <li className="friend">
                <div className="profile-image"></div>
                <div className="nickname txt-bold">Obboo</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainFeed;
