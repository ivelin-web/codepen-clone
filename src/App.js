import { useEffect, useState } from "react";
import Editor from "./components/Editor";

function App() {
    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");
    const [srcDoc, setSrcDoc] = useState("");
    const [openPreview, setOpenPreview] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <head>
                        <style>${css}</style>
                    </head>
                    <body>
                        ${html}
                        <script>${js}</script>
                    </body
                </html>`);

            if (html) {
                openPreview !== true && setOpenPreview(true);
            } else {
                openPreview !== false && setOpenPreview(false);
            }
        }, 750);

        return () => {
            clearTimeout(timeout);
        };
    }, [html, css, js]);

    return (
        <>
            <section className="pane top-pane">
                <Editor language="xml" displayName="HTML" value={html} onChange={setHtml} />
                <Editor language="css" displayName="CSS" value={css} onChange={setCss} />
                <Editor language="javascript" displayName="JS" value={js} onChange={setJs} />
            </section>
            {openPreview ? (
                <section className="pane">
                    <iframe srcDoc={srcDoc} title="output" sandbox="allow-scripts" frameBorder="0" width="100%" height="100%" />
                </section>
            ) : (
                <section className="no-content-container">
                    <h4>Add some html to preview</h4>
                </section>
            )}
        </>
    );
}

export default App;
