type KeyValue<K, V> = {
  key: K;
  value: V;
};

export class HashTable<K, V> {
  private table: KeyValue<K, V>[][];
  private size: number;
  private capacity: number;
  private loadFactor: number;

  constructor(capacity = 8, loadFactor = 0.7) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.table = Array(capacity).fill([]);
    this.size = 0;
  }

  private hash(key: K): number {
    let hash = 0;
    const keyStr = JSON.stringify(key);

    for (let i = 0; i < keyStr.length; i++) {
      hash = (hash << 5) - hash + keyStr.charCodeAt(i);
      hash |= 0;
    }

    return Math.abs(hash % this.capacity);
  }

  private resize() {
    const newCap = this.capacity * 2;
    const newTable = Array(newCap).fill([]);

    for (const bucket of this.table) {
      for (const { key, value } of bucket) {
        const ni = this.hash(key) % newCap;
        newTable[ni].push({ key, value });
      }
    }

    this.capacity = newCap;
    this.table = newTable;
  }

  private checkLoadFactor() {
    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  add(key: K, value: V): void {
    const i = this.hash(key);
    const bucket = this.table[i];
    const existingPair = bucket.find((e: KeyValue<K, V>) => e.key === key);

    if (existingPair) {
      existingPair.value = value;
    } else {
      bucket.push({ key, value });
      this.size++;
      this.checkLoadFactor();
    }
  }

  get(key: K): V | undefined {
    const i = this.hash(key);
    const bucket = this.table[i];
    const pair = bucket.find((e: KeyValue<K, V>) => e.key === key);
    return pair ? pair.value : undefined;
  }

  delete(key: K): boolean {
    const i = this.hash(key);
    const bucket = this.table[i];
    const pi = bucket.findIndex((e: KeyValue<K, V>) => e.key === key);

    if (pi === -1) {
      return false;
    }

    bucket.splice(pi, 1);
    this.size--;
    return true;
  }
}
