import React from 'react';
import './css/index.css';

function Profile() {
  return (
    <div className="profile">
      <div className="wrapper">
        <div className="info">
          <div className="profile-image"></div>
          <div className="profile-desc">
            <div className="nickname txt-bold">mibboo</div>
            {false ? (
              <div className="quote">
                <textarea placeholder="자신의 한줄소개를 입력해주세요."></textarea>
              </div>
            ) : (
              <>
                <div className="quote">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta accusamus
                  repudiandae ad beatae reiciendis nemo recusandae odio, id ipsam nihil tempora vero
                  in quaerat pariatur doloremque. Minima culpa cumque iusto.
                </div>
                <div className="follow-btn txt-bold">팔로우하기</div>
              </>
            )}
          </div>
        </div>
        <div className="feed-images">
          <div className="feed-image">
            <img
              src="https://c4.wallpaperflare.com/wallpaper/108/140/869/digital-digital-art-artwork-fantasy-art-drawing-hd-wallpaper-thumb.jpg"
              alt=""
            />
          </div>
          <div className="feed-image">
            <img src="https://images4.alphacoders.com/936/936378.jpg" alt="" />
          </div>
          <div className="feed-image">
            <img
              src="https://t4.ftcdn.net/jpg/05/21/18/03/360_F_521180377_2iAVJqBQSo3cgKaVp8vMBR8asrC61DoU.jpg"
              alt=""
            />
          </div>
          <div className="feed-image">
            <img
              src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg"
              alt=""
            />
          </div>
          <div className="feed-image">
            <img
              src="https://mobimg.b-cdn.net/v3/fetch/83/83b001d629f121eea6797b62cdcb4c68.jpeg"
              alt=""
            />
          </div>
          <div className="feed-image">
            <img
              src="https://img.freepik.com/free-photo/aesthetic-dark-wallpaper-background-neon-light_53876-128291.jpg?w=2000"
              alt=""
            />
          </div>
          <div className="feed-image">
            <img src="https://www.wallpapershop.com.au/assets/marketing/69.png?1655705825" alt="" />
          </div>
          <div className="feed-image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5fxfhww25ysyMkq_IELQsXvEtbPHIM_fHUQ&usqp=CAU"
              alt=""
            />
          </div>
        </div>

        <div className="profile-contents">
          <div className="feed-list">
            <div className="title txt-bold">작성한 글</div>
            <div className="feeds">
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
            </div>
          </div>
          <div className="profile-info-desc">
            <div className="desc">
              <div className="title txt-bold">좋아요</div>
              <div className="count">739,000</div>
            </div>
            <div className="desc">
              <div className="title txt-bold">팔로워</div>
              <div className="count">2,539,000</div>
            </div>
            <div className="desc">
              <div className="title txt-bold">포스트</div>
              <div className="count">332</div>
            </div>
            <div className="desc">
              <div className="title txt-bold">친구</div>
              <div className="count">195,488</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
