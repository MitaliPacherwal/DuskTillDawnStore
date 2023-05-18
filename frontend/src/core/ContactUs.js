import React, { useState } from 'react';


function ContactUs() {

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [message, setMessage] = useState('');


  const handleNameChange = (e) => {

    setName(e.target.value);

  };


  const handleEmailChange = (e) => {

    setEmail(e.target.value);

  };


  const handleMessageChange = (e) => {

    setMessage(e.target.value);

  };
  const onSubmit =(e)=>{
    alert("We will get back to you as soon as possible.Thank you")
  }


  const handleSubmit = (e) => {

    e.preventDefault();


    // Handle form submission logic here, e.g., send an API request


    // Clear form fields

    setName('');

    setEmail('');

    setMessage('');

  };


  return (

    <div style={{textAlign:"center"}}>

      <h1><b>Contact Us</b></h1>

      <form onSubmit={handleSubmit}>

        <div>

          <label style={{marginRight: "40px"}}>Name:</label>

          <input type="text" value={name} onChange={handleNameChange} />

        </div>

        <div>

          <label style={{marginRight: "45px"}}>Email:</label>

          <input type="email" value={email} onChange={handleEmailChange} />

        </div>

        <div>

          <label style={{marginRight: "4px"}}>Message:</label>

          <textarea value={message} onChange={handleMessageChange}></textarea>

        </div>

        <button onClick={onSubmit} className="btn btn-primary">
          Submit
          </button>
      </form>

    </div>

  );

}


export default ContactUs;




