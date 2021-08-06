/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

import { Response } from 'express';
import moment from 'moment';
import { connection } from '../dbConnection/connection';
import { Icontact } from '../types/types';

class Contacts {
  create(contact:Icontact, res:Response) {
    const creationDate = moment().format('YYYY-MM-DD HH:MM:SS');
    const date = moment(contact.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

    const isValidDate = moment(date).isSameOrBefore(creationDate);
    const isValidName = contact.name.length >= 2;

    const validations = [
      {
        name: 'date',
        isValid: isValidDate,
        menssagem: 'Date must be greater than or equal to current date',
      },
      {
        name: 'name',
        isValid: isValidName,
        menssagem: 'Customer must be at least 2 characters long',
      },
    ];
    const errors = validations.filter((validation) => !validation.isValid);
    const isError = errors.length;

    if (isError) {
      res.status(400).json(errors);
    } else {
      contact.birthDate = date;
      const contactDated = { ...contact };
      const sql = 'INSERT INTO contacts SET ?';
      connection.query(sql, contactDated, (error) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(201).json(contact);
        }
      });
    }
  }

  list(res:Response) {
    const sql = 'SELECT * FROM contacts';

    connection.query(sql, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  }

  searchById(id:number, res:Response) {
    const sql = `SELECT * FROM contacts WHERE id=${id}`;

    connection.query(sql, (error, result) => {
      const contact = result[0];
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(contact);
      }
    });
  }

  update(id:number, data:Icontact, res:Response) {
    if (data.birthDate) {
      data.birthDate = moment(data.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    }
    const sql = 'UPDATE contacts SET ? WHERE id=?';
    connection.query(sql, [data, id], (error) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ ...data, id });
      }
    });
  }

  delete(id:number, res:Response) {
    const sql = 'DELETE FROM contacts WHERE id=?';

    connection.query(sql, id, (error) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(`ID ${id} deleted!`);
      }
    });
  }
}
export default new Contacts();
