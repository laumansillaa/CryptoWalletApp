module.exports = async function(req, res) {
    console.log('---------- ROUTE USER GET DATA ----------')
    return res.status(200).send(req.user);
};
