import dateformat from "dateformat";

export function getTimestamp(): string {
   return dateformat("yymmddHMs");
}
