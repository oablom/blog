import Posts from "@/components/posts/Posts";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";
import "./styling/home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await axios.get(
        "http://localhost:5000/api/posts" + search
      );
      console.log(fetchedPosts.data);
      setPosts(fetchedPosts.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="homeContainer">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
