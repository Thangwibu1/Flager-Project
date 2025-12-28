import { Relationship } from 'neo4j-driver';
import * as neo4jConverter from '../../utils/converters/neo4j.converter.util';
export interface IRequestFriendRelation{
  createdAt: Date,
}
export class RequestFriendRelation {
  readonly createdAt: Date;
  constructor(
    props: IRequestFriendRelation
  ) {
    this.createdAt = props.createdAt;
  }
  static formatRaw(r: Relationship): RequestFriendRelation{
    const p = r.properties;
    return new RequestFriendRelation({
      createdAt: neo4jConverter.toPureDate(p.createdAt)
    });
  }
}
