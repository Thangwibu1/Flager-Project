import type { Relationship } from "neo4j-driver";
import * as neo4jConverter from '../../utils/converters/neo4j.converter.util';
export interface IIsFriendRelation {
  createdAt: Date;
}
export class IsFriendRelation {
  readonly createdAt: Date;
  constructor(
    props: IIsFriendRelation
  ) {
    this.createdAt = props.createdAt;
  }
  static formatRaw(r: Relationship): IsFriendRelation{
    const p = r.properties;
    return new IsFriendRelation({
      createdAt: neo4jConverter.toPureDate(p.createdAt)
    });
  }
}
