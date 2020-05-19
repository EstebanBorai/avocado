export type MessageKind = 'Error' | 'Warning' | 'Info';

export type ObjectLiteral = { property: string; };

export type MessageData = string[] | string | ObjectLiteral;

export interface Message {
  kind?: MessageKind;
  text: string;
  data?: MessageData;
}
