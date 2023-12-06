class IndexedDBManager {
  constructor(storeName) {
    this.dbName = "bwc";
    this.storeName = storeName;
    this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    this.db = null;
    this.connectToDB();
  }

  connectToDB() {
    let request = this.indexedDB.open(this.dbName);
    
    request.onerror = function(event) {
      console.error("connect error!!!!!!!")
    };

    request.onupgradeneeded = function(event) {
      let db = event.target.result;
      this.db = db;

      db.createObjectStore(this.storeName, { keyPath: "uuid" });
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
