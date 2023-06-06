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
	firstName: "",
	lastName: "",
	password: "",
};

const RegistrationForm = () => {
	const navigate = useNavigate();
	const [fields, setValue] = useValueSaver(initialState);
	const [token, setToken] = useToken();
	const apiRequestUrl = useContext(UrlContext) + "users/register";

	useEffect(() => {
		if (token) navigate("/", { replace: true });
	}, [token]);

	const onSubmitHandle = async (event) => {
		event.preventDefault();

		await sendRequest(
			{
				email: fields.email,
				password: fields.password,
				firstName: fields.firstName,
				lastName: fields.lastName,
			},
			apiRequestUrl,
			"POST"
		)
			.then(setToken)
			.catch(console.error);
	};

	const passwordRegExp = "^(?=.*[a-z])(?=.*[A-Z])(?!=.*s).*$",
		passwordMinLength = 6,
		passwordMaxLenght = 32,
		passwordTitle = `Будь ласка, введіть хоча б 1 символ верхнього регістру, 1 символ нижнього регістру та 1 цифру. 
							Пароль також повинен містити від ${passwordMinLength} до ${passwordMaxLenght} символів
							і не повинен містити пробілів`;
	return (
		<form className="form-container" onSubmit={onSubmitHandle}>
			<div className="container">
				<input value={fields.email} onChange={setValue} name="email" type="email" placeholder="Введіть пошту" required />
				<input
					value={fields.password}
					onChange={setValue}
					name="password"
					type="password"
					placeholder="Введіть пароль"
					pattern={passwordRegExp}
					title={passwordTitle}
					minLength={passwordMinLength}
					maxLength={passwordMaxLenght}
				/>
				<input
					name="password"
					type="password"
					placeholder="Повторіть пароль"
					pattern={passwordRegExp}
					title={passwordTitle}
					minLength={passwordMinLength}
					maxLength={passwordMaxLenght}
				/>
			</div>
			<button className="sign-up-button">Зареєструватися</button>
			<Link to="/sign-in" className="link">
				Вже маєте акаунт?
			</Link>
		</form>
	);
};

const RegistrationPage = () => {
	return (
		<>
			<Header />
			<Heading>Реєстрація</Heading>
			<RegistrationForm />
		</>
	);
};

export default RegistrationPage;
