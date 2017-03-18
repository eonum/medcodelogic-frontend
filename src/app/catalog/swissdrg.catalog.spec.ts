import { async } from "@angular/core/testing";
import { SwissDrgCatalog } from "./swissdrg.catalog";
import { CatalogServiceMock } from "../service/catalog.service.mock";
import {Catalog} from './catalog';

describe("SwissDrgCatalog", () => {
    it('Should get a list of versions', async(() => {
        let catalog : Catalog = new SwissDrgCatalog(new CatalogServiceMock());
        catalog.loadVersions().subscribe(versions => {
            expect(versions.length).toBe(4);
        });
    }));

    it('Should return a list of results', async(() => {
        let catalog : SwissDrgCatalog = new SwissDrgCatalog(new CatalogServiceMock());
        catalog.search("V1.0", "Content").then(results => {
            expect(results.length).toBe(7);
        })
    }));

    it('Should return a single result by code', async(() => {
        let catalog : SwissDrgCatalog = new SwissDrgCatalog(new CatalogServiceMock());
        catalog.search("V1.0", "P20A").then(results => {
            expect(results.length).toBe(1);
        })
    }));
    it('Should throw an error because no code found', async(() => {
        let catalog : SwissDrgCatalog = new SwissDrgCatalog(new CatalogServiceMock());
        catalog.search("V1.0", "P23").then(result => { fail("Got unexpected result") }).catch(reason => {})
    }));
});
