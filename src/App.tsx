import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import Inicio from "./pages/Inicio/inicio";
import Profile from "./pages/profile/profile";

export default function App() {
	const { isAuthenticated } = useAuth();

	return (
		<Routes>
			<Route path="/" element={<Inicio />} />
			<Route
				path=""
				element={
					isAuthenticated ? (
						<PrivateRoutes />
					) : (
						<Navigate to="/" />
					)
				}
			>
				<Route path="/profile" element={<Profile />} />
			</Route>
		</Routes>
	);
}
