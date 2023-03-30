import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Friend({ uid }) {
  const [nickname, setNickname] = useState('No');
  const [image, setImage] = useState(undefined);
  const history = useHistory();

  const __getNickname = useCallback(() => {
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
        setNickname(nickname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [uid]);

  const __getImage = useCallback(() => {
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
        setImage(image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [uid]);

  useEffect(() => {
    __getNickname();
    __getImage();
    return () => {};
  }, [__getNickname, __getImage]);

  return (
    <li
      className="friend"
      onClick={() => history.push(`/profile/${uid}`, { nickname, isFollowing: true })}
    >
      <div className="profile-image" style={image && { backgroundImage: `url(${image})` }}></div>
      <div className="nickname txt-bold">{nickname}</div>
    </li>
  );
}

export default Friend;
