import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//Adding logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
   const jateDB = await openDB("jate", 1);
   //Assigning database and what it's allowed to do
   const tx = jateDB.transaction("jate", "readwrite");
   const store = tx.objectStore("jate");
   //Adding content to store
   const request = store.put({ id: 1, value: content });
   const result = await request;
   console.log("data saved!", result);
}
//Adding logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDB = await openDB("jate", 1);
  //Assigning database and what it's allowed to do
  const tx = jateDB.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  //Request for everything stored in the database
  const request = store.getAll();
  const result = await request;
  console.log("data saved!", result);
  return result.value;
};

initdb();
