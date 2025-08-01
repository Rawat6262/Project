const { getExhibition, getname } = require("../Service/Auth");

async function restrictToLoginUser(req, res, next) {
    try {
        const token = req.cookies?.uid;

        if (!token) {
            console.warn('No token found in cookies');
            return res.status(401).send('Not logged in');
        }

        const user = await getExhibition(token);
        console.log('Authenticated user:', user);

        if (!user) {
            console.warn('Invalid or expired token');
            return res.status(401).send('Session expired. Please log in again.');
        }

        req.user = user; // better naming
        next();
    } catch (err) {
        console.error('Error in restrictToLoginUser middleware:', err);
        res.status(500).send('Internal server error');
    }
}

async function addvaluetoexhibition(req, res, next) {
    try {
        const token = req.cookies?.name;
        if (!token) {
            console.warn('No token found in cookies in company');
            return res.status(401).send('Not logged in');

        }
        const user = await getname(token);

        if (!user) {
            console.warn('Invalid or expired token');
            return res.status(401).send('Session expired. Please log in again.');
        }
        req.exhibition = user;
        next();
    } catch (err) {
        console.error('Error in restrictToLoginUser middleware:', err);
        res.status(500).send('Internal server error');
    }
}

module.exports = {restrictToLoginUser,addvaluetoexhibition};
