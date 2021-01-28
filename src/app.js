import { makeRe } from "minimatch";

export class App {
  constructor() {
    this.url = "http://192.168.0.105";
    this.port = "8080";
    this.routes;
    this.hwInfo;
    this.piInfo;
    this.updated = true;
    this.time = this.tick();

    this.fastlinks = [
      {
        name: "Twitch",
        url: "https://twitch.tv/",
      },
      {
        name: "Youtube",
        url: "https://youtube.com/",
      },
      {
        name: "Github",
        url: "https://github.com/",
      },
      {
        name: "Twitter",
        url: "https://twitter.com/",
      },
    ];

    this.getRoutes();
    this.getHwInfo();
    this.getPiInfo();
    this.startClock();
  }

  async makeRequest(route) {
    const req = await fetch(`${this.url}:${this.port}/${route}`);
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
    this.clock = setInterval(() => (this.time = this.tick()), 1000);
    document.addEventListener("unload", () => clearInterval(this.clock));
  }

  tick() {
    let d = new Date();
    d.setHours(d.getHours() + 1);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}
