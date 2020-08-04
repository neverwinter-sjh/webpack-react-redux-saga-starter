import React from 'react';
import Ryan from 'assets/images/ryan.png';

const About = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <p>메인 페이지입니다.</p>
      <p>
        <img src={Ryan} alt="" width="150" /><br />
        <img src={process.env.PUBLIC_URL + "/assets/images/logo192.png"} alt="" width="150" />
      </p>
    </div>
  );
};

export default About;