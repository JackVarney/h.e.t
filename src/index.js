const app = require('./express');

app.listen(process.env.PORT || 4321, () => {
  console.log('App is listening on port 4321');
});
