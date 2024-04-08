import {app} from "./app";
import {PORT} from "./settings";

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
