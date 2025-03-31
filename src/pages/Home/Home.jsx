import "./Home.css"
import HomeBackground from "/public/home-background.webp"
import SearchBar from "../../components/ui/SearchBar/SearchBar.jsx";

function Home() {
    return (
        <>
            <section className="outer-content-container home-page">
                <div className="inner-content-container">
                    <h1>ParkPal</h1>
                    <p>Home</p>
                    <SearchBar/>
                </div>
            </section>
        </>
    )
}

export default Home