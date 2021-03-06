import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddonDetailComponent, AddonDetailModel } from "./addon-detail.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddonService } from "../../services/addons/addon.service";
import {
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
} from "@ngx-translate/core";
import { Subject} from "rxjs";
import { AddonUpdateEvent } from "../../models/wowup/addon-update-event";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { httpLoaderFactory } from "../../app.module";
import { TranslateMessageFormatCompiler } from "ngx-translate-messageformat-compiler";
import { AddonViewModel } from "../../business-objects/my-addon-list-item";
import { Addon } from "../../entities/addon";
import { MatModule } from "../../mat-module";

describe("AddonDetailComponent", () => {
  let component: AddonDetailComponent;
  let fixture: ComponentFixture<AddonDetailComponent>;
  let addonService: AddonService;
  let dialogModel: AddonDetailModel;
  let addonServiceSpy: any;

  beforeEach(async () => {
    addonServiceSpy = jasmine.createSpyObj("AddonService", ["logDebugData"], {
      addonInstalled$ : new Subject<AddonUpdateEvent>().asObservable(),
    });

    const viewModel = new AddonViewModel({
      installedVersion: "1.0.0",
      externalId: '52001',
    } as Addon);

    dialogModel = {listItem: viewModel} as AddonDetailModel;

    await TestBed.configureTestingModule({
      declarations: [AddonDetailComponent],
      imports: [
        MatModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpLoaderFactory,
            deps: [HttpClient],
          },
          compiler: {
            provide: TranslateCompiler,
            useClass: TranslateMessageFormatCompiler,
          },
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogModel },
      ]
    }).overrideComponent(AddonDetailComponent, {
      set: {
        providers: [
          { provide: AddonService, useValue: addonServiceSpy },
        ]},
    }).compileComponents();

    fixture = TestBed.createComponent(AddonDetailComponent);
    component = fixture.componentInstance;
    addonService = fixture.debugElement.injector.get(AddonService);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
