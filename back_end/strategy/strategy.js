import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import SocialAccount from "../models/socialAcount.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"

// facebook login strategy
passport.use("facebook-login", new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/auth/facebook/callback",
        scope: ['email', 'public_profile'],
        profileFields: ['email', 'displayName', 'photos']

    }, async (accessToken, refreshToken, profile, done) => {
        const account = await SocialAccount.findOne({
            where: {
                providerUserId: profile.id,
                provider: "facebook",
            },
        });

        // if no account => register
        if(!account) {
            let password = bcrypt.hashSync(Math.random().toString(36).slice(-8), 10);
            let email = profile.emails ? profile.emails[0].value : `user_${profile.id}@facebook.com`;
            let img = profile?.photos[0]?.value;
            const username = `user_user_${profile.id}`

            const findByEmail = await User.findOne({
                where: {
                    email: email,
                },
            });

            if (findByEmail) {
                return done(null, findByEmail);
            }

            const newUser = await User.create({
                username: username,
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

// facebook connect strategy
passport.use("facebook-connect", new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/users/connect/facebook/callback",
    scope: ['email', 'public_profile'],
    profileFields: ['email', 'displayName', 'photos']

}, async (accessToken, refreshToken, profile, done) => {
    const account = await SocialAccount.findOne({
        where: {
            providerUserId: profile.id,
            provider: "facebook",
        },
    });

    if (!account) {
        return done(null, profile);

    } else {
        return done(new Error("This social account has been already linked to another account"), false);
    }
},
));

// google login strategy
passport.use("google-login", new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ['profile', 'email']
        
    }, async (accessToken, refreshToken, profile, done) => {

        const account = await SocialAccount.findOne({
            where: {
                providerUserId: profile.id,
                provider: "google",
            },
        });

        if (!account) {
            let password = bcrypt.hashSync(Math.random().toString(36).slice(-8), 10);
            let email = profile.emails[0].value;
            let img = profile?.photos[0]?.value;
            const username = `user_user_${profile.id}`

            const findByEmail = await User.findOne({
                where: {
                    email: email,
                },
            });

            if (findByEmail) {
                return done(null, findByEmail);
            }

            const newUser = await User.create({
                username: username,
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

// google connect strategy
passport.use("google-connect", new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/users/connect/google/callback",
        scope: ['profile', 'email']

}, async (accessToken, refreshToken, profile, done) => {
    const account = await SocialAccount.findOne({
        where: {
            providerUserId: profile.id,
            provider: "google",
        },
    });

    if (!account) {
        return done(null, profile);

    } else {
        return done(new Error("This social account has been already linked to another account"), false);
    }
},
));

export default passport;