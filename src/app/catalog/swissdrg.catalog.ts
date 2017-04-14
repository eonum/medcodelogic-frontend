import {Catalog} from './catalog';
import {Inject, Injectable} from '@angular/core';
import { ICatalogService } from '../service/i.catalog.service';
import { ILoggerService } from "../service/i.logger.service";

/**
 * Concrete implementation of catalog class for the SwissDRG catalog.
 */
@Injectable()
export class SwissDrgCatalog extends Catalog {

  constructor( @Inject("ICatalogService") service: ICatalogService, @Inject('ILoggerService') logger: ILoggerService) {
    super(service, logger, "SwissDRG", {
      searchableTypes: ["drgs"], 
      retrievableTypes: ["drgs", "adrgs", "partition", "mdcs"], 
      versionParam: "drgs", 
      rootElementType: 'mdcs'
    });
  }

  protected getRootElementCode(): string {
    return 'ALL';
  }
}
