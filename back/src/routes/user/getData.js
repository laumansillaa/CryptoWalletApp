module.exports = async function(req, res) {
    return res.status(200).send(req.user);
};
