import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UrlContext } from "~/App";
import useToken from "~/CustomHooks/useToken";
import sendRequest from "~/Common/sendRequest";
import Header from "~/Common/Header.js";
import Heading from "~/Common/Title.js";
import { ArticlesFilter } from "~/Common/Filter";
import "~/index.css";
import "./Articles.css";

const ArticleCard = (props) => {
	const backgroundImage = { backgroundImage: `url(/images/${props.image})` };

	return (
		<div className="card-container img" style={backgroundImage}>
			<Link className="author" to={`/articles/author/${props.authorId}`}>
				Автор: user@example.com
			</Link>
			<Link to={"/articles/" + props.articleId} className="card-heading">
				{props.heading}
			</Link>
			{props.rating != null ? (
				<div className="rating-container">
					<div className="stars" style={{ "--rating": props.rating }}>
						{/*[1, 2, 3, 4, 5].map((n) => (
						<button className="star" key={n}></button>
					))*/}
					</div>
					{props.rating}
				</div>
			) : null}
		</div>
	);
};

const ArticlesCatalog = () => {
	const [articles, setArticles] = useState([]);

	const rootRequestUrl = useContext(UrlContext);
	const [token] = useToken();

	const apiRequestUrl = rootRequestUrl + "articles";

	useEffect(() => {
		sendRequest(null, apiRequestUrl, "GET").then(setArticles).catch(console.error);
	}, []);

	return (
		<>
			<ArticlesFilter />
			<div className="cards-container">
				{Array.isArray(articles) && articles.length > 0
					? articles.map((r, index) => (
							<ArticleCard
								key={r.article_id}
								articleId={r.article_id}
								heading={r.title}
								image={`photo_${index}.jpg`}
								authorId={r.user_id}
								rating={token ? (Math.random() * 3 + 2).toFixed(2) : null}
							/>
					  ))
					: null}
			</div>
		</>
	);
};

const ArticlesCatalogPage = () => {
	return (
		<>
			<Header />
			<Heading>Статті</Heading>
			<div className="page-content filter-contained">
				<ArticlesCatalog />
			</div>
		</>
	);
};

export default ArticlesCatalogPage;
export { ArticlesCatalog };
