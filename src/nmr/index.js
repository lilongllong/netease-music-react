import ApplicationController from "./app/ApplicationController";

function run()
{
    const applicationController = new ApplicationController({
        viewOptions: {
            
        }
    });
    applicationController.run();

}

$(run());
