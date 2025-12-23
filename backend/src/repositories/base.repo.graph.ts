import { ManagedTransaction } from 'neo4j-driver';
import { neo4jClient } from '../config/database/neo4j.config';

export abstract class BaseGraphRepo {
  protected async read<T>(
    cb: (tx: ManagedTransaction) => Promise<T>
  ): Promise<T> {
    const session = neo4jClient.getSession('READ');
    try {
      return await session.executeRead(cb);
    } finally {
      await session.close();
    }
  }

  protected async write<T>(
    cb: (tx: ManagedTransaction) => Promise<T>
  ): Promise<T> {
    const session = neo4jClient.getSession('WRITE');
    try {
      return await session.executeWrite(cb);
    } finally {
      await session.close();
    }
  }
}
