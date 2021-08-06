import { connection } from './src/dbConnection/connection';
import Tables from './src/dbConnection/tables';

const config = require('./src/config/config');

connection.connect((erro:any) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log('conectado com sucesso');
    Tables.init(connection);
    const app = config();
    app.listen(3000, () => console.log('servidor rodando na porta 3000'));
  }
});
