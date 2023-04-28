import dateformat from "dateformat";

export function getTimestamp(format?: string): string {
   if (format) {
      return dateformat(format);
   } else {
      return dateformat("yymmddHMs");
   }
}

export function getRandomNumber(minimumNumber: number, maximumNumber: number): number {
   return Math.floor(Math.random() * (maximumNumber - minimumNumber + 1) + minimumNumber);
}
