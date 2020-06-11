import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private db: AngularFireDatabase) {}

  save(notes) {
    this.db.list('/notes').push(notes);
    console.log('submitted');
  }
}
