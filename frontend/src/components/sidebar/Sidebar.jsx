import "./styling/sidebar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://media.licdn.com/dms/image/D4D03AQH6fXY_12gpIQ/profile-displayphoto-shrink_800_800/0/1683018554093?e=1720051200&v=beta&t=BdoxzBpJ22ozXeH9Y2jqR5tpiBQe_b0cPzowxpBjP-o"
          alt="Picture of me"
        />

        <p>
          <span className="oaBlom">Oa Blom</span> <br />
          Fullstack web development student. M.Sc. in Sports Medicine
          (idrottsfysiolog), martial arts instructor and certified medical
          massage therapist.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {categories.map((cat) => (
            <li className="sidebarListItem" key={cat._id}>
              <Link className="link" to={`/posts?cat=${cat.name}`}>
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
