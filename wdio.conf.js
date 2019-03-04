exports.config = {
  hostname: "localhost",
  port: 4444,
  path: "/wd/hub",
  specs: ["./tests/*.ts"],
  sync: true,
  services: ["selenium-standalone"],
  capabilities: [
    {
      browserName: "chrome",
      maxInstances: 1
    }
  ],
  baseUrl: "http://ip-5236.sunline.net.ua:38015",
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 120000
  },
  reporters: ['spec'],
  before: function(capabilities, specs) {
    process.env.TS_NODE_FILES = true;
    require("ts-node").register();
  }
};
