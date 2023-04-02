declare module "html-to-react" {
    import * as React from "react"

    export class Parser {
        parse(html: string): React.ReactNode
    }

    export class ProcessNodeDefinitions {
        constructor(react: typeof React)
        defaultInstructions(): any
    }
}
