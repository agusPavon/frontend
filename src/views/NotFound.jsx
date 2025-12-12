import { Link } from 'react-router-dom'

const NotFound = () => {

    return (
        <main className="container">
            <h1> Error 404 | No encontramos esta página 😥</h1>
            <Link to='/'> Ir al Inicio </Link>
        </main>
    )
}

export default NotFound