import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginModel } from "../models/LoginModel";
import { profileApi } from "../services/apiService";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

interface AuthContextModel extends LoginModel {
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<string | void>;
	logout: () => void;
}

export const AuthContext = createContext({} as AuthContextModel);

interface Props {
	children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
	const [loginData, setLoginData] = useState<LoginModel>();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		const user: LoginModel = JSON.parse(
			localStorage.getItem("@user") || "{}"
		);
		if (user.id) {
			setLoginData(user);
			setIsAuthenticated(true);
		}
	}, []);

	useEffect(() => {
		const requestInterceptor = axios.interceptors.request.use(
			(config) => {
				const accessToken = localStorage.getItem("@accessToken");
				if (accessToken) {
					config.headers.Authorization = `Bearer ${accessToken}`;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		return () => {
			axios.interceptors.request.eject(requestInterceptor);
		};
	}, []);

	useEffect(() => {
		const responseInterceptor = axios.interceptors.response.use(
			(response) => {
				return response;
			},
			(error: AxiosError) => {
				if (error.response?.status === 401) {
					console.error("Erro 401: Token expirado ou inválido.");
				}
				return Promise.reject(error);
			}
		);

		return () => {
			axios.interceptors.response.eject(responseInterceptor);
		};
	}, []);

	const login: AuthContextModel["login"] = useCallback(
		async (email, password) => {
			try {
				const credentials = await toast.promise(
					profileApi.post(
						"auth/login/",
						{ email, password },
						{
							headers: {
								Accept: "application/json;version=v1_web",
							},
						}
					),
					{
						loading: "Verificando credenciais...",
						success: "Credenciais verificadas",
						error: "Usuário e/ou senha incorreto(s)",
					}
				);

				const { tokens } = credentials.data;

				const dataUser = await toast.promise(
					profileApi.post(
						"auth/login/",
						{ email, password },
						{
							headers: {
								Accept: "application/json;version=v1_web",
								Authorization: `Bearer ${tokens.access}`,
							},
						}
					),
					{
						loading: "Autenticando...",
						success: "Login bem-sucedido!",
						error: "Erro ao autenticar com o token",
					}
				);

				const { user } = dataUser.data;

				localStorage.setItem("@user", JSON.stringify(user));
				localStorage.setItem("@refreshToken", tokens.refresh);
				localStorage.setItem("@accessToken", tokens.access);

				setLoginData(user);
				setIsAuthenticated(true);

				console.log(
					"Dados do usuário e tokens armazenados no local storage."
				);
				navigate("/profile", { state: { user } });
			} catch (error) {
				console.error("Erro ao fazer login:", error);
			}
		},
		[navigate]
	);

	const logout: AuthContextModel["logout"] = useCallback(() => {
		localStorage.removeItem("@user");
		localStorage.removeItem("@refreshToken");
		localStorage.removeItem("@accessToken");
		setLoginData(undefined);
		setIsAuthenticated(false);
		navigate("/");
	}, [navigate]);

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, ...loginData, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
