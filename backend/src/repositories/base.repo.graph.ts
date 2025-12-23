import { ManagedTransaction } from 'neo4j-driver';
import { neo4jClient } from '../config/database/neo4j.config';

export abstract class BaseGraphRepo {
  /**
   * Hàm giúp query/count dưới db và trả về kiểu dữ liệu mà callback trả
   * @param cb callback được truyền vào để thực thi
   * @returns 
   */
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
  /**
   * Hàm giúp update/delete dưới db và trả về kiểu dữ liệu mà callback trả
   * @param cb callback được truyền vào để thực thi
   * @returns 
   */
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
