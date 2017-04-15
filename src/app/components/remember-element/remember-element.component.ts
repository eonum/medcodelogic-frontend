import { Component, OnInit, Inject } from '@angular/core';
import { RememberElementService } from "../../service/remember.element.service";
import { RememberedElement } from "../../model/remembered.element";
import { Router, ActivatedRoute } from "@angular/router";
import { ILoggerService } from "../../service/i.logger.service";

@Component({
  selector: 'app-remember-element',
  templateUrl: './remember-element.component.html',
  styleUrls: ['./remember-element.component.css']
})
export class RememberElementComponent implements OnInit {

  public rememberedElements: RememberedElement[];

  constructor(private rememberService: RememberElementService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject('ILoggerService') private logger: ILoggerService) { }

  ngOnInit() {
    this.rememberService.subscribe(() => {
      this.loadRememberedElements();
    });
    this.loadRememberedElements();
  }

  private loadRememberedElements(): void {
    this.rememberedElements = this.rememberService.getRememberedElements();
  }

  private openCode(element: RememberedElement): void {
    this.router.navigate([element.language, element.catalog, element.version, element.type, element.code])
      .catch(error => this.logger.log(error.message));
  }

  private removeElement(code: string): void {
    this.rememberService.remove(code);
  }
}