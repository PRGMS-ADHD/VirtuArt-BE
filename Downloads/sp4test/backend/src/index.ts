import { app } from "./app";
import { PORT } from "./settings";

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});