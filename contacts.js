const fs = require("fs").promises;
const path = require("path");
const colors = require("colors");

const contactPath = path.resolve("./db/contacts.json");
const textFormat = "utf8";

function listContacts() {
  fs.readFile(contactPath, textFormat)
    .then((response) => {
      console.table(JSON.parse(response));
    })
    .catch((err) => console.log(err));
}

function getContactById(contactId) {
  fs.readFile(contactPath, textFormat)
    .then((response) =>
      console.table(
        JSON.parse(response).filter((item) => item.id === contactId.toString())
      )
    )
    .catch((err) => console.log(err));
}

function removeContact(contactId) {
  fs.readFile(contactPath, textFormat)
    .then((response) => {
      const data = JSON.parse(response);
      if (
        !contactId ||
        contactId >= response.length ||
        !data.find((item) => item.id === contactId.toString())
      ) {
        console.log(`Failed to delete contact with ID '${contactId}'!`.red);
      } else {
        const newData = data.filter((item) => item.id !== contactId.toString());

        fs.writeFile(contactPath, JSON.stringify(newData), textFormat)
          .then(
            fs
              .readFile(contactPath, textFormat)
              .then((response) => {
                console.table(JSON.parse(response));
              })
              .catch((err) => console.log(err))
          )
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
}

async function addContact(name, email, phone) {
  fs.readFile(contactPath, textFormat)
    .then((response) => {
      const data = JSON.parse(response);

      if (data.find((item) => item.name === name)) {
        console.log(`A contact with name '${name}' is already exists!`.red);
      } else {
        const id = (+data[data.length - 1].id + 1).toString();
        const newContent = { id, name, email, phone };

        data.push(newContent);

        fs.writeFile(contactPath, JSON.stringify(data), textFormat)
          .then(
            fs
              .readFile(contactPath, textFormat)
              .then((response) => {
                console.table(JSON.parse(response));
              })
              .catch((err) => console.log(err))
          )
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
