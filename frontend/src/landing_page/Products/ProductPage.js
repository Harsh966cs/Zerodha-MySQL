import React from "react";
import LeftSection from "./LeftSection";
import Hero from "./Hero";
import RightSection from "./RightSection";
import Universal from "./Universal";

const ProductPage = () => {
  return (
    <div>
      <Hero />
       <LeftSection imageUrl="media\kite.png" productName="Kite" productDecription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices" demoLink="https://kite-demo.zerodha.com/dashboard" lernMoreLink="https://zerodha.com/products/kite" getPlayStoreLink='https://play.google.com/store/apps/details?id=com.zerodha.kite3' getApplestoreLink="https://apps.apple.com/in/app/zerodha-kite-trade-invest/id1449453802"  first="Try demo" second="Learn more"/>
       <RightSection productName="Console" productDecription="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations." demoLink="https://zerodha.com/products/console" first="Learn more " imageUrl= "media\console.png"/>
       <LeftSection imageUrl="media\coin.png" productName="Coin" productDecription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices." demoLink="https://coin.zerodha.com/" lernMoreLink="https://coin.zerodha.com/" getPlayStoreLink="https://play.google.com/store/apps/details?id=com.zerodha.coin" getApplestoreLink="https://apps.apple.com/in/app/coin-by-zerodha-mutual-funds/id1392892554" first="Coin" />
       <RightSection productName="Kite Connect API" productDecription="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase." demoLink="https://zerodha.com/products/console" first="Kite Connect" imageUrl= "media\kiteconnect.png"/>
       <LeftSection imageUrl="media\varsity-products.svg" productName="Varsity mobile" productDecription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go." demoLink="" lernMoreLink="" getPlayStoreLink="https://play.google.com/store/apps/details?id=com.zerodha.varsity" getApplestoreLink="https://apps.apple.com/in/app/zerodha-varsity/id1474610753"/>
       <Universal/>
    </div>
  );
};

export default ProductPage;
