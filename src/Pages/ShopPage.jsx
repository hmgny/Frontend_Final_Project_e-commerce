import React from "react";
import PageContent from "../layout/PageContent";
import ShopCategory from "../components/shopCategory";
import ShopFilter from "../components/ShopFilter";
import ShopCard from "../components/ShopCard";
import Clients from "../components/Clients";

function ShopPage() {
  return (
    <>
      <PageContent>
        <ShopCategory />
        <ShopFilter />
        <ShopCard />
        <Clients />
      </PageContent>
    </>
  );
}

export default ShopPage;
