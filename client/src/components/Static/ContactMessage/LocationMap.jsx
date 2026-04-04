import React from 'react'
import './ContactMessage.css'

const LocationMap = () => {
  return (
    <>
    <div className="location-map">
     <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d2116682.56188993!2d81.0429261610349!3d26.855233846074782!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1767545041357!5m2!1sen!2sin" width={"100%"} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
     </div>

    </>
  ) 
}

export default LocationMap
