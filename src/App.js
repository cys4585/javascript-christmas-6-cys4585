import ChristmasEvent from "./ChrismasEvent/index.js";

class App {
  async run() {
    await new ChristmasEvent().run();
  }
}

export default App;
