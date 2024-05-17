import axios from "axios";

export const profileApi = axios.create({
	baseURL: "https://api.homologation.cliqdrive.com.br",
});