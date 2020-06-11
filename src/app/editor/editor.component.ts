import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import * as XLSX from 'xlsx';
import { AngularFireDatabase } from 'angularfire2/database';
import * as FileSaver from 'file-saver';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
interface temp {
  data: string;
}

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  fileName = 'ExcelSheet.xlsx';
  notes: temp[] = [];
  col = [['data']];
  rows = [];

  constructor(
    private notesService: NotesService,
    private db: AngularFireDatabase
  ) {
    this.rows.length = 0;
    this.db
      .list<temp>('/notes')
      .valueChanges()
      .subscribe((res: temp[]) => {
        res.forEach((item) => {
          this.rows.push([item.data]);
          let obj = {
            data: item.data,
          };
          this.notes.push(obj);
        });
      });
  }

  onClickSubmit(data) {
    this.saveNotes(data.value.editor);
  }

  saveNotes(data) {
    this.notesService.save({ data });
    location.reload();
  }

  exportpdf(): void {
    const doc = new jsPDF();
    // console.log(this.col);
    // console.log(this.rows);
    // console.log(this.notes);
    doc.autoTable({
      head: this.col,
      body: this.rows,
    });
    doc.save('Notes.pdf');
  }

  exportexcel(): void {
    console.log(this.notes);
    this.exportAsExcelFile(this.notes, 'sample');
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
