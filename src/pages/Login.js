import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleData } from "../api";
import KaKaoLoginImg from "../images/kakao_login_large_wide.png";
import { KAKAO_AUTH_URL } from "../OAuth";
import { setAccessToken, setRefreshToken } from "../token";
import styles from "./pageStyles/Login.module.css";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

function LoginForm({ onSubmit, onChange, onClick, values }) {
  return (
    <form onSubmit={onSubmit} className={styles.loginForm}>
      <div className={styles.subtitle}>
        <div>로그인</div>
        <div onClick={onClick} className={styles.signup}>
          회원가입
        </div>
      </div>
      <input
        className={styles.input}
        type="email"
        name="email"
        value={values.email}
        onChange={onChange}
        placeholder="아이디 또는 이메일 주소"
      />
      <input
        className={styles.input}
        type="password"
        name="password"
        value={values.password}
        onChange={onChange}
        placeholder="비밀번호"
      />
      <button className={styles.loginButton} type="submit">
        이메일 로그인
      </button>
    </form>
  );
}

function LineForm() {
  return (
    <div className={styles.lineForm}>
      <div className={styles.line} />
      <div className={styles.lineText}>Or Social Login</div>
      <div className={styles.line} />
    </div>
  );
}

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState(INITIAL_VALUES);

  const haveToken = () => {
    const accessToken = JSON.parse(window.localStorage.getItem("accessToken"));
    if (accessToken) {
      const accessExpires = new Date(accessToken.expires);
      let now = new Date();
      if (accessExpires < now) {
        window.localStorage.removeItem("accessToken");
      }
    }

    if (accessToken) {
      navigate("/shop");
      return;
    }

    const refreshToken = JSON.parse(
      window.localStorage.getItem("refreshToken")
    );

    if (refreshToken) {
      const refreshExpires = new Date(refreshToken.expires);
      let now = new Date();
      console.log(`refreshToken Expires : ${refreshExpires}`);
      if (refreshExpires < now) {
        window.localStorage.removeItem("refreshToken");
        return;
      }
    }
    if (refreshToken) navigate("/shop");
  };

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    navigate("/login/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    let response;
    try {
      response = await handleData.getEmailToken(`/member-auth/login`, values);
      if (response.status === 200) {
        window.localStorage.clear();
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        navigate("/shop");
      }
    } catch (error) {
      setValues(INITIAL_VALUES);
      alert("로그인에 실패하였습니다.");
    }
  };

  useEffect(() => {
    haveToken();
  }, []);

  return (
    <div className={styles.loginPage}>
      <div className={styles.header}>
        <div className={styles.title}>ZeroGift</div>
        <div className={styles.des}>마음을 선물해요</div>
      </div>
      <LoginForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        onClick={handleClick}
        values={values}
      />
      <LineForm />
      <button
        type="button"
        className={styles.kakaoButton}
        onClick={handleKakaoLogin}
      >
        <img src={KaKaoLoginImg} alt="카카오 로그인" />
      </button>
    </div>
  );
}

export default Login;
