// server.js
import app from './1.app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server opened on... http://localhost:${PORT}`);
});
