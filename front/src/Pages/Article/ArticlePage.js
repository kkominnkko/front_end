import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UrlContext } from "~/App";
import sendRequest from "~/Common/sendRequest";
import ParagraphWithNewLines from "~/Common/ParagraphWithNewLines";
import { Link } from "react-router-dom";
import Header from "~/Common/Header.js";
import useToken from "~/CustomHooks/useToken";
import "~/index.css";
import "~/Common/Individual.css";

const Article = (props) => {
	const [token] = useToken();

	const backgroundImage = {
		backgroundImage: `url(/images/photo_${props.articleId}.jpg)`,
	};

	return (
		<div className="individual-page">
			<div className="main-img" style={backgroundImage}></div>
			<h1>{props.heading}</h1>
			<div style={{ width: "100%", textAlign: "center" }}>
				<Link className="author" to={`/articles/author/${props.authorId}`}>
					Автор: user@example.com
				</Link>
			</div>
			{props.rating ? (
				<div className="rating-container">
					<div className="stars" style={{ "--rating": props.rating }}>
						{/*[1, 2, 3, 4, 5].map((n) => (
						<button className="star" key={n}></button>
					))*/}
					</div>
					{props.rating}
				</div>
			) : null}
			<ParagraphWithNewLines className="description" text={props.content} />
			<div className="main-img" style={backgroundImage}></div>
		</div>
	);
};

const ArticlePage = () => {
	const { articleId } = useParams();
	const [article, setArticle] = useState();
	const [token] = useToken();
	const apiRequestUrl = useContext(UrlContext) + "articles/" + articleId;

	useEffect(() => sendRequest(null, apiRequestUrl, "GET").then(setArticle).catch(console.error), []);

	return (
		<>
			<Header />
			<div className="img waves-background"></div>
			{article ? (
				<Article
					articleId={article.article_id}
					heading={article.title}
					image={article.image}
					authorId={article.authorId}
					rating={token ? (Math.random() * 3 + 2).toFixed(2) : null}
					content={article.content}
				/>
			) : null}
		</>
	);
};

export default ArticlePage;
