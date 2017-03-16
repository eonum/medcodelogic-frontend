import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { TranslateService, TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpLoaderFactory } from "./app.module";
import {SearchComponent} from "./components/search/search.component";
import { HttpModule, Http } from "@angular/http";
import { CatalogComponent } from "./components/catalog/catalog.component";
import { CatalogSelectComponent } from "./components/catalog-select/catalog-select.component";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [Http]
          }
        })
      ],
      declarations: [
        AppComponent,
        SearchComponent,
        CatalogComponent,
        SearchComponent,
        CatalogSelectComponent
      ],
      providers: [  ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'medCodeSearch'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('medCodeSearch');
  }));

  it('should render title as a link', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain('medCodeSearch');
  }));
});
