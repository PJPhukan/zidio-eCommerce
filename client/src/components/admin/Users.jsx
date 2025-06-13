import  { useEffect,  useState } from "react";
import PageTobLabel from "./PageTobLabel";
import {  FaSearch, FaStar } from "react-icons/fa";
import { TiUser } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
const usersData = [
	{
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		phone: "1234567890",
		role: "Owner",
		avatar: "https://i.pravatar.cc/40",
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "jane@example.com",
		phone: "9876543210",
		role: "Member",
		avatar: "https://i.pravatar.cc/40",
	},
	{
		id: 3,
		name: "Alice Johnson",
		email: "alice@example.com",
		phone: "5551234567",
		role: "Member",
		avatar: "https://i.pravatar.cc/40",
	},
	{
		id: 4,
		name: "Alice Johnson",
		email: "alice@example.com",
		phone: "5551234567",
		role: "Member",
		avatar: "https://i.pravatar.cc/40",
	},
	{
		id: 5,
		name: "Alice Johnson",
		email: "alice@example.com",
		phone: "5551234567",
		role: "Member",
		avatar: "https://i.pravatar.cc/40",
	},
	{
		id: 6,
		name: "Alice Johnson",
		email: "alice@example.com",
		phone: "5551234567",
		role: "Member",
		avatar: "https://i.pravatar.cc/40",
	},
	{
		id: 7,
		name: "Alice Johnson",
		email: "alice@example.com",
		phone: "5551234567",
		role: "Member",
		avatar: "https://i.pravatar.cc/40",
	},
	{
		id: 8,
		name: "Alice Johnson",
		email: "alice@example.com",
		phone: "5551234567",
		role: "Member",
		avatar: "https://i.pravatar.cc/40",
	},
	{
		id: 9,
		name: "Alice Johnson",
		email: "alice@example.com",
		phone: "5551234567",
		role: "Member",
		avatar: "https://i.pravatar.cc/40",
	},
	{
		id: 10,
		name: "Alice Johnson",
		email: "alice@example.com",
		phone: "5551234567",
		role: "Member",
		avatar: "https://i.pravatar.cc/40",
	},
	{
		id: 11,
		name: "Alice Johnson",
		email: "alice@example.com",
		phone: "5551234567",
		role: "Member",
		avatar: "https://i.pravatar.cc/40",
	},
];

const Users = () => {
	const [sortKey, setSortKey] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [users, setUsers] = useState(usersData);
	const [activeUserId, setActiveUserId] = useState(null);
	const [selectedRole, setSelectedRole] = useState("");
	const [applyToAll, setApplyToAll] = useState(false);

	const itemsPerPage = 7;

	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery, sortKey]);

	const filterUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const totalPages = Math.ceil(filterUsers.length / itemsPerPage);
	const paginatedUsers = filterUsers.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const handlePermissionChange = (id) => {
		if (applyToAll) {
			setUsers((prev) =>
				prev.map((user) =>
					user.role !== "Owner"
						? { ...user, role: selectedRole }
						: user
				)
			);
		} else {
			setUsers((prev) =>
				prev.map((user) =>
					user.id === id ? { ...user, role: selectedRole } : user
				)
			);
		}
		setActiveUserId(null);
		setApplyToAll(false);
	};

	return (
		<div className="py-2 md:py-4">
			<PageTobLabel
				label="Let's drive in and manage your partners permissions!"
				name="Mr. Jack"
				page="Vendor Hub"
			/>
			<div className="bg-gray-800 p-4 rounded-lg shadow-md w-[100%]">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold text-white">
						Vendor Hub
					</h2>
					<div className="relative w-full max-w-xs">
						<span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
							<FaSearch />
						</span>
						<input
							type="text"
							placeholder="Search Here"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10 pr-3 py-2 text-sm rounded-md border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 w-full"
						/>
					</div>
				</div>

				<div className="tb-box w-[84vw] md:w-full relative overflow-x-auto">
					<div className="w-full text-sm text-gray-300 flex flex-col gap-2">
						{paginatedUsers.map((user) => (
							<div
								key={user.id}
								className="relative flex justify-between items-center border border-gray-600 px-2 md:px-4 py-3 rounded"
							>
								<div className="flex gap-4 items-center">
									<img
										src={user.avatar}
										alt={user.name}
										className="w-10 h-10 rounded-full"
									/>
									<div>
										<p className="font-semibold text-lg">
											{user.name}
										</p>
										<p className="text-white/50 text-sm">
											{user.email}
										</p>
									</div>
								</div>

								<div>
									{user.role === "Owner" ? (
										<p className="font-semibold text-lg flex gap-2 items-center">
											<FaStar /> Owner
										</p>
									) : (
										<p className="text-white/40 text-base flex gap-2 items-center">
											<TiUser className="text-white/40" />{" "}
											Member
										</p>
									)}
								</div>

								<div className="relative">
									<button
										className="cursor-pointer text-lg font-semibold"
										onClick={() =>
											setActiveUserId(
												activeUserId === user.id
													? null
													: user.id
											)
										}
									>
										<BsThreeDotsVertical />
									</button>

									{activeUserId === user.id && (
										<div className="absolute right-0 top-8 bg-gray-900 text-white border border-gray-600 rounded p-4 w-72 z-10 shadow-lg">
											<h3 className="font-semibold mb-2">
												User Permission
											</h3>
											<p className="text-sm mb-1">
												Email: {user.email}
											</p>
											<p className="text-sm mb-3">
												Phone: {user.phone}
											</p>
											<div className="mb-2">
												<label className="block mb-1">
													Change Role:
												</label>
												<select
													value={selectedRole}
													onChange={(e) =>
														setSelectedRole(
															e.target.value
														)
													}
													className="bg-gray-800 border border-gray-700 p-1 rounded w-full"
												>
													<option value="">
														Select Role
													</option>
													<option value="Owner">
														Owner
													</option>
													<option value="Member">
														Member
													</option>
												</select>
											</div>
											<div className="mb-2">
												<label className="inline-flex items-center">
													<input
														type="checkbox"
														checked={applyToAll}
														onChange={(e) =>
															setApplyToAll(
																e.target.checked
															)
														}
														className="mr-2"
													/>
													Apply to all members
												</label>
											</div>
											<div className="mb-2 flex items-center justify-between">
												<label
													htmlFor="applyToAll"
													className="text-sm"
												>
													Apply to all members
												</label>
												<div
													onClick={() =>
														setApplyToAll(
															!applyToAll
														)
													}
													className={`w-11 h-6 flex items-center bg-gray-700 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
														applyToAll
															? "bg-purple-600"
															: "bg-gray-600"
													}`}
												>
													<div
														className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
															applyToAll
																? "translate-x-5"
																: "translate-x-0"
														}`}
													/>
												</div>
											</div>

											<div className="flex justify-end">
												<button
													className="bg-purple-600 px-3 py-1 rounded text-sm"
													onClick={() =>
														handlePermissionChange(
															user.id
														)
													}
													disabled={!selectedRole}
												>
													Apply
												</button>
											</div>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="flex justify-between items-center mt-4 text-sm text-gray-400">
					<span>
						Showing {paginatedUsers.length} of {filterUsers.length}{" "}
						entries
					</span>
					<div className="space-x-2">
						<button
							className="text-gray-400 hover:text-white"
							onClick={() =>
								setCurrentPage((prev) => Math.max(prev - 1, 1))
							}
							disabled={currentPage === 1}
						>
							Prev
						</button>
						{Array.from({ length: totalPages }, (_, i) => (
							<button
								key={i + 1}
								className={`px-2 py-1 rounded ${
									currentPage === i + 1
										? "bg-purple-600 text-white"
										: "text-gray-400 hover:text-white"
								}`}
								onClick={() => setCurrentPage(i + 1)}
							>
								{i + 1}
							</button>
						))}
						<button
							className="text-gray-400 hover:text-white"
							onClick={() =>
								setCurrentPage((prev) =>
									Math.min(prev + 1, totalPages)
								)
							}
							disabled={currentPage === totalPages}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Users;
