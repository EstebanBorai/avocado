export type LogKind = "Error"
  | "Warning"
  | "Info";

export interface Log {
  kind?: LogKind;
  text: string;
  data?: any;
}
