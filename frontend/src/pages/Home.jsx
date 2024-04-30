import Posts from "../components/posts/Posts";
import Sidebar from "../components/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="home">
      Homepage
      <div className="homeContainer">
        <Posts />
        <Sidebar />
      </div>
    </div>
  );
}
