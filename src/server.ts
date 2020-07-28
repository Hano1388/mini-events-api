import app from './app';

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT} in ${app.get('env')} mode`);
});

export default server;