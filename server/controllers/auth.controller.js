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

        const { id } = req.body;

        console.log(id, typeof id);
        // id= id.toString();

        const user = await User.findById(id);

        console.log(user);
        
        if (!user) {

            return res.status(400).json({ message: "User not found." });
        }

        return res.status(200).json({ message: "User found", user });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: "Error in get profile", error })
    }
}