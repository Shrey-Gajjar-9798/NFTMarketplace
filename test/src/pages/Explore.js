import react from "react";
import CardList from "../components/CardList";
import { exploreList } from "../constants/MockupData";
import '../styles/Explore.css';
import Header from "../components/Header";
import Search from "../components/Search";
import SimpleImageSlider from "react-simple-image-slider";
const Explore = () => {

  const images = [
    { url: "https://images.unsplash.com/photo-1635237755468-5fba69c13f29?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { url: "https://images.unsplash.com/photo-1646463509175-8b080ab5e137?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { url: "https://images.unsplash.com/photo-1609726494499-27d3e942456c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { url: "https://images.unsplash.com/photo-1641580543317-4cea85891afe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { url: "https://images.unsplash.com/photo-1621932953986-15fcf084da0f?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];
  return (
    <div id="explore">
      <Header />
      <Search/>
      <div style={{backgroundColor:"black",width:"100%",height:"600px"}}>
      <SimpleImageSlider
      style={{objectFit:"cover !important"}}
        width={"100%"}
        height={"90%"}
        images={images}
        showBullets={true}
        autoPlayDelay= {3}
        showNavs={true}
        autoPlay= {true}
      /></div>
      <div id="list-container">
        <CardList list={exploreList} />
      </div>
    </div>
  );
};

export default Explore;
