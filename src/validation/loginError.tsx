import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email("E-mail inválido")
		.required("(Campo obrigatório)*"),
	password: Yup.string()
		.min(6, "Deve conter pelo menos 6 caracteres")
		.required("(Campo obrigatório)*"),
});
