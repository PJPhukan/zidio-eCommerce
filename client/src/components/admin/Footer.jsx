import React from "react";

const Footer = () => {
	return (
		<footer>
			<div className=" bg-gray-800 py-3 mb-[-16px] rounded-md text-center text-white text-sm">
				Copyright &copy; {new Date().getFullYear()}{" "}
				<span className="font-bold text-lg">Shop.com</span> . All rights
				reserved.
			</div>
		</footer>
	);
};

export default Footer;
