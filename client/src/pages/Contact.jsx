import React from 'react'
import ContactMessage from '../components/Static/ContactMessage/ContactMessage'

const Contact = () => {
  return (
    <>
      <div className="d-flex mt-5 justify-content-center ">
        <h6>
          
          <i className="fa-solid fa-phone ms-3"></i> Emergency Call: 8853260723
        </h6>
        <h6>
        
          <i className="fa-solid fa-clock ms-3"></i> 10:00AM to 10:00PM
        </h6>
        <h6>
        
          <i className="fa-solid fa-envelope ms-3"></i>help@princecarehub.com
        </h6>
        
      </div>
      <ContactMessage/>
    </>
  )
}

export default Contact
