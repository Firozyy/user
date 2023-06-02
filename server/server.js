import app from "./app.js";
import { dbConnecting } from "./config/dbConnection.js";
dbConnecting()
export default app.listen(process.env.PORT,() => {
    console.log(`Server is running on ${process.env.PORT}`)
});