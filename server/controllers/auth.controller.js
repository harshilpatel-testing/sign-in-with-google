import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const hadnleGoogleLogin = async (req, res) => {
    const { token } = req.body;
    try {

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        // res.status(200).json({ payload });

        let user = await User.findOne({ email: payload.email });

        if (!user) {
            user = new User({
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                authType: "google",
            });
            await user.save();
        }

        const appToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token: appToken, user });


    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Google sign-in failed" });
    }
}

export const getProfile = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: "No token" });

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ user });

    } catch (error) {
        return res.status(500).json({ message: "Error", error });
    }
};