import {useContext} from 'react'
import {UserContext} from '../context/UserContext'

const Home = () => {
    const {user, logout} = useContext(UserContext);
    return (
        <div className="home">
            <h2>홈</h2>
            <h4>{user.username}<br/><span>{user.email}</span></h4>
            <button onClick={logout} className="logout">Logout</button>
        </div>
    )
}

export default Home;
