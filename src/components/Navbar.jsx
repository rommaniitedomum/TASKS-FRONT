import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navMenus } from "../utills/data";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";

// google client id 를 가저온다
// 2 . react -oauth/google 라이브러리 설치 임포트
//3  googleoauhtprovider 컴포넌트로 로그인 버튼 감싸기
// 4. clientId props 로 구글 ID 전달
// 5. google 로그인 컴포넌트 요청 및 응답 로직 처리
// 6. onsuccess, onerror 콜백함수로 로그인 성공및 실패 처리

const Navbar = ({ menuIdx }) => {
  const dispatch = useDispatch();
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const user = useSelector((state) => state.auth.authData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log(user);

  const handleLoginSucess = useCallback(
    (response) => {
      try {
        const decoded = jwtDecode(response.credential);
        dispatch(login({ authData: decoded }));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Login Handling Error", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("authData"));
    if (storedData) {
      dispatch(login({ authData: storedData }));
      setIsAuthenticated(true);
    }
  }, [dispatch]);

  // (response) => {
  //   console.log("success", jwtDecode(response.credential));
  // };

  const handleLoginError = (error) => {
    console.log("error", error);
  };

  return (
    <nav
      className="navi bg-[#212121] w-1/5 h-full rounded-sm border border-gray-500
    py-10 px-4 flex flex-col justify-between items-center">
      <div className="logo-wrapper flex w-full items-center justify-center gap-8">
        <div className="logo"></div>
        <h2 className="font-semibold text-xl">
          <Link to="/">Lorem</Link>
        </h2>
        <p>{isAuthenticated === false ? "false" : "true"}</p>
      </div>
      <ul className="menus">
        {navMenus.map((menu, idx) => (
          <li
            key={idx}
            className={`rounded-sm mb-1 border border-gray-700
             hover:bg-gray-950 transition-all duration-300 ${
               menu.idx === menuIdx ? " bg-gray-950" : ""
             }`}>
            <Link to={menu.to} className="flex gap-4 items-center py-2 px-10">
              {menu.icon}
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className=" w-4/5">
        <GoogleOAuthProvider clientId={googleClientId}>
          <GoogleLogin
            onSuccess={handleLoginSucess}
            onError={handleLoginError}
          />
          <button
            className="flex justify-center items-center gap-2 bg-gray-300 text-gray-900
        py-3 px-4 rounded-md w-full">
            <FcGoogle className="w-5 h-5" />
            <span className="text-sm">Google login</span>
          </button>
        </GoogleOAuthProvider>
      </div>
    </nav>
  );
};

export default Navbar;
