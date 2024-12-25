import { Link } from "react-router-dom";
import "./Menu.module.scss";

const Menu = () => {
    return (
        <header className="menu">
            <div className="logo">
                <Link to="/" className="flashlingua-logo">
                    FlashLingua
                </Link>
            </div>
            <nav>
                <ul className="menu-links">
                    <li>
                        <Link to="/">Главная</Link>
                    </li>
                    <li>
                        <Link to="/game">Карточки слов</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Menu;