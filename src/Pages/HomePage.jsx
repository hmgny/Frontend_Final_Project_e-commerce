import React from "react";
import PageContent from "../layout/PageContent";
import Slider from "../components/Slider";
import Category from "../components/Category";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
import HomeContainer from "../components/HomeContainer";
import CardBlog from "../components/CardBlog";

function HomePage() {
  return (
    <>
      <PageContent>
        <Slider></Slider>
        <Category></Category>
        <ProductCard></ProductCard>
        <Carousel></Carousel>
        <HomeContainer></HomeContainer>
        <CardBlog></CardBlog>
      </PageContent>
    </>
  );
}

export default HomePage;
