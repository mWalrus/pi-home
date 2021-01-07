import { makeRe } from "minimatch";

export class App {
  constructor() {
    this.url = "http://85.229.117.218";
    this.appid = "0ff4e2b9-4297-4cbc-998b-ad39bc213454";
    this.routes;
    this.hwInfo;
    this.piInfo;
    this.updated = true;
    this.time = new Date().toLocaleTimeString("SE");

    this.getRoutes();
    this.getHwInfo();
    this.getPiInfo();
    this.startClock();
  }

  async makeRequest(route) {
    const req = await fetch(`${this.url}:8081/${route}?appid=${this.appid}`);
    const res = await req.json();
    return res;
  }

  async getRoutes() {
    const r = await this.makeRequest("apps");
    this.routes = r.dirs;
  }

  async getHwInfo() {
    const r = await this.makeRequest("hwinfo");
    this.hwInfo = r;
  }

  async getPiInfo() {
    const r = await this.makeRequest("pihole");
    this.updated = r.current === r.latest;
    this.piInfo = r;
  }

  startClock() {
    this.clock = setInterval(() => this.tick(), 1000);
    document.addEventListener("unload", () => clearInterval(this.clock));
  }

  tick() {
    this.time = new Date().toLocaleTimeString("SE");
  }
}
