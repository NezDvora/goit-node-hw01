const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
  } = require("./db");
  
  const { Command } = require("commander");
  const program = new Command();
  program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");
  
  program.parse(process.argv);
  
  const argv = program.opts();
  
  const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.table(contacts);
        break;
  
      case "get":
        const ContactById = await getContactById(id);
        console.log(ContactById);
        break;
  
      case "add":
        const newContact = await addContact(name, email, phone);
        console.log(newContact);
        break;
  
      case "remove":
        const deleteById = await removeContact(id);
        console.log(deleteById);
        break;
  
      default:
        console.log("Unknown action!");
    }
  };
  
  invokeAction(argv);