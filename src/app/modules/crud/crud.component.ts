import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ElementData } from '../../shared/interfaces/element';
import { ElementsService } from '../../core/services/Elements.service';
import { tap } from 'rxjs/operators';





@Component({
    selector: 'app-crud',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './crud.component.html',
  styles: `
    :host {
        display: block;
    }
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class CrudComponent implements OnInit { 
    
    public elementData: ElementData[]=[];
    displayedColumns: string[] = ['position', 'name', 'molar', 'symbol', 'controls'];
    dataSource =  new MatTableDataSource<ElementData>(this.elementData);
    
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private fb: FormBuilder,
        private es: ElementsService,
        ) { }
        
        ngOnInit(): void {
            this.es.getElements()
            .pipe(
                tap(elements => {
          this.elementData = elements;
        })
      )
      .subscribe(elements => {
          this.elementData = elements;
          this.dataSource = new MatTableDataSource<ElementData>(this.elementData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          
        });
  }
    newElement = this.fb.group({
        position: ['', Validators.required],
        name:     ['', Validators.required],
        molar:   ['', Validators.required],
        symbol:   ['', Validators.required],
    })
    
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    }
    
    onSubmit(): void {
       this.es.addElements
       console.log(this.newElement.value) 
    }
 }
