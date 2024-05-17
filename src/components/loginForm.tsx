import { Form, Formik, Field, ErrorMessage } from "formik";
import { LoginSchema } from "../validation/loginError";
import { useAuth } from "../hooks/useAuth";
import { LoginModel } from "../models/LoginModel";

const LoginForm = () => {
	const { login } = useAuth();

	const handleSubmit = async (values: LoginModel) => {
		if (values.email && values.password) {
			await login(values.email, values.password);
		}
	};

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			validationSchema={LoginSchema}
			onSubmit={handleSubmit}
		>
			<Form className="w-full flex flex-col h-full justify-around">
				<div className="flex flex-col ">
					<div className="flex flex-row items-center gap-2">
						<label htmlFor="email" className="font-bold text-lg">
							E-mail
						</label>
						<ErrorMessage name="email" />
					</div>
					<Field
						type="email"
						name="email"
						id="email"
						placeholder="@gmail.com"
						className="bg-[#F1F1F1] px-4 h-[54.25px] rounded-lg gap-3 p-[18px, 18px, 20.25px, 18px]"
					/>
				</div>
				<div className="flex flex-col">
					<div className="flex flex-row items-center gap-2">
						<label htmlFor="password" className="font-bold text-lg">
							Password
						</label>
						<ErrorMessage name="password" />
					</div>
					<Field
						type="password"
						name="password"
						id="password"
						placeholder="**********"
						className="bg-[#F1F1F1] px-4 h-[54.25px] rounded-lg gap-3 p-[18px, 18px, 20.25px, 18px]"
					/>
				</div>
				<button
					type="submit"
					className="bg-[#02274F] text-white font-bold rounded-lg h-14"
				>
					Sign In
				</button>
			</Form>
		</Formik>
	);
};

export default LoginForm;
