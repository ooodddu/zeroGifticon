import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import TopButton from "./components/TopButton";

import Login from "./pages/Login";
import Shop from "./pages/Shop";
import ShopDetail from "./pages/ShopDetail";
import Gift from "./pages/Gift";
import Notification from "./pages/Notification";
import GiftBox from "./pages/GiftBox";
import GiftBoxDetail from "./pages/GiftBoxDetail";
import ThankYou from "./pages/ThankYou";
import Review from "./pages/Review";
import MyProduct from "./pages/MyProduct";
import EditMyProduct from "./pages/EditMyProduct";
import KakaoLogin from "./pages/KakaoLogin";
import NotFoundPage from "./pages/NotFoundPage";
import SignUp from "./pages/SignUp";
import Payment from "./pages/Payment";
import MyPage from "./pages/MyPage";
import MyReview from "./pages/MyReview";
import MyReviewEdit from "./pages/MyReviewEdit";
import MyMessage from "./pages/MyMessage";

function App() {
  return (
    <>
      <TopButton />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Login />} />
            <Route path="login">
              <Route index element={<Login />} />
              <Route path="oauth" element={<KakaoLogin />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
            <Route path="shop">
              <Route index element={<Shop />} />
              <Route path="shop-detail" element={<ShopDetail />} />
              <Route path="gift" element={<Gift />} />
              <Route path="payment" element={<Payment />} />
            </Route>
            <Route path="gift-box">
              <Route index element={<GiftBox />} />
              <Route
                path="gift-box-detail/:giftId"
                element={<GiftBoxDetail />}
              />
              <Route path="gift-review" element={<Review />} />
              <Route path="gift-message" element={<ThankYou />} />
            </Route>
            <Route path="my-product">
              <Route index element={<MyProduct />} />
              <Route path="edit-product" element={<EditMyProduct />} />
            </Route>
            <Route path="mypage">
              <Route index element={<MyPage />} />
              <Route path="review">
                <Route index element={<MyReview />} />
                <Route path="review-detail" element={<MyReviewEdit />} />
              </Route>
              <Route path="message" element={<MyMessage />} />
            </Route>
            <Route path="notification" element={<Notification />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
