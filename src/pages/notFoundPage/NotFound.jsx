import { Link } from "react-router-dom";
import "./NotFound.module.scss"

const NotFound = () => {
    return (
        <main className="page404">
            <h1>404</h1>
            <p>Эта страница не найдена</p>
            <Link to="/" className="back-home">
                Вернуться на главную
            </Link>
        </main>
    );
};

export default NotFound;