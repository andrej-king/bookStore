//region declaring variable
const express       = require('express');
const path          = require('path');
const rootDirectory = require('./utilites/path');
const adminRouter   = require('./routes/admin');
const mainRouter    = require('./routes/main');
const PORT          = process.env.PORT || 3000;
const app           = express();
//endregion

app.use(express.static("public"));

//region routes
app.use('/admin', adminRouter); // admin - is a filter
app.use(mainRouter);
//endregion

//region show page 404
app.use((req, res) => {
	res.status(404).sendFile(path.join(rootDirectory, 'views', '404.html'));
});
//endregion

//region port listener
app.listen(PORT, () => {
    console.log(`${PORT} is running`);
});
//endregion