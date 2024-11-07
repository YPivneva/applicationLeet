const express = require('express');
const bodyParser = require('body-parser');
const problemsRouter = require('./routes/problems');

const app = express();
app.use(bodyParser.json());
app.use('/api', problemsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
