import React from "react";
import PageContent from "../layout/PageContent";
import Clients from "../components/Clients";
import Bestseller from "../components/Bestseller";
import ProductCardDetail from "../components/ProductCardDetail";
import ProductCardDetail2 from "../components/ProductCardDetail2";

function ProductDetail() {
  return (
    <>
      <PageContent>
        <ProductCardDetail />
        <ProductCardDetail2 />
        <Bestseller />
        <Clients />
      </PageContent>
    </>
  );
}

export default ProductDetail;
