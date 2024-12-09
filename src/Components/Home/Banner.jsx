import Marquee from "react-fast-marquee";
import bannerImage1 from './../../assets/banner1.png'
import bannerImage2 from './../../assets/banner2.png'
import bannerImage3 from './../../assets/banner3.png'
import bannerImage4 from './../../assets/banner4.png'
import bannerImage5 from './../../assets/banner5.png'
import bannerImage6 from './../../assets/banner6.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = ({highestRatedGames}) => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };
  return (
    <div>
      <section className="pt-7">
      <Slider {...settings}>
      <div>
      <div  className=" w-5/6 mx-auto">
            <img
              src={bannerImage1}
              className="w-full " />
          </div>
      </div>
      <div>
      <div  className=" w-5/6 mx-auto">
            <img
              src={bannerImage2}
              className="w-full " />
          </div>
      </div>
      <div>
      <div  className=" w-5/6 mx-auto">
            <img
              src={bannerImage3}
              className="w-full " />
          </div>
      </div>
      <div>
      <div className=" w-5/6 mx-auto">
            <img
              src={bannerImage4}
              className="w-full " />
          </div>
      </div>
      <div>
      <div  className=" w-5/6 mx-auto">
            <img
              src={bannerImage5}
              className="w-full " />
          </div>
      </div>
      <div>
      <div className=" w-5/6 mx-auto">
            <img
              src={bannerImage6}
              className="w-full " />
          </div>
      </div>
    </Slider>
        
          
          
          
        
      </section>
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Hot Games</h2>
        <div>
        <Marquee pauseOnHover={true} speed={50}>
          {highestRatedGames.map((brand) => (
            <img
              key={brand._id}
              src={brand.coverImage}
              alt=''
              className="h-20 mx-4"
            />
          ))}
        </Marquee>
        </div>
        
      </section>
    </div>
  );
};

export default Banner;