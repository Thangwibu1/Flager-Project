import type { Record, Relationship } from "neo4j-driver";
import { UserGraph } from "./user.model.neo4j";

export class FriendRequestRelationGraph {
  readonly fromUser: UserGraph;
  readonly toUser: UserGraph;
  readonly createdAt: Date;
  constructor(
    props: {createdAt: Date, fromUser: UserGraph, toUser: UserGraph}
  ) {
    this.createdAt = props.createdAt;
    this.toUser = props.toUser;
    this.fromUser = props.fromUser;
  }
  static fromNeo4j(record: Record, key: {fromNode: string, toNode: string, relation: string}): FriendRequestRelationGraph{
    const fromNode = record.get(key.fromNode);
    const toNode = record.get(key.toNode);
    const r: Relationship = record.get(key.relation);
    const p = r.properties;
    return new FriendRequestRelationGraph({
      fromUser: UserGraph.fromNeo4j(fromNode),
      toUser: UserGraph.fromNeo4j(toNode),
      createdAt: new Date(p.createdAt)
    });
  }
}
