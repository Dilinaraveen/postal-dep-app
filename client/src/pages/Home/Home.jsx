import React from "react";
import "../Home/home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Home = () => {
  return (
    <div className="home-container">
      <Carousel autoPlay>
        <div>
          <img src="https://slpost.gov.lk/wp-content/themes/Canvas/canvas/functions/thumb.php?src=wp-content/uploads/2015/04/speedpostcourire.jpg&w=940&h=350&zc=1&q=90" alt=''/>
        </div>
        <div>
          <img src="https://slpost.gov.lk/wp-content/themes/Canvas/canvas/functions/thumb.php?src=wp-content/uploads/2019/10/welcome_slider.png&w=940&h=350&zc=1&q=90" alt=''/>
        </div>
        <div>
          <img src="https://slpost.gov.lk/wp-content/themes/Canvas/canvas/functions/thumb.php?src=wp-content/uploads/2016/10/etelemail21.png&w=940&h=350&zc=1&q=90" alt=''/>
        </div>
        <div>
          <img src="https://slpost.gov.lk/wp-content/themes/Canvas/canvas/functions/thumb.php?src=wp-content/uploads/2020/05/1950.png&w=940&h=350&zc=1&q=90?1681629812952" alt=''/>
        </div>
      </Carousel>

      <div className="post-container">
        <div className="post-title">
          Call Centre Call Centre 1 2 3 4 5 Regulation made under Section 45
          (Chapter 190) of the Post office Ordinance All types of Money Orders
          issued with effect from 01/01/2019 to 31/12/2019-
        </div>
        <div className="post-date">Updated on 17-02-2023</div>
      </div>

      <div className="post-container">
        <div className="post-title">
          Acceptance of sea mail articles to Australia is resumed from
          01-12-2022
        </div>
        <div className="post-date">DPMG Operations -Updated on 20-11-2022</div>
      </div>

      <div className="post-container">
        <div className="post-title">
          Country specific list of prohibited and restricted articles -Click
          here to view
        </div>
        <div className="post-date">Updated on 28-11-2022</div>
      </div>

      <div className="post-container">
        <div className="post-title">
          Notice to the Public about the VAT policy revision to be implemented
          regarding postal shipments by the European Union (EU) on their member
          countries W.E.F 01.07.2021.
        </div>
        <div className="post-date">Updated on 28-11-2022</div>
      </div>
    </div>
  );
};

export default Home;
