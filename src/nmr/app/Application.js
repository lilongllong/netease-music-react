import PlayList from "../components/PlayList";

export default class Application
{
    constructor(...props)
    {
        // settting the width and height ...
        this.$element = $("<div />");
        this.$element.addClass("nmr-app");
        this._initLayout();
    }

    _initLayout()
    {
        const $layout = $(`
                <header><h1>网易云音乐</h1></header>
                <main>
                    <aside class="sidebar"></aside>
                    <section class="content"></section>
                </main>
                <footer></footer>
            `);
        this.$element.append($layout);
    }
}
