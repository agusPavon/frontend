//import Nav from "./Nav"
const Header = ({children}) => {

    return(
        <header className="user-info">
            {/* <Nav/> */}
            { children}
        </header>
    )
}

export default Header