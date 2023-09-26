const contacts = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    try {
      switch (action) {
        case 'list':
          const listContactsResult = await contacts.listContacts();
          console.log(listContactsResult);
          break;
        case 'get':
          const getContactResult = await contacts.getContactById(id);
          console.log(getContactResult);
          break;
        case 'add':
          const newContactResult = await contacts.addContact(name, email, phone);
          console.log(newContactResult);
          break;
        case 'remove':
          const delContactResult = await contacts.removeContact(id);
          console.log(delContactResult);
          break;
        default:
          console.warn('\x1B[31m Unknown action type!');
      }
    } catch (error) {
      console.error('\x1B[31m Error:', error.message);
    }
  }
  
  invokeAction(argv);
  