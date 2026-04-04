import Carousel from "react-bootstrap/Carousel";

const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          style={{ height: "500px" }}
          className="d-block w-100"
          src="sliders.png"
          alt="First slide"
        />

        <Carousel.Caption>
          <h3></h3>
          <p>Welcome to Hospital</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          style={{ height: "500px" }}
          className="d-block w-100"
          src="sliders1.png"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3></h3>
          <p>Find Doctors</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          style={{ height: "500px" }}
          className="d-block w-100"
          src="sliders2.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3></h3>
          <p>Book Appointments</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
