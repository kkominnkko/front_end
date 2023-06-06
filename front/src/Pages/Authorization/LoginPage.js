import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useValueSaver from "~/CustomHooks/useValueSaver";
import useToken from "~/CustomHooks/useToken";
import sendRequest from "~/Common/sendRequest";
import { UrlContext } from "~/App";
import Header from "~/Common/Header";
import Heading from "~/Common/Title";
import "~/index.css";
import "./Authorization.css";

const initialState = {
	email: "",
	password: "",
};

const LoginForm = () => {
	const navigate = useNavigate();
	const [fields, setValue] = useValueSaver(initialState);
	const [token, setToken] = useToken();
	const apiRequestUrl = useContext(UrlContext) + "users/authenticate";

	useEffect(() => {
		if (token) navigate("/", { replace: true });
	}, [token]);

	const onSubmitHandle = async (event) => {
		event.preventDefault();

		await sendRequest(
			{
				email: fields.email,
				password: fields.password,
			},
			apiRequestUrl,
			"POST"
		)
			.then(setToken)
			.catch(console.error);
	};

	return (
		<form className="form-container" onSubmit={onSubmitHandle}>
			<input value={fields.email} onChange={setValue} name="email" type="email" placeholder="Введіть пошту" required />
			<input value={fields.password} onChange={setValue} name="password" type="password" placeholder="Введіть пароль" required />
			<button className="sign-in-button" type="submit">
				Увійти
			</button>
			<Link to="/sign-up" className="link">
				Ще не зареєструвалися?
			</Link>
		</form>
	);
};

const LoginPage = () => {
	return (
		<>
			<Header />
			<Heading>Вхід</Heading>
			<LoginForm />
		</>
	);
};

export default LoginPage;
