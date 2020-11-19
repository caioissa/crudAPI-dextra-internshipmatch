const GoogleAuthAPI = require("../api/GoogleAuthAPI");

var authApi;

const setup = async () => {
    authApi = await GoogleAuthAPI.build();
};

async function auth (req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).send({ error: 'No credentials sent!' });
    }

    const auth = await authApi.verify(token.split(' ')[1]);

    if (!auth) {
        return res.status(403).send();
    }

    res.locals.user = auth.user;
    res.locals.isIntern = auth.isIntern;
    next();
}

module.exports = { setup, auth };