export interface DateHandler {
    isAfter(input: DateHandler.isAfter.Input): DateHandler.isAfter.Ouput
    getNow(): DateHandler.getNow.Ouput
}

export namespace DateHandler.isAfter {
    export type Input = {
        fromDate: string
        toDate: string
    }
    export type Ouput = boolean
}

export namespace DateHandler.getNow {
    export type Ouput = string
}