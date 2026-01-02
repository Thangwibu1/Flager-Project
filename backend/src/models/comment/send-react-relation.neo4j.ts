import { Relationship } from "neo4j-driver";
import { ReactName } from "../../config/enum/post.enum";
import { toPureDate } from "../../utils/converters/neo4j.converter.util";
export interface ISendReactRelation {
  name: ReactName;
  createdAt: Date;
}
export class SendReactRelation {
  readonly name: ReactName;
  readonly createdAt: Date;
  constructor(
    props: ISendReactRelation
  ) {
    this.name = props.name;
    this.createdAt = props.createdAt;
  }
  static formatRaw(r : Relationship): SendReactRelation{
    const p = r.properties;
    return new SendReactRelation({
      name: p.name,
      createdAt: toPureDate(p.createdAt)
    });
  }
}