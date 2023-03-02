import SyntaxHighlighter from "react-syntax-highlighter"
import { docco, vs, github, tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs"

const CodeContainer = ({code}) => {

    return (
        <div>
            <SyntaxHighlighter 
                children={code}
                language="javascript" 
                showLineNumbers
                style={tomorrowNight}
                wrapLines={true}
                wrapLongLines={true}
            />
        </div>
    )
}

export default CodeContainer