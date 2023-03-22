import React from 'react';
import './css/index.css';

function Join() {
  return (
    <div className="join">
      <div className="wrapper">
        <div className="logo">
          <img src="/assets/welcome/logo.svg" alt="logo" />
        </div>
        <form className="join-contents">
          <div className="email-inp custom-inp">
            <div className="top">
              <div className="title txt-bold">이메일</div>
              <div className="warning"></div>
            </div>
            <div className="inp">
              <input type="email" placeholder="이메일을 입력해주세요" required />
            </div>
          </div>
          <div className="password-inp custom-inp">
            <div className="top">
              <div className="title txt-bold">비밀번호</div>
              <div className="warning"></div>
            </div>
            <div className="inp">
              <input type="password" placeholder="비밀번호를 입력해주세요" required />
            </div>
          </div>
          <div className="nickname-inp custom-inp">
            <div className="top">
              <div className="title txt-bold">닉네임</div>
              <div className="warning">이미 사용중인 닉네임입니다</div>
            </div>
            <div className="inp">
              <input type="text" placeholder="닉네임을 입력해주세요" required />
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
