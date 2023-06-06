import React from "react";
import { Link } from "react-router-dom";
import useToken from "~/CustomHooks/useToken";
import "~/index.css";
import "./Header.css";

const NavigationBar = () => {
	const [token, setToken] = useToken();

	return (
		<nav className="header-nav container">
			<Link to="/articles">Статті</Link>
			<Link to="/articles">Створити статтю</Link>
			<Link to="/articles">Найкращі статті</Link>
			{!token ? (
				<>
					<Link to="/sign-in" className="sign-in-button">
						Увійти
					</Link>
					<Link to="/sign-up" className="sign-up-button">
						Зареєструватися
					</Link>
				</>
			) : (
				<div>
					<div className="user-info" style={{ display: "block" }}>
						{token.email}
					</div>
					<button className="sign-out-button" onClick={() => setToken(null)}>
						Вийти
					</button>
				</div>
			)}
		</nav>
	);
};

const Header = () => {
	return (
		<header id="header" className="header-container">
			<Link to="/" className="logo-container">
				<div className="img logo"></div>
				<div className="logo-text">
					<span>e</span>mark
				</div>
			</Link>
			<NavigationBar />
		</header>
	);
};

export default Header;
