import "./Home.css"
import SearchBar from "../../components/ui/SearchBar/SearchBar.jsx";

function Home() {
    return (
        <>
            <section className="outer-content-container home-page">
                <div className="inner-content-container">
                    <h1>ParkPal</h1>
                    <p>Find your favorite park by searching below</p>
                    <SearchBar/>
                </div>
            </section>
        </>
    )
}

export default Home