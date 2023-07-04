import Dexie, { Table } from 'dexie';

export class AppDB extends Dexie {
  locations!: Table<GeolocationPosition, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(1).stores({
      locations: '++id, geolocationposition',
    });
  }
}

export const db = new AppDB();
