import {Component, Input} from '@angular/core';
import { environment } from '../../../environments/environment';
import {SwissDrgCatalog} from '../../catalog/swissdrg.catalog';
import {CHOPCatalog} from '../../catalog/chop.catalog';
import {ICDCatalog} from '../../catalog/icd.catalog';
import {CatalogService} from '../../service/catalog.service';
import {CatalogElement} from '../../model/catalog.element';
import {Catalog} from '../../catalog/catalog';

@Component({
    selector: 'search-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css'],
})

export class ResultsComponent {
    @Input() searchResults: CatalogElement[];
}
