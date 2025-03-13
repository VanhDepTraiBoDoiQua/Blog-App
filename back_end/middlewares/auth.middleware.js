import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
	const header = req.headers.cookie.split('; ');
	var token;
	if (header) {
		header.forEach(cookie => {
			if (cookie.startsWith('auth_token=')) {
				token = cookie.split('=')[1];
			}
		});
	}
	
	if (!token) {
		return res.status(401).json("Unauthorized");
	}

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		const user = await User.findOne({
			where: {
				id: verified.id,
			},
		});
		req.user = user;

		return next();
	} catch(err) {
		return res.status(401).json("Unauthorized");
	}
};

export default isAuth;