import express from 'express';
import {
    configSource,
    variables,
    connectDatabase,
} from "./src/configuration/index.js";

const app = express();

const PORT = variables.PORT || 3000;

const URL = variables.PREFIX_URL || 'http://localhost';

configSource(app);

await connectDatabase();

app.listen(PORT, () => {
    console.log(`Server is running at ${URL}:${PORT}`);
})