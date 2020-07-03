import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { Table } from '../shared/Table.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  rows: Table[];
  constructor(private tableService: TableServiceService,
              private router: Router) {}

  ngOnInit(): void {
    this.tableService.getRows().forEach(row => {
      if(row.priority === 'High') row['sort'] = 1;
      if(row.priority === 'Medium') row['sort'] = 2;
      if(row.priority === 'Low') row['sort'] = 3;
    }) 
    this.rows = this.tableService.getRows().sort((a,b) => a['sort'] - b['sort']);
  }
  onDelete(id: number) {
    this.tableService.deleteRow(id);
  }
  onUpdate(id: number) {
    this.router.navigate(['form', id]);
  }
}
