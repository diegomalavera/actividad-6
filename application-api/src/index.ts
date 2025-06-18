import express from "express";
import routes from "./routes/routes";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
app.use("/api/v1", routes);

app.listen(3000, "0.0.0.0", () => {
    console.log(`App runing`);
});
