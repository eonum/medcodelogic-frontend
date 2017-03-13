import { Injectable } from "@angular/core";
import { CatalogElement } from "../model/catalog.element";
import { CatalogService } from "../service/catalog.service";

/**
 * Class representing a catalog containing medical
 * information. Allows searching and navigating
 * within a catalog.
 */
@Injectable()
export abstract class Catalog {
    protected name: string;
    protected codeRegex: string;
    protected service: CatalogService;

    public constructor(service: CatalogService){
        this.service = service;
    }

    /**
     * Searches elements within the catalog.
     * @param version the version of the catalog to use
     * @param query the query to search for
     */
    public async search(version: string, query: string): Promise<CatalogElement[]> {
        if (this.isCode(query)){
            let singleResult = await this.getByCode(version, query);
            let result : CatalogElement[] = [];
            if (singleResult != null){
                result.push(singleResult);
            }
            return Promise.resolve(result);
        }
        else {
            return await this.getBySearch(version, query);
        }
    }

    private isCode(query: string): boolean {
        let regex = new RegExp(this.codeRegex);
        return regex.test(query);
    }    

    protected async getBySearch(version: string, query: string): Promise<CatalogElement[]> {
        return this.service.search(version, query);
    }

    protected async getByCode(version: string, code: string): Promise<CatalogElement> {
        return this.service.getByCode(version, code);
    }

    public async getVersions(): Promise<string[]> {
        return this.service.getVersions();
    }
}