import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import SocialAccount from "../models/socialAcount.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"

// facebook strategy
passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/auth/facebook/callback",
        scope: ['email', 'public_profile'],
        profileFields: ['email', 'displayName', 'photos']

    }, async (accessToken, refreshToken, profile, done) => {
        const account = await SocialAccount.findOne({
            where: {
                providerUserId: profile.id,
            },
        });

        // if no account => register
        if(!account) {
            let password = bcrypt.hashSync(Math.random().toString(36).slice(-8), 10);
            let email = profile.emails ? profile.emails[0].value : `user_${profile.id}@facebook.com`;
            let img = profile?.photos[0]?.value;

            const findByEmail = await User.findOne({
                where: {
                    email: email,
                },
            });

            if (findByEmail) {
                return resizeBy.status(400).json("This account has already exist");
            }

            const newUser = await User.create({
                username: profile.displayName,
                password: password,
                email: email,
                img: img,
            });

            await SocialAccount.create({
                userId: newUser.id,
                provider: "facebook",
                providerUserId: profile.id,
            })

            return done(null, newUser);
        
        // login
        } else {
            const user = await User.findOne({
                where: {
                    id: account.userId,
                },
            });

            return done(null, user);
        }
    },
));

// google strategy
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ['profile', 'email']
        
    }, async (accessToken, refreshToken, profile, done) => {

        const account = await SocialAccount.findOne({
            where: {
                providerUserId: profile.id,
            },
        });

        if (!account) {
            let password = bcrypt.hashSync(Math.random().toString(36).slice(-8), 10);
            let email = profile.emails[0].value;
            let img = profile?.photos[0]?.value;

            const findByEmail = await User.findOne({
                where: {
                    email: email,
                },
            });

            if (findByEmail) {
                return resizeBy.status(400).json("This account has already exist");
            }

            const newUser = await User.create({
                username: profile.displayName,
                password: password,
                email: email,
                img: img,
            });

            await SocialAccount.create({
                userId: newUser.id,
                provider: "google",
                providerUserId: profile.id,
            })

            return done(null, newUser);

        } else {
            const user = await User.findOne({
                where: {
                    id: account.userId,
                },
            });

            return done(null, user);
        }
    },
));

export default passport;