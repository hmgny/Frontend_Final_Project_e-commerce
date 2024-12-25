import React from "react";
import PageContent from "../layout/PageContent";
import Slider from "../components/Slider";
import Category from "../components/Category";
import Bestseller from "../components/Bestseller";
import Carousel from "../components/Carousel";
import HomeContainer from "../components/HomeContainer";
import CardBlog from "../components/CardBlog";

function HomePage() {
  return (
    <>
      <PageContent>
        <Slider></Slider>
        <Category></Category>
        <Bestseller></Bestseller>
        <Carousel></Carousel>
        <HomeContainer></HomeContainer>
        <CardBlog></CardBlog>
      </PageContent>
    </>
  );
}

export default HomePage;
