import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/loginForm";
import logo from "../../assets/LOGOTIPO 1.svg";
import { useAuth } from "../../hooks/useAuth";

const Inicio = () => {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/profile");
		}
	}, [isAuthenticated, navigate]);

	return (
		<div className="h-screen w-full flex flex-col justify-center items-center">
			<div className="w-[438px] h-[534px] flex flex-col bg-white rounded-[18px] items-center p-10 shadow-[rgba(0,_0,_0,_0.3)_0px_20px_60px]">
				<img src={logo} className="mb-6 mt-6 w-[80%]" />
				<LoginForm />
			</div>
		</div>
	);
};

export default Inicio;
