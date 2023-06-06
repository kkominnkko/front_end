import React, { createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

import PrivateRoute from "~/Common/PrivateRoute";

import HomePage from "~/Pages/Home/HomePage";
import RecipesCatalogPage from "~/Pages/ArticleCatalog/ArticleCatalogPage";
import RecipePage from "~/Pages/Article/ArticlePage";
import RegistrationPage from "~/Pages/Authorization/RegistrationPage";
import LoginPage from "~/Pages/Authorization/LoginPage";
import NotFoundPage from "~/Pages/NotFound/NotFoundPage";

const apiUrl = "http://localhost:5000/api/";
const UrlContext = createContext(apiUrl);

const App = () => {
	return (
		<UrlContext.Provider value={apiUrl}>
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/articles" element={<RecipesCatalogPage />} />
					<Route path="/articles/:articleId" element={<RecipePage />} />
					<Route path="/sign-up" element={<RegistrationPage />} />
					<Route path="/sign-in" element={<LoginPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Router>
		</UrlContext.Provider>
	);
};

export default App;
export { UrlContext };
