const { app, setup } = require('./app')

const port = process.env.PORT || 80

app.listen(port, async () => {
  await setup();
  console.log(`Server is up on port ${port}`);
})