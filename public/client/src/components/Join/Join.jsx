import React, { useCallback, useEffect, useState } from 'react';
import './css/index.css';
import { useSelector } from 'react-redux';

function Join() {
  const nicknames = useSelector((state) => state.config.service.nicknames);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isNicknameExist, setIsNicknameExist] = useState(false);
  // 닉네임 호출 useSelector

  const __createUser = useCallback(() => {
    if (email && nickname && !isNicknameExist && password && password.length >= 8) {
      let url = '/user/new';

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Allow-Control-Access-Origin': '*'
        },
        body: JSON.stringify({
          email,
          password,
          nickname
        })
      })
        .then((res) => res.json())
        .then(({ msg }) => {
          console.log(msg);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('유효성검사 오류');
      console.log('유효성검사 오류');
    }
  }, [email, nickname, password, isNicknameExist]);
  // useEffect 닉네임 중복여부 체크

  const __checkNickname = useCallback(() => {
    if (nicknames.indexOf(nickname) !== -1) {
      console.log('닉네임이 존재합니다.');
      setIsNicknameExist(true);
    } else {
      console.log('닉네임이 존재하지 않습니다.');
      setIsNicknameExist(false);
    }
  }, [nicknames, nickname]);

  useEffect(() => {
    __checkNickname();
    return () => {};
  }, [__checkNickname]);

  return (
    <div className="join">
      <div className="wrapper">
        <div className="logo">
          <img src="/assets/welcome/logo.svg" alt="logo" />
        </div>
        <form
          className="join-contents"
          onSubmit={(e) => {
            e.preventDefault();
            __createUser();
          }}
        >
          <div className="email-inp custom-inp">
            <div className="top">
              <div className="title txt-bold">이메일</div>
              <div className="warning"></div>
            </div>
            <div className="inp">
              <input
                type="email"
                placeholder="이메일을 입력해주세요"
                onBlur={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="password-inp custom-inp">
            <div className="top">
              <div className="title txt-bold">비밀번호</div>
              <div className="warning">
                {password && password.length < 8 && '비밀번호는 8자리 이상이어야 합니다.'}
              </div>
            </div>
            <div className="inp">
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="nickname-inp custom-inp">
            <div className="top">
              <div className="title txt-bold">닉네임</div>
              <div className="warning">{isNicknameExist && '이미 사용중인 닉네임입니다'}</div>
            </div>
            <div className="inp">
              <input
                type="text"
                placeholder="닉네임을 입력해주세요"
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </div>
          </div>
          <button className="join-btn" type="submit">
            회원가입하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Join;
