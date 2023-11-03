import express from 'express';
import {
    configSource,
    variables,
    connectDatabase, passportConfig,
} from "./src/configuration/index.js";
import routes from "./src/configuration/route.config.js";

const app = express();

const PORT = variables.PORT || 3000;

const URL = variables.PREFIX_URL || 'http://localhost';

configSource(app);

passportConfig(app);

await connectDatabase();

routes(app);

app.listen(PORT, () => {
    console.log(`Server is running at ${URL}:${PORT}`);
})