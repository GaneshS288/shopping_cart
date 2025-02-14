import { useOutletContext } from "react-router-dom";
import HomeHeader from "./home_header/HomeHeader";

function Home() {
    const { username } = useOutletContext()
    return(
        <div>
            <HomeHeader userName={username} cartItemCount={2}></HomeHeader>
        </div>
    )
}

export default Home;