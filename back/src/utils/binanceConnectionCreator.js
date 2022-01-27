const Binance = require("node-binance-api");
const binance = new Binance()
const { Server } = require("socket.io");

module.exports = async function(httpServer) {
    const io = new Server(httpServer, { cors: {
      // origin: `http://${process.env.IP_HOST}:19006`,
        origin: "*",
        credentials:true
    }});

    io.on("connection", socket => {
        socket.on("token client", token => {
            binance.futuresMiniTickerStream(`${token}USDT`, async element => {
                await io.emit(token, element.close)});
        })
    });
    io.on("userMessage", msg => console.log(msg));
}
