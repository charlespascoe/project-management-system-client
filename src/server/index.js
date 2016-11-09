import express from 'express';
import logger from 'server/logger';

const app = express();

app.use('/public', express.static(__dirname + '/public'));

app.listen(8081, (e) => e ? logger.fatal({err: e}) : logger.info('Listening on port 8081'));
