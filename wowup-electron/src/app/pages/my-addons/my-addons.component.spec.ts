import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddonService } from "../../services/addons/addon.service";
import { SessionService } from "../../services/session/session.service";
import { MatDialog } from "@angular/material/dialog";
import { WowUpService } from "../../services/wowup/wowup.service";
import { TranslateCompiler, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { ElectronService } from "../../services";
import { WarcraftService } from "../../services/warcraft/warcraft.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { httpLoaderFactory } from "../../app.module";
import { TranslateMessageFormatCompiler } from "ngx-translate-messageformat-compiler";
import { OverlayModule } from "@angular/cdk/overlay";
import { MyAddonsComponent } from "./my-addons.component";
import { WowUpAddonService } from "../../services/wowup/wowup-addon.service";
import { BehaviorSubject, Subject } from "rxjs";
import { AddonUpdateEvent } from "../../models/wowup/addon-update-event";
import { SortOrder } from "../../models/wowup/sort-order";
import { WowClientType } from "../../models/warcraft/wow-client-type";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatModule } from "../../mat-module";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("MyAddonsComponent", () => {
  let component: MyAddonsComponent;
  let fixture: ComponentFixture<MyAddonsComponent>;
  let electronService: ElectronService;
  let electronServiceSpy: any;
  let wowUpService: WowUpService;
  let wowUpServiceSpy: any;
  let wowUpAddonService: WowUpAddonService;
  let wowUpAddonServiceSpy: any;
  let sessionService: SessionService;
  let sessionServiceSpy: any;
  let addonService: AddonService;
  let addonServiceSpy: any;
  let warcraftService: WarcraftService;
  let warcraftServiceSpy: any;

  beforeEach(async () => {
    wowUpAddonServiceSpy = jasmine.createSpyObj("WowUpAddonService", {
      persistUpdateInformationToWowUpAddon: () => {},
    });
    addonServiceSpy = jasmine.createSpyObj("AddonService", {
      getAddons: Promise.resolve([]),
    }, {
      addonInstalled$: new Subject<AddonUpdateEvent>().asObservable(),
      addonRemoved$: new Subject<string>().asObservable(),
    })
    wowUpServiceSpy = jasmine.createSpyObj("WowUpService", [""], {
      myAddonsSortOrder: {name: "test sort", direction: "asc"} as SortOrder,
    })
    sessionServiceSpy = jasmine.createSpyObj("SessionService", [""], {
      selectedHomeTab$: new BehaviorSubject(0).asObservable(),
      autoUpdateComplete$: new BehaviorSubject(0).asObservable(),
    })
    warcraftServiceSpy = jasmine.createSpyObj("WarcraftService", [""], {
      installedClientTypesSelectItems$: new BehaviorSubject<WowClientType[] | undefined>(undefined).asObservable(),
    })
    electronServiceSpy = jasmine.createSpyObj("ElectronService", [""], {
      isWin : false,
      isLinux : true,
      isMac: false,
    });

    await TestBed.configureTestingModule({
      declarations: [MyAddonsComponent],
      imports: [
        MatModule,
        OverlayModule,
        HttpClientModule,
        BrowserAnimationsModule,
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
      providers: [
        MatDialog,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).overrideComponent(MyAddonsComponent, {
      set: {
        providers: [
          { provide: AddonService, useValue: addonServiceSpy },
          { provide: WowUpService, useValue: wowUpServiceSpy },
          { provide: WowUpAddonService, useValue: wowUpAddonServiceSpy },
          { provide: ElectronService, useValue: electronServiceSpy },
          { provide: SessionService, useValue: sessionServiceSpy },
          { provide: WarcraftService, useValue: warcraftServiceSpy },
        ]},
    }).compileComponents();

    fixture = TestBed.createComponent(MyAddonsComponent);
    component = fixture.componentInstance;
    addonService = fixture.debugElement.injector.get(AddonService);
    wowUpService = fixture.debugElement.injector.get(WowUpService);
    wowUpAddonService = fixture.debugElement.injector.get(WowUpAddonService);
    electronService = fixture.debugElement.injector.get(ElectronService);
    sessionService = fixture.debugElement.injector.get(SessionService);
    warcraftService = fixture.debugElement.injector.get(WarcraftService);

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.debugElement.nativeElement.remove();
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
