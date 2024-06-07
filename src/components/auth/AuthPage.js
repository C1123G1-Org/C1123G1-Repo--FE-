import "../../assets/css/AuthPage.css";
import Footer from "../posts/CommonPostPage/Footer";
import HeaderAuth from "./HeaderAuth";
import SignInBox from "./SignInBox";

function AuthPage() {
  return (
    <>
      <HeaderAuth />
      <SignInBox />
      <Footer />
    </>
  );
}

export default AuthPage;
