import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable, runInAction } from 'mobx';

export const toDoItemsKey = "toDoItems";

class ItemHandler{

    toDoLists = [];
    selectedItem = {};

    constructor() {
        makeAutoObservable(this);
    }

    getObservableToDoLists = () => {
        return this.toDoLists;
    }

    setObservableOnInit = () => {
        this.getAllItems().then((items) => {
            runInAction(() => {
                this.toDoLists = JSON.parse(items);
            });
        }).catch((e) => {
            console.log('Error on setObservableOnInit: ', e);
        });
    }

    setSelectedItem = (item) => {
        this.selectedItem = item;
    }

    getSelectedItem = () => {
        return this.selectedItem;
    }

    // remove item by index
    removeItemByIndex = (index) => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(toDoItemsKey)
            .then((value) => {
                const items = JSON.parse(value);
                items.splice(index, 1);
                AsyncStorage.setItem(toDoItemsKey, JSON.stringify(items))
                .then(() => {
                    runInAction(() => {
                        this.toDoLists = items;
                    })
                    resolve({message: "Item Removed Successfully"});
                }).catch((e) => {
                    console.log(e);
                    reject(e);
                });
            });
        });
    }

    searchItemByTitle = (title) => {
        return new Promise((resolve, reject) => {
            // search item like title if title empty return all items
            AsyncStorage.getItem(toDoItemsKey)
            .then((value) => {
                const items = JSON.parse(value);
                const result = items.filter((item) => item.title.toLowerCase().includes(title.toLowerCase()));
                runInAction(() => {
                    this.toDoLists = result;
                });
                resolve(result);
            })
            .catch((e) => {
                console.log(e);
                reject(e);
            });
        }
        );
    }

    

    getAllItems = () => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(toDoItemsKey)
            .then((value) => {
                resolve(value);
            })
            .catch((e) => {
                console.log(e);
                reject(e);
            });
        });
    }

    getItemByIndex = (index) => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(toDoItemsKey)
            .then((value) => {
                const items = JSON.parse(value);
                runInAction(() => {
                    this.selectedItem = items[index];
                });
                resolve(items[index]);
            })
            .catch((e) => {
                console.log(e);
                reject(e);
            });
        });
    }

    getItemById = (id) => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(toDoItemsKey)
            .then((value) => {
                const items = JSON.parse(value);
                const item = items.find((item) => item.id === id);
                runInAction(() => {
                    this.selectedItem = item;
                });
                resolve(item);
            })
            .catch((e) => {
                console.log(e);
                reject(e);
            });
        });
    }

    updateItemByIndex = (index, item) => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(toDoItemsKey)
            .then((value) => {
                const items = JSON.parse(value);
                items[index] = item;
                AsyncStorage.setItem(toDoItemsKey, JSON.stringify(items))
                .then(() => {
                    runInAction(() => {
                        this.toDoLists = items;
                        this.selectedItem = item;
                    })
                    resolve({message: "Item Updated Successfully"});
                }).catch((e) => {
                    console.log(e);
                    reject(e);
                });
            });
        });
    }

    updateItemById = (id, item) => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(toDoItemsKey)
            .then((value) => {
                const items = JSON.parse(value);
                const index = items.findIndex((item) => item.id === id);
                items[index] = item;
                AsyncStorage.setItem(toDoItemsKey, JSON.stringify(items))
                .then(() => {
                    runInAction(() => {
                        this.toDoLists = items;
                        this.selectedItem = item;
                    })
                    resolve({message: "Item Updated Successfully"});
                }).catch((e) => {
                    console.log(e);
                    reject(e);
                });
            });
        });
    }

    addTodoItem = async (item) => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getAllKeys().then((keys) => {
                const found = keys.find((key) => key === toDoItemsKey);
                if (!found) {
                    let toDoItems = [];
                    toDoItems.push(item);
                    AsyncStorage.setItem(toDoItemsKey, JSON.stringify(toDoItems)).then((response) => {
                        console.log('Item Added: ', response);
                        runInAction(() => {
                            this.toDoLists = toDoItems;
                        })
                        resolve({message: "Item Added Successfully"});
                    }).catch((e) => {
                        console.log('Error on addTodoItem: ', e);
                        reject(e);
                    });
                }
            });

            this.getAllItems(toDoItemsKey).then((items) => {
                let toDoItems = [];
                if (items) {
                    toDoItems = JSON.parse(items);
                }
                
                toDoItems.push(item);

                AsyncStorage.setItem(toDoItemsKey, JSON.stringify(toDoItems)).then((response) => {
                    console.log('Item Added: ', response);
                    runInAction(() => {
                        this.toDoLists = toDoItems;
                    })
                    resolve({message: "Item Added Successfully"});
                }).catch((e) => {
                    console.log('Error on addTodoItem: ', e);
                    reject(e);
                });
            }).catch((e) => {
                reject(e);
            });
        }
        );

    }
}

export const itemHandler = new ItemHandler();
