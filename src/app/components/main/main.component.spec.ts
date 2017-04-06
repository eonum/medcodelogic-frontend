import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { SearchFormComponent } from '../search/search-form/search-form.component';
import { SearchResultsComponent } from '../search/search-results/search-results.component';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRouteStub, RouterStub } from '../../router-stub';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CatalogServiceMock } from '../../service/catalog.service.mock';
import { ICDCatalog } from '../../catalog/icd.catalog';
import { CHOPCatalog } from '../../catalog/chop.catalog';
import * as TypeMoq from "typemoq";
import { ICatalogService } from '../../service/i.catalog.service';
import { SwissDrgCatalog } from '../../catalog/swissdrg.catalog';
import { CatalogElement } from '../../model/catalog.element';
import { ModalModule } from 'ng2-bootstrap';
import {DetailComponent} from '../details/detail/detail.component';
import {DetailSwissDrgComponent} from '../details/detail-swiss-drg/detail-swiss-drg.component';
import {DetailIcdComponent} from '../details/detail-icd/detail-icd.component';
import {DetailChopComponent} from "../details/detail-chop/detail-chop.component";

describe('MainComponent', () => {

  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  let route: ActivatedRouteStub;
  let mock: TypeMoq.IMock<SwissDrgCatalog>

  /*Test data*/

  const query: string = 'Some search query';
  const version: string = 'V4.0';
  const searchResults: CatalogElement[] = [
    {
      code: 'Content 1', text: 'Description content 1', url: '/url/to/content1',
      highlight: { text: ['content'], relevantCodes: [] }, type: 'drg'
    },
    {
      code: 'Content 2', text: 'Description content 2', url: '/url/to/content2',
      highlight: { text: ['2'], relevantCodes: [] }, type: 'drg'
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        SearchFormComponent,
        SearchResultsComponent,
        DetailComponent,
        DetailSwissDrgComponent,
        DetailChopComponent,
        DetailIcdComponent

      ],
      imports: [RouterModule, TranslateModule.forRoot(), ModalModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        SwissDrgCatalog, CHOPCatalog, ICDCatalog,
        { provide: 'ICatalogService', useClass: CatalogServiceMock }
      ]
    })
      .compileComponents();
  }));

  // TODO move to SearchResults and SearchForm Components

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;

    // Set up a catalog mock
    mock = TypeMoq.Mock.ofType<SwissDrgCatalog>();
    mock.setup(x => x.getActiveVersion()).returns(() => version);
    mock.setup(x => x.search(version, query)).returns(() => Promise.resolve(searchResults));

    // Set up the activated route stub
    route = fixture.debugElement.injector.get(ActivatedRoute);
    route.setCatalog(mock.object);
    route.setTestParams({ 'query': query });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should store the catalog', () => {
    expect(component.catalog).toBe(mock.object);
  });

  it('should store the query', () => {
    expect(component.query).toBe(query);
  });

  it('should call the catalogs search function and set the results', () => {
    fixture.whenStable().then(() => {
      // search should now be finished and the results set
      expect(component.searchResults).toBe(searchResults);
    });
  });
});