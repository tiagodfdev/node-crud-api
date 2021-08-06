import { Connection } from 'mysql';

class Tables {
    connection!:Connection

    init(connection:Connection) {
      this.connection = connection;
      this.createTableContact();
    }

    createTableContact() {
      const sql = 'CREATE TABLE IF NOT EXISTS contacts (id int NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, lastName varchar(30) NOT NULL, phone varchar(20) NOT NULL, birthDate datetime NOT NULL, address varchar(50) NOT NULL, email varchar(30) NOT NULL, PRIMARY KEY(id))';

      this.connection.query(sql, (erro) => {
        if (erro) {
          console.log(erro);
        } else {
          console.log('Tabela Criada');
        }
      });
    }
}
export default new Tables();
