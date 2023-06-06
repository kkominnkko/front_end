import { useContext, useState, useEffect } from "react";
import useValueSaver from "~/CustomHooks/useValueSaver";
import sendRequest from "./sendRequest";
import { UrlContext } from "~/App";
import "~/index.css";
import "./Filter.css";

const SectionContainer = (props) => {
	const [isCollapsed, setCollapse] = useState(false);

	const onClickHandle = function () {
		setCollapse((isCollapsed) => !isCollapsed);
	};

	return (
		<div className="section-container" style={{ maxHeight: isCollapsed ? "60px" : "600px" }}>
			<button className="collapse-button container" onClick={onClickHandle}>
				{props.heading}
				<div className="img" style={{ transform: isCollapsed ? "rotate(180deg)" : "" }}></div>
			</button>
			{props.children}
		</div>
	);
};

const SearchSection = ({ heading, setState, name }) => {
	return (
		<SectionContainer heading={heading}>
			<input type="search" name={name} onChange={setState} placeholder="Пошук..." />
		</SectionContainer>
	);
};

const articlesInitialState = {
	name: "",
};

const ArticlesFilter = ({ setFiltered }) => {
	const apiRootUrl = useContext(UrlContext);
	const [submit, setSubmit] = useState();
	const [filter, setFilterValue] = useValueSaver(articlesInitialState);

	const onSubmitHandle = (event) => {
		event.preventDefault();
		setSubmit(filter);
	};

	useEffect(
		() =>
			submit
				? sendRequest(null, apiRootUrl + "articles/name/" + filter.name, "GET")
						.then(setFiltered)
						.catch(console.error)
				: null,
		[submit]
	);

	return (
		<form className="filter-container" onSubmit={onSubmitHandle}>
			<button className="sign-up-button" style={{ marginTop: "15px" }}>
				Шукати
			</button>
			<SearchSection setState={setFilterValue} name="name" heading="Назва статті" />
		</form>
	);
};

export { ArticlesFilter };
