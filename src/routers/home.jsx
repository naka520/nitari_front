import { Link } from "react-router-dom";

function Home() {
    return(
    <>
        <h2>home</h2>
        <div>
            <Link to="/home">Home</Link>
        </div>
        <div>
            <Link to="/">Login</Link>
        </div>
    </>
    );
}

export default Home;