import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />

        <div className="home__row">
          <Product
            id="12345"
            title="The Lean StartUp"
            price={19.99}
            image="https://m.media-amazon.com/images/I/81jgCiNJPUL._AC_UY218_.jpg"
            rating={5}
          />

          <Product
            id="78439"
            title="Apple iPad (10.2-inch, Wi-Fi + Cellular, 32GB) - Space Grey (Previous Model, 7th Generation)"
            price={449.99}
            image="https://m.media-amazon.com/images/I/61hjzGugXhL._AC_UY218_.jpg"
            rating={5}
          />
        </div>

        <div className="home__row">
          <Product
            id="36482"
            title="Echo Dot (3rd Gen) - Smart speaker with Alexa - Charcoal Fabric"
            price={9.99}
            image="https://m.media-amazon.com/images/I/61u48FEs0rL._AC_UY218_.jpg"
            rating={4}
          />

          <Product
            id="35790"
            title="EA Sports Fifa 21 500GB PS4 Console + Second DualShock 4 Wireless Controller Bundle (PS4)"
            price={279.99}
            image="https://m.media-amazon.com/images/I/91CcqqmNNEL._AC_UY218_.jpg"
            rating={5}
          />

          <Product
            id="24680"
            title="Ninja Blender with Auto-iQ (BN495UK) 1000 W, 2 x 700 ml Cups, Black/Silver"
            price={69.99}
            image="https://m.media-amazon.com/images/I/71y-m84yzpL._AC_UY218_.jpg"
            rating={5}
          />
        </div>

        <div className="home__row">
          <Product
            id="67890"
            title="Sony Bravia KDL43WF663 43-Inch Full HD HDR Smart TV with Freeview Play, Black [Energy Class A+]"
            price={375.99}
            image="https://m.media-amazon.com/images/I/71Tq9aaZciL._AC_UL320_.jpg"
            rating={4}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
