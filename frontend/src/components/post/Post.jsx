import { Link } from "react-router-dom";
import "./styling/post.css";

export default function Post({ post }) {
  const publicFolder = "http://localhost:5000/images/";

  return (
    <Link to={`/post/${post._id}`} className="link">
      <div className="post">
        <img
          className="postImg"
          src={
            post.photo
              ? publicFolder + post.photo
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbudhE7sqEe9E4XoW5UUZ-6ci3QCF0ED9DOmXb8W26bA&s"
          }
          alt="Blog post image"
        />
        <div className="postInfo">
          <div className="postCats">
            {post.categories.map((category) => (
              <span className="postCat">{category.name}</span>
            ))}
          </div>

          <span className="postTitle">{post.title}</span>
          <hr />
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <p className="postDesc">{post.desc}</p>
      </div>
    </Link>
  );
}
