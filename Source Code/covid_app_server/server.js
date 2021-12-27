const { app } = require("./app")
require("dotenv").config()

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("unable to start server", err)
        process.exit(1)
    }
    console.log("server is running on port number ", process.env.PORT)
})