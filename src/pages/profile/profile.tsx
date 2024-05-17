import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Profile = () => {
	const { isAuthenticated, logout } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const [user, setUser] = useState(location.state?.user || null);

	useEffect(() => {
		if (!user) {
			const storedUser = localStorage.getItem("@user");
			if (storedUser) {
				setUser(JSON.parse(storedUser));
			} else {
				navigate("/");
			}
		}
	}, [user, navigate]);

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/");
		}
	}, [isAuthenticated, navigate]);

	return (
		<>
			<div className="pt-20 h-screen w-full flex flex-col justify-center items-center bg-[#F1F5F9]">
				<header className="w-full h-16 flex items-center justify-end px-6 fixed top-0 z-10 bg-white shadow-md">
					<button
						type="button"
						onClick={logout}
						className="w-[150px] bg-[#02274F] text-white font-bold rounded-lg h-10 px-4"
					>
						Logout
					</button>
				</header>
				{user ? (
					<>
						<div className="w-[356px] flex flex-col bg-white rounded-[18px] items-center p-10 shadow-lg">
							<div className="flex flex-col items-center mb-4">
								<h1 className="text-lg mb-2">
									Profile picture
								</h1>
								<img
									src={user.avatar.low}
									alt="Profile"
									className="w-[58px] h-[56px] rounded-lg"
								/>
							</div>
							<div className="flex flex-col space-y-6 w-full">
								<div>
									<label className="block text-sm mb-2">
										Your{" "}
										<span className="font-bold">Name</span>
									</label>
									<div className="bg-[#F4F4F4] text-gray-900 p-4 rounded-lg">
										{user.name}
									</div>
								</div>
								<div>
									<label className="block text-sm  mb-2">
										Your{" "}
										<span className="font-bold">
											E-mail
										</span>
									</label>
									<div className="bg-[#F4F4F4] text-gray-900 p-4 rounded-lg">
										{user.email}
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					<p>Carregando...</p>
				)}
			</div>
		</>
	);
};

export default Profile;
