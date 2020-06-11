import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { EditorComponent } from './editor/editor.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotesService } from './notes.service';
import { NotesComponent } from './notes/notes.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    NavbarComponent,
    NotesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularEditorModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([{ path: '', component: AppComponent }]),
    AngularFireDatabaseModule,
  ],
  providers: [NotesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
