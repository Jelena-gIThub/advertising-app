import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";

function Explore() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Oglašavanje nekretnina</p>
      </header>
      <main>
        <Slider />

        <p className="exploreCategoryHeading">Kategorije</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img
              src={rentCategoryImage}
              alt="iznajmljivanje"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Najam nekretnina</p>
          </Link>
          <Link to="/category/sale">
            <img
              src={sellCategoryImage}
              alt="prodaja"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Prodaja nekretnina</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
