class IndexedDBManager {
  constructor() {
    this.dbName = "bwc";
    this.storeName = "Account";
    this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    this.connectToDB();
  }

  connectToDB() {
    let request = this.indexedDB.open(this.dbName);
    // request.onsuccess = function(event) {
    //   this.db = event.target.result;
    // };
    request.onerror = function(event) {
      this.createDB();
    };
  }

  createDB() {
    let request = this.indexedDB.open(this.dbName);
    request.onupgradeneeded = function(event) {
      let db = event.target.result;
      db.createObjectStore(this.storeName);
    };
  }

  saveData(data) {
    let request = this.indexedDB.open(this.dbName);
    request.onsuccess = function(event) {
      let db = event.target.result;
      let transaction = db.transaction([this.storeName], "readwrite");
      let objectStore = transaction.objectStore(this.storeName);
      objectStore.add(data);
    };
  }

  deleteData(key) {
    let request = this.indexedDB.open(this.dbName);
    request.onsuccess = function(event) {
      let db = event.target.result;
      let transaction = db.transaction([this.storeName], "readwrite");
      let objectStore = transaction.objectStore(this.storeName);
      objectStore.delete(key);
    };
  }

  getData(key) {
    let request = this.indexedDB.open(this.dbName);
    request.onsuccess = function(event) {
      let db = event.target.result;
      if(db.objectStoreNames.contains(this.storeName)) {
        let transaction;
        try {
          transaction = db.transaction([this.storeName], "readonly");

          if(!transaction){
            console.log(transaction)
            return "";
          }


          let objectStore = transaction.objectStore(this.storeName);
          
          let request = objectStore.get(key);
          request.onsuccess = function(event) {
            return event.target.result;
          };
        } catch (error) {
          console.error("Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.");
          return;
        }
      } else {
        console.error("Object store not found");
      }
    };
  }

  updateData(key, data) {
    let request = this.indexedDB.open(this.dbName);
    request.onsuccess = function(event) {
      let db = event.target.result;
      let transaction = db.transaction([this.storeName], "readwrite");
      let objectStore = transaction.objectStore(this.storeName);
      let request = objectStore.put(data, key);
      request.onsuccess = function(event) {
        return event.target.result;
      };
    };
  }
}

export default IndexedDBManager;