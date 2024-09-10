import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";

import { Single } from "./pages/singlehouse.js";
import { Checkout } from "./pages/checkout.js";

import injectContext from "./store/appContext";


import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Profile } from "./pages/profile.js";

//static pages
import { About } from "./pages/static/about";
import { TermsAndConditions } from "./pages/static/termsAndConditions";
import { PrivacyPolicy } from "./pages/static/privacyPolicy";
import { CookiesStatement } from "./pages/static/cookiesStatement";
import { TopSpainDestinations } from "./pages/static/topSpainDestinations";
import { TopPortugalDestinations } from "./pages/static/topPortugalDestinations.js";
import { TopFranceDestinations } from "./pages/static/topFranceDestinations.js";
import { Faqs } from "./pages/static/faqs.js";
import { CancellationOptions } from "./pages/static/cancellationOptions.js";
import { ContactUs } from "./pages/static/contactUs.js";
import { Feedback } from "./pages/feedback.js";
// import { ForgotPassword } from "./component/forgotpassword";


const Layout = () => {
  const basename = process.env.BASENAME || "";
  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
           
            <Route element={<Login />} path="/login" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<Register />} path="/register"  />          
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<Feedback />} path="/feedback" />
            <Route element={<Checkout />} path="/checkout" />
            <Route element={<h1>Not found!</h1>} />
            {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

            {/* static routes */}
            <Route element={<About />} path="/about" />
            <Route element={<TermsAndConditions />} path="/terms-and-conditions" />
            <Route element={<PrivacyPolicy />} path="/privacy-policy" />
            <Route element={<CookiesStatement />} path="cookies-statement" />
            <Route element={<TopSpainDestinations />} path="top-spain-destinations" />
            <Route element={<TopPortugalDestinations />} path="top-portugal-destinations" />
            <Route element={<TopFranceDestinations />} path="top-france-destinations" />
            <Route element={<Faqs />} path="faqs" />
            <Route element={<CancellationOptions />} path="cancellation-options" />
            <Route element={<ContactUs />} path="contact-us" />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
