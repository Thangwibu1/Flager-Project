import { Relationship } from "neo4j-driver";
import { ReactName } from "../../config/enum/post.enum";
import * as neo4jUtil from '../../utils/converters/neo4j.converter.util';
export interface ISendReactRelation {
  name: ReactName;
}
export class SendReactRelation {
  readonly name: ReactName;
  constructor(
    props: { name: ReactName}
  ) {
    this.name = props.name;
  }
  static formatRaw(r : Relationship): SendReactRelation{
    const p = r.properties;
    return new SendReactRelation({
      name: p.name
    });
  }
}