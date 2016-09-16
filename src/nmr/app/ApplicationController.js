import Application from "./Application";

export default class ApplicationController
{
    constructor(props)
    {
        this.view = this.createView(props.viewOptions);
    }

    createView(props)
    {
        return new Application(props);
    }

    run()
    {
        $(document.body).append(this.view.$element);
    }
}
