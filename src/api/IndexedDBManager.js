import { getDate, getUid } from "../utils/util";

class IndexedDBManager {
  constructor(storeName) {
    this.dbName = "bwc";
    this.storeName = storeName;
    this.indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;
    this.db = null;
    this.KEY_PATH = "uid";
    this.connectToDB();
  }

  connectToDB() {
    let request = this.indexedDB.open(this.dbName);

    request.onerror = function (event) {
      console.error("connect error!!!!!!!");
      return false;
    };

    this.db = request;

    request.onsuccess = () => {
      let db = request.result;

      db.onversionchange = () => {
        db.close();
        alert("old version Database. Please reload the page.");
        // request = indexedDB.open(DB_NAME);
      };
    };

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      db.createObjectStore(this.storeName, { keyPath: "uid" });
    };
  }

  saveData = (data) => {
    const dbRequest = this.indexedDB.open(this.dbName);

    // store가 존재하지 않는 경우 대비
    dbRequest.onupgradeneeded = () => {
      const db = dbRequest.result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName, { keyPath: this.KEY_PATH });
      }
    };

    dbRequest.onerror = (e) => {
      console.error(`indexedDB open Error : ${dbRequest.error}`);
    };

    dbRequest.onsuccess = () => {
      const db = dbRequest.result;

      db.onversionchange = () => {
        db.close();
        console.error("Database is outdated, please reload the page");
      };

      const transaction = db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);

      const defaultData = {
        uid: getUid(),
        date: getDate(),
      };
      const saveParams = { ...defaultData, ...data };
      alert(saveParams);

      const request = store.add(saveParams);

      request.onerror = (e) => {
        if (request.error.name === "ConstraintError :") {
          console.error(`ConstraintError : ${request.error}`);
          e.preventDefault();
        } else {
          console.error(`add Data Error : ${request.error}`);
          transaction.abort(); // stop transaction
        }
      };
    };
  };

  deleteData(key) {
    let request = this.indexedDB.open(this.dbName);
    request.onsuccess = function (event) {
      let db = event.target.result;
      let transaction = db.transaction([this.storeName], "readwrite");
      let objectStore = transaction.objectStore(this.storeName);
      objectStore.delete(key);
    };
  }

  getData = () => {
    return new Promise((resolve, reject) => {
      let dbRequest = this.db;

      dbRequest.onsuccess = () => {
        let db = dbRequest.result;
        db.onversionchange = (e) => {
          db.close();
          alert("old version Database. Please reload the page.");
        };

        let transaction = db.transaction(this.storeName, "readonly");
        let objStore = transaction.objectStore(this.storeName);
        let request = objStore.getAll();

        request.onerror = (e) => {
          console.error(request.error);
          reject(e);
        };

        request.onsuccess = (e) => {
          resolve(request.result);
        };

        request.oncomplete = () => {
          db.close();
        };
      };
    });
  };

  updateData(key, data) {
    let request = this.indexedDB.open(this.dbName);
    request.onsuccess = function (event) {
      let db = event.target.result;
      let transaction = db.transaction([this.storeName], "readwrite");
      let objectStore = transaction.objectStore(this.storeName);
      let request = objectStore.put(data, key);
      request.onsuccess = function (event) {
        return event.target.result;
      };
    };
  }
}

export default IndexedDBManager;
