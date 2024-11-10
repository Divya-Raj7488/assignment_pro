import "./styles/homepage.css";
import Nav from "./components/nav";
import "./styles/homepage.css";

export default function Home() {
  return (
    <main className="homepage">
      <nav className="nav">
        <Nav />
      </nav>
      <div className="pageData">
        <div className="verticalNav"></div>
        <div className="songList"></div>
        <div className="currentPlaying"></div>
      </div>
    </main>
  );
}
