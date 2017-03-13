import { Component, OnInit } from "@angular/core";
import { SwissDrgCatalog } from "../../catalog/swissdrg.catalog";
import { CatalogElement } from "../../model/catalog.element";
import { CatalogService } from "../../service/catalog.service";

@Component({
    selector: 'search-component',
    templateUrl: 'search.component.html',
    providers: [ SwissDrgCatalog, CatalogService ]
})
export class SearchComponent implements OnInit {
    public ngOnInit(): void {
        this.getSearchResults("");
    }

    private searchResults: CatalogElement[];

    public constructor(private swissDrgCatalog: SwissDrgCatalog){

    }

    public search(query: string): void {
        this.getSearchResults(query);
    }

    private getSearchResults(query: string): void {
        this.swissDrgCatalog.search("V1.0", query)
            .then(results => {
                this.searchResults = results;
            })
            .catch(error => {
                this.handleError()
            });
    }

    private handleError(): void {
    }
}
