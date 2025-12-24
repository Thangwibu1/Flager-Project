import type { Record, Relationship } from "neo4j-driver";
import { UserNode } from "./user.model.neo4j";
import * as neo4jConverter from '../../utils/converters/neo4j.converter.util';
export class FriendRequestRelation {
  readonly fromUser: UserNode;
  readonly toUser: UserNode;
  readonly createdAt: Date;
  constructor(
    props: {createdAt: Date, fromUser: UserNode, toUser: UserNode}
  ) {
    this.createdAt = props.createdAt;
    this.toUser = props.toUser;
    this.fromUser = props.fromUser;
  }
  static formatRaw(record: Record, key: {fromNode: string, toNode: string, relation: string}): FriendRequestRelation{
    const fromNode = record.get(key.fromNode);
    const toNode = record.get(key.toNode);
    const r: Relationship = record.get(key.relation);
    const p = r.properties;
    return new FriendRequestRelation({
      fromUser: UserNode.formatRaw(fromNode),
      toUser: UserNode.formatRaw(toNode),
      createdAt: neo4jConverter.toPureDate(p.createdAt)
    });
  }
}
