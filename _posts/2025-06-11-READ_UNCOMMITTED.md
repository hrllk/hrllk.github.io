---
 title: READ_UNCOMMITTED
 categories:
    - java
    - troubleShooting
published: false
---

<!-- TODO:  -->

### overview
> `READ_UNCOMMITTED` is the lowest isolation level in database transaction management. It allows a transaction to read data that has been modified by other transactions but not yet committed. This means that a transaction operating under `READ_UNCOMMITTED` can see "dirty" data.


낮은 독립레벨의 트랜잭션 관리
그것은 허용한다. 트랜잭션에 대한 데이터에 대한 접근에 대해 다른 트랜잭션에의해 수정된 하지만 아직 커밋되지않은 
즉, 그, 트랜잭션은 동작한다 아직 커밋되지않은 데이터에대해 조회할 때 직역하면 "지저분한 데이터를 읽을 수 있다" 라는 의미를 가짐

### Implications: Dirty Reads
The primary implication of using `READ_UNCOMMITTED` is the possibility of **dirty reads**. A dirty read occurs when a transaction reads data that has been written by another transaction, but that data has not yet been committed. If the uncommitted transaction is later rolled back, the data read by the first transaction becomes invalid, leading to inconsistent results.

dirty read는 야기함 
다른 트랜잭션에의해 쓰여진 데이터에대해 
하지만 데이터는 아직 커밋되지 않은상태, 혹여 해당 레코드가 롤백될 때 
만약 아직 커밋되지않은 트랜잭션이 롤백되는경우 



에시
Transaction A가 특정 레코드를 추가 without commit
이후 Trasnaction B가 해당 레코드에 접근
트랜잭션 A가 예외를만나 적재한 레코드가 Rollback
Transaction B는 더이상 해당 레코드에대한 참조 불가능

**Scenario:**
1. Transaction A updates a row but does not commit.
2. Transaction B reads the updated row.
3. Transaction A rolls back its changes.
4. Transaction B has now read data that never officially existed in the database.

### Code Example (Conceptual):
To illustrate `READ_UNCOMMITTED`, you could provide a simple Java (or chosen language) example using a database like H2 or MySQL.

**Example Structure:**
- A simple table (e.g., `accounts` with `id` and `balance`).
- Two threads/transactions.
- Thread 1: Starts a transaction, updates a balance, but pauses before committing/rolling back.
- Thread 2: Starts a transaction with `READ_UNCOMMITTED` isolation level, reads the balance.
- Thread 1: Either commits or rolls back.
- Thread 2: Reads the balance again (if Thread 1 rolled back, Thread 2's initial read was a dirty read).

### References

