import { getDate, getUid, deepCopy } from "../utils/util";

class IndexedDBManager {
  constructor() {
    this.dbName = "bwc";
    this.stores = ['account','accountList'];
    this.indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;
    this.KEY_PATH = "uid";
    this.connectToDB();
  }

  connectToDB() {
    let request = this.indexedDB.open(this.dbName);

    request.onerror = function (event) {
      console.error("connect error!!!!!!!");
      return false;
    };

    // 기존의 저장된 데이터베이스보다 큰 버전 번호의 데이터베이스가 로드 될 때 트리거
    // DB 처음 생성될 때 여러개의 Store 생성. ( 버전이 같은 경우만 생성 가능 )
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      this.stores.forEach(store => {
        db.createObjectStore(store, { keyPath: "uid" });
      });
    };
  }

  saveData = (storeName , data) => {
    const dbRequest = this.indexedDB.open(this.dbName);

    // store가 존재하지 않는 경우 대비
    dbRequest.onupgradeneeded = () => {
      const db = dbRequest.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: this.KEY_PATH });
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

      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);

      const defaultData = {
        uid: getUid(),
        date: getDate(),
      };
      const saveParams = { ...defaultData, ...data };
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

  deleteData(storeName,key) {
    let request = this.indexedDB.open(this.dbName);
    request.onsuccess = function (event) {
      let db = event.target.result;
      let transaction = db.transaction([storeName], "readwrite");
      let objectStore = transaction.objectStore(storeName);
      objectStore.delete(key);
    };
  }

  getDataAll = (storeName) => {
    return new Promise((resolve, reject) => {
      let dbRequest = this.indexedDB.open(this.dbName);

      dbRequest.onsuccess = () => {
        let db = dbRequest.result;
        db.onversionchange = (e) => {
          db.close();
          alert("old version Database. Please reload the page.");
        };

        let transaction = db.transaction(storeName, "readonly");
        let objStore = transaction.objectStore(storeName);
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

  getData = (storeName ,key) => {

    return new Promise((resolve, reject) => {
      let dbRequest = this.indexedDB.open(this.dbName);
      dbRequest.onsuccess = () => {
        let db = dbRequest.result;
        db.onversionchange = (e) => {
          db.close();
          alert("old version Database. Please reload the page.");
        };
        
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.get(key);

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


  updateData = (storeName, key,newValues) => {
    let dbRequest = this.indexedDB.open(this.dbName);
  
    dbRequest.onupgradeneeded = () => {
      const db = dbRequest.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: this.KEY_PATH });
      }
    };
  
    dbRequest.onerror = (e) => {
      console.error(`indexedDB open Error : ${dbRequest.error}`);
    };
  
    dbRequest.onsuccess = () => {
      const db = dbRequest.result;
  
      db.onversionchange = () => {
        console.error("Database is outdated, please reload the page");
        db.close();
      };
  
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.get(key);
  
      request.onerror = () => {
        console.error(request.error);
      };
  
      request.onsuccess = () => {
        const data = { ...deepCopy(request.result), ...newValues };
  
        const updateRequest = store.put(data);
  
        updateRequest.onerror = (e) => {
          if (updateRequest.error.name === "ContranintError") {
            console.error(`ConstraintError : ${updateRequest.error}`);
            e.preventDefault();
          } else {
            console.error(`add Data Error : ${updateRequest.error}`);
            transaction.abort();
          }
        };
      };
    };
  };
}

export default IndexedDBManager;
