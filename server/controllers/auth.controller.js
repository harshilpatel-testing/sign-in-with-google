import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model.js";


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