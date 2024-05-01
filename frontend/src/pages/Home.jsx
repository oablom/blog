import Posts from "../components/posts/Posts";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="homeContainer">
        <Posts />
        <Sidebar />
      </div>
    </>
  );
}
