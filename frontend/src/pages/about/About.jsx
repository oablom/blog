import React from "react";
import "./styling/about.css";

const AboutPage = () => {
  return (
    <div className="aboutPage">
      <h1 className="aboutTitle">About Me</h1>
      <div className="aboutContent">
        <img
          src="https://media.licdn.com/dms/image/D4D03AQH6fXY_12gpIQ/profile-displayphoto-shrink_800_800/0/1683018554093?e=1720051200&v=beta&t=BdoxzBpJ22ozXeH9Y2jqR5tpiBQe_b0cPzowxpBjP-o"
          alt="Picture of me"
          className="aboutImage"
        />
        <div className="aboutDetails">
          <h2>Oa Blom</h2>
          <p>
            Full-stack web development student. M.Sc. in sports medicine,
            martial arts instructor, and certified medical massage therapist.
          </p>
          <p>
            I'm passionate about combining technology with health and fitness to
            create innovative solutions that improve people's lives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
