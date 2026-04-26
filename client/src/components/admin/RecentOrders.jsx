import { useEffect, useRef, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaSearch, FaUserCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
const orders = [
	{
		id: 1,
		product: "Modern Sofa",
		orderID: "#45D729H2",
		brand: "Pixel",
		category: "Furniture",
		quantity: 1,
		customer: "Lucas Hayes",
		avatar: "/avatars/lucas.jpg",
		status: "Shipped",
		price: 1200,
		date: "2024-05-18",
	},
	{
		id: 2,
		product: "Rose Flower Pot",
		orderID: "#67F839J3",
		brand: "Sonic",
		category: "Decoration",
		quantity: 2,
		customer: "Abigail Scott",
		avatar: "/avatars/abigail.jpg",
		status: "Delivered",
		price: 250,
		date: "2024-05-19",
	},
	{
		id: 3,
		product: "Leather Handbag",
		orderID: "#89G940K4",
		brand: "Elite",
		category: "Fashion",
		quantity: 1,
		customer: "Mason Wallace",
		avatar: "/avatars/mason.jpg",
		status: "Processing",
		price: 800,
		date: "2024-05-20",
	},
	{
		id: 4,
		product: "Polaroid Medium Camera",
		orderID: "#12H051L5",
		brand: "Bright",
		category: "Electronics",
		quantity: 3,
		customer: "Chloe Lewis",
		avatar: "/avatars/chloe.jpg",
		status: "Pending",
		price: 50,
		date: "2024-05-20",
	},
	{
		id: 5,
		product: "Digital Watch",
		orderID: "#34I162M6",
		brand: "Nova",
		category: "Fashion",
		quantity: 2,
		customer: "Henry Morgan",
		avatar: "/avatars/henry.jpg",
		status: "Shipped",
		price: 100,
		date: "2024-05-21",
	},
];

const statusColors = {
	Shipped: "bg-purple-700",
	Delivered: "bg-green-700",
	Processing: "bg-red-700",
	Pending: "bg-yellow-600",
};

const RecentOrders = () => {
	const [openDropdownId, setOpenDropdownId] = useState(null);
	const [sortKey, setSortKey] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [imageErrors, setImageErrors] = useState({});

	const dropdownRef = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setOpenDropdownId(null);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const filteredAndSortedOrders = [...orders]
		.filter(
			(order) =>
				order.product
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				order.orderID
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				order.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
				order.category
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				order.customer
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				order.status.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.sort((a, b) => {
			if (sortKey === "date") {
				return new Date(b.date) - new Date(a.date);
			} else if (sortKey === "priceLowToHigh") {
				return a.price - b.price;
			} else if (sortKey === "priceHighToLow") {
				return b.price - a.price;
			} else if (sortKey === "status") {
				return a.status.localeCompare(b.status);
			}
			return 0;
		});

	return (
		<div className="bg-gray-800 p-4 rounded-lg shadow-md w-[100%]">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold text-white">
					Recent Orders
				</h2>
				<div className="flex items-center gap-2">
					<div className="relative w-full">
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
					<div className="bg-[#735dff] hover:bg-[#735dff9c]  rounded-md ">
						<select
							className="appearance-none px-4 py-2 text-sm rounded-md border border-gray-600 bg-transparent text-white focus:outline-none"
							value={sortKey}
							onChange={(e) => setSortKey(e.target.value)}
						>
							<option value="" disabled hidden>
								Sort By
							</option>
							<option value="date" className="text-black">
								Date
							</option>
							<option
								value="priceLowToHigh"
								className="text-black"
							>
								Price: Low to High
							</option>
							<option
								value="priceHighToLow"
								className="text-black"
							>
								Price: High to Low
							</option>
							<option value="status" className="text-black">
								Status
							</option>
						</select>
					</div>
				</div>
			</div>

			<div className="tb-box w-[84vw] md:w-full relative overflow-x-auto">
				<table className="w-full text-sm text-gray-300">
					<thead>
						<tr className="bg-[#735dff] text-gray-100">
							<th className="p-3 text-left">Product ID</th>
							<th className="p-3 text-left">Category</th>
							<th className="p-3 text-left">Quantity</th>
							<th className="p-3 text-left">Customer</th>
							<th className="p-3 text-left">Status</th>
							<th className="p-3 text-left">Price</th>
							<th className="p-3 text-left">Ordered Date</th>
							<th className="p-3 text-left">Action</th>
						</tr>
					</thead>
					<tbody>
						{filteredAndSortedOrders.map((order) => (
							<tr
								key={order.id}
								className="border-b border-gray-700 hover:bg-gray-700 whitespace-nowrap"
								ref={dropdownRef}
							>
								<td className="p-3">
									<div>
										<div className="font-semibold text-white">
											{order.orderID}
										</div>
									</div>
								</td>
								<td className="p-3">{order.category}</td>
								<td className="p-3">{order.quantity}</td>
								<td className="p-3 flex items-center gap-2">
									{order.avatar && !imageErrors[order.id] ? (
										<img
											src={order.avatar}
											alt={order.customer}
											className="w-6 h-6 rounded-full"
											onError={() =>
												setImageErrors((prev) => ({
													...prev,
													[order.id]: true,
												}))
											}
										/>
									) : (
										<FaUserCircle className="w-6 h-6 text-gray-400" />
									)}
									{order.customer}
								</td>
								<td className="p-3">
									<span
										className={`text-xs px-2 py-1 rounded-full text-white ${
											statusColors[order.status]
										}`}
									>
										{order.status}
									</span>
								</td>
								<td className="p-3 font-semibold text-white">
									${order.price.toFixed(2)}
								</td>
								<td className="p-3">{order.date}</td>
								<td className="p-3 flex gap-2 relative items-center ">
									<button className="bg-purple-600 p-1 rounded hover:bg-purple-500 cursor-pointer">
										<FaEye size={14} />
									</button>
									<button
										className="bg-orange-600 p-1 rounded hover:bg-orange-500 cursor-pointer"
										onClick={() =>
											setOpenDropdownId(
												openDropdownId === order.id
													? null
													: order.id
											)
										}
									>
										<FaEdit size={14} />
									</button>
									{openDropdownId === order.id && (
										<div className="absolute top-15 right-0  shadow-lg rounded-md py-2 px-4 w-52 z-50 bg-gray-300 text-white flex flex-col gap-2">
											<p className="py-3 px-4 mb-1 bg-[#735dff] rounded-lg flex justify-between font-semibold items-center">
												<span>Action</span>
												<RxCross2
													className="cursor-pointer w-4 h-4"
													onClick={() =>
														setOpenDropdownId(null)
													}
												/>
											</p>
											<a
												href={`/admin/product/edit/${order.id}`}
												className="w-full flex items-center px-4 py-2 text-sm hover:bg-green-100 text-gray-800 rounded-lg transition-all border"
											>
												<FaEdit className="mr-2" />
												Edit Order
											</a>
											<button
												onClick={() =>
													alert(
														`Deleting Product #${order.id}`
													)
												}
												className="w-full flex items-center px-4 py-2 text-sm hover:bg-red-100 text-red-600 rounded-lg transition-all border"
											>
												<FaTrash className="mr-2" />
												Delete Order
											</button>
										</div>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="flex justify-between items-center mt-4 text-sm text-gray-400">
				<span>Showing 5 Entries</span>
				<div className="space-x-2">
					<button className="text-gray-400 hover:text-white">
						Prev
					</button>
					<button className="bg-purple-600 text-white px-2 py-1 rounded">
						1
					</button>
					<button className="text-gray-400 hover:text-white">
						2
					</button>
					<button className="text-gray-400 hover:text-white">
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default RecentOrders;
