import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  notes$: Observable<any[]>;
  notes = [];

  constructor(
    private notesService: NotesService,
    private db: AngularFireDatabase
  ) {
    this.notes$ = this.db.list('/notes').valueChanges();
  }

  ngOnInit(): void {}
}
