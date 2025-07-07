import { InvalidDataMap } from "./invalidData";

export const INVALID_DATA: InvalidDataMap = {
      'missingTitle': { errorCode: 1, errorMessage: 'Title is required', isActive: false },
      'missingAuthor': { errorCode: 2, errorMessage: 'Author is required', isActive: false },
      'missingPages': { errorCode: 3, errorMessage: 'Number of pages is required', isActive: false},
      'invalidPages': { errorCode: 4, errorMessage: 'Number of pages must be a number above 0', isActive: false },
      'existingBook': { errorCode: 5, errorMessage: 'This book is already in the list', isActive: false }
    };