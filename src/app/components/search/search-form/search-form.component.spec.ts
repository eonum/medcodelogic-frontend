import { Catalog } from '../../../catalog/catalog';
import { CHOPCatalog } from '../../../catalog/chop.catalog';
import { ICDCatalog } from '../../../catalog/icd.catalog';
import { SwissDrgCatalog } from '../../../catalog/swissdrg.catalog';
import { CorrectVersionPipe } from '../../../pipes/correct-version.pipe';
import { ActivatedRouteStub, RouterStub } from '../../../router-stub';
import { CatalogServiceMock } from '../../../service/catalog.service.mock';
import { ICatalogService } from '../../../service/i.catalog.service';
import { NullLoggerService } from '../../../service/logging/null.logger.service';
import { SearchFormComponent } from './search-form.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ng2-bootstrap';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let catalogService: ICatalogService;
  let catalog: Catalog;
  let query: string;
  let buttons: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        ModalModule.forRoot(),
      ],
      declarations: [SearchFormComponent, CorrectVersionPipe
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        SwissDrgCatalog, CHOPCatalog, ICDCatalog,
        { provide: 'ICatalogService', useClass: CatalogServiceMock },
        { provide: 'ILoggerService', useClass: NullLoggerService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;

    catalogService = fixture.debugElement.injector.get('ICatalogService');
    buttons = fixture.debugElement.queryAll(By.css('button'));

    catalog = new SwissDrgCatalog(catalogService, new NullLoggerService());
    component.catalog = catalog;
    component.query = 'Search query';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the catalog names', () => {
    console.log(buttons[0]);
    console.log('Buttons');
  });
});
