import { Link } from "react-router-dom";
import DiaryCardList from '../components/DiaryCardList';

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
        <DiaryCardList />
    </>
    );
}

export default Home;