const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require("nanoid");
const { readFile } = require('fs');
const e = require('cors');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  try {
    const date = await fs.readFile(contactsPath);
    const contacts = JSON.parse(date);
    return contacts;
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async id => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(e => e.id === id);
  if (contactIndex === -1) {
    return null;
  } else {
    const [deletedContact] = contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async id => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
