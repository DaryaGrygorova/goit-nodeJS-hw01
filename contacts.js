const fs = require("fs").promises;
const path = require("path");
const colors = require("colors");

const contactPath = path.resolve("./db/contacts.json");
const textFormat = "utf8";

async function listContacts() {
  try {
    const response = await fs.readFile(contactPath, textFormat);
    const data = JSON.parse(response);
    console.table(data);
  }
  catch (err) { console.log(err) };
};

async function getContactById(contactId) {
  try {
    const response = await fs.readFile(contactPath, textFormat);
    const data = JSON.parse(response);
    console.table(
      data.filter((item) => item.id === contactId.toString())
    )
  }
  catch (err) { console.log(err) };
};

async function removeContact(contactId) {
  try {
    const response = await fs.readFile(contactPath, textFormat);
    const data = JSON.parse(response);

    if (!data.find((item) => item.id === contactId.toString())) {
      console.log(`Failed to delete contact with ID '${contactId}'!`.red);
    } else {
      const newData = data.filter((item) => item.id !== contactId.toString());

      await fs.writeFile(contactPath, JSON.stringify(newData), textFormat)
      listContacts()
    }
  }
  catch (err) { console.log(err) };
};

async function addContact(name, email, phone) {
  try {
    const response = await fs.readFile(contactPath, textFormat);
    const data = JSON.parse(response);

    if (data.find((item) => item.name === name)) {
      console.log(`A contact with name '${name}' is already exists!`.red);
    } else {
      const id = (+data[data.length - 1].id + 1).toString();
      const newContent = { id, name, email, phone };
  
      data.push(newContent);

      await fs.writeFile(contactPath, JSON.stringify(data), textFormat)
      listContacts()
    }
  }
  catch (err) { console.log(err) };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
