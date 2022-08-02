import uuid from "react-native-uuid";
import bigDecimal from "js-big-decimal";
import React, { useState } from "react";
import { SchemaPropertyValue } from "../..";
import { BoolInput } from "./BoolInput";
import { DateInput } from "./DateInput";
import { IntInput } from "./IntInput";
import { StringInput } from "./StringInput";
import { UUIDInput } from "./UUIDInput";
import { ListInput } from "./ListInput";
import moment from "moment";
import { MixedInput } from "./MixedInput";
import { DecimalInput } from "./DecimalInput";
import { SetInput } from "./SetInput";
import { DataInput } from "./DataInput";
import { DictionaryInput } from "./DictionaryInput";

export type TypeInputProps = {
  property: SchemaPropertyValue;
  value: any;
  set: (val: any) => void;
  style?: Object;
};

export const getDefault = (property: SchemaPropertyValue) => {
  if (property.optional && property.type != "dictionary") return null;

  const type = property.type;
  switch (type) {
    case "int":
    case "float":
    case "double":
      return 0;
    case "bool":
      return false;
    case "date":
      return moment(new Date());
    case "uuid":
      return uuid.v4();
    case "decimal128":
      return new bigDecimal();
    case "string":
      return "";
    case "list":
      return [];
    case "set":
      return new Set();
    case "dictionary":
      return new Object();
    default:
      return null;
  }
};

export const TypeInput = (props: TypeInputProps) => {
  // const clearButton = 
  switch (props.property.type) {
    case "int":
    case "float":
    case "double":
      return <IntInput {...props} />;
    case "string":
      return <StringInput {...props} />;
    case "bool":
      return <BoolInput {...props} />;
    case "date":
      return <DateInput {...props} />;
    case "uuid":
      return <UUIDInput {...props} />;
    case "set":
      return <SetInput {...props} />;
    case "list":
      return <ListInput {...props} />;
    case "mixed":
      return <MixedInput {...props}/>;
    case 'decimal128':
      return <DecimalInput {...props} />;
    case "data":
        return <DataInput {...props} />;
    case "dictionary":
        return <DictionaryInput {...props} />;
    default:
      return <>Input for {props.property.type} not implemented!</>;
  }
};
