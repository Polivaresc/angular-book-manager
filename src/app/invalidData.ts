export interface InvalidData {
    errorCode: number;
    errorMessage: string;
    isActive: boolean
}

export type InvalidDataMap = {
    [errorType: string]: InvalidData;
}