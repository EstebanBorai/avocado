import { DataItemKind, DataItem, DataType } from "../typings/console";

function makeDataItem(kind: DataItemKind, message: any, data: any): DataItem {
  return {
    kind,
    message,
    data,
    dataType: DataType.Unknown,
    rawData: data
  }
}

export default makeDataItem;
