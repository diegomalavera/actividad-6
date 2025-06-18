import "bootstrap";
import { IndexController } from "./controller/index.controller";

class Application {
    indexController: IndexController | undefined;

    run(): void {
        this.indexController = new IndexController();
    }
}

const application: Application = new Application();
application.run();
