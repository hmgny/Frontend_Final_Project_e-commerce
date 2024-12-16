import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const PageContent = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header /> {/* Header Bileşeni */}
      <main className="flex-1">{children}</main>{" "}
      {/* Sayfa içeriği buraya gelecek */}
      <Footer /> {/* Footer Bileşeni */}
    </div>
  );
};

export default PageContent;
