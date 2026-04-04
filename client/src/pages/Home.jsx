import Slider from "../components/Slider_temp/Slider1";
import ContactMessage from "../components/Static/ContactMessage/ContactMessage";
import Facility from "../components/Static/Facility/Facility";
import PatentReviews from "../components/Static/PatentReviews/PatentReviews";
import ShortIntro from "../components/Static/ShortIntro/ShortIntro";
import WhyChoose from "../components/Static/WhyChoose/WhyChoose";

const Home = () => {
  return (
    <>
      {/* //slider  */}
      <Slider />
      {/* Facility  */}
      <Facility />
      {/* ShortIntro hospital  */}
      <ShortIntro />

      {/* Why choose  */}
      <WhyChoose />
      {/* testimonial  */}
      <PatentReviews />
      {/* contact message  */}
      <ContactMessage />
    </>
  );
};

export default Home;
