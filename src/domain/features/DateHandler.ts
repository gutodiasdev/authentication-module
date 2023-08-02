export interface DateHandler {
    isAfter(input: DateHandler.isAfter.Input): DateHandler.isAfter.Ouput
    getNow(): DateHandler.getNow.Ouput
    getExpirationDate(input: DateHandler.getExpirationDate.Input): DateHandler.getExpirationDate.Ouput
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

export namespace DateHandler.getExpirationDate {
    export type Input = {
        addDaysFromNow: number
    }
    export type Ouput = string
}