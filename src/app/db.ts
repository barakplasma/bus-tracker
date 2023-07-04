import Dexie, { Table } from 'dexie';

export class AppDB extends Dexie {
  locations!: Table<GeolocationPosition, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(4).stores({
      locations: '++id, timestamp',
    });
  }
}

export const db = new AppDB();
