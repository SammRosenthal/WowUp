import { ElectronService } from "./electron.service";

class StubbedElectronService extends ElectronService {
  public get isElectron(): boolean {
    return false;
  }
}

describe("ElectronService", () => {
  it("should be created", () => {
    const service: ElectronService = new StubbedElectronService();
    expect(service).toBeTruthy();
  });
});
