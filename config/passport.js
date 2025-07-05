const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Only initialize Google OAuth strategy if not using fake auth
if (process.env.USE_FAKE_AUTH !== "true") {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        return done(null, {
          id: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
        });
      }
    )
  );
}
