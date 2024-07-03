import { HashTable } from "./util/HashTable";

const store = new HashTable<string, number>();
store.add("a", 1);
store.add("b", 2);
console.log(store.get("a")); // 1
console.log(store.get("b")); // 2
store.delete("a");
console.log(store.get("a")); // undefined
