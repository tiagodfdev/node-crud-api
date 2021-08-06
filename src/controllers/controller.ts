/* eslint-disable import/extensions */
import { Application, Request, Response } from 'express';
import Contacts from '../models/contacts';

module.exports = (app:Application) => {
  app.get('/contacts', (req:Request, res:Response) => {
    Contacts.list(res);
  });
  app.get('/contacts/:id', (req:Request, res:Response) => {
    const id = parseInt(req.params.id, 10);
    Contacts.searchById(id, res);
  });

  app.post('/contacts', (req:Request, res:Response) => {
    const contact = req.body;
    Contacts.create(contact, res);
  });

  app.patch('/contacts/:id', (req:Request, res:Response) => {
    const id = parseInt(req.params.id, 10);
    const valores = req.body;
    Contacts.update(id, valores, res);
  });
  app.delete('/contacts/:id', (req:Request, res:Response) => {
    const id = parseInt(req.params.id, 10);
    Contacts.delete(id, res);
  });
};
