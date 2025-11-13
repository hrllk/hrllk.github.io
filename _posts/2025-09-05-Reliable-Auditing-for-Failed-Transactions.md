---
title: "Reliable Auditing for Failed Transactions in Spring"
categories:
  - Spring
toc: true
toc_sticky: true
toc_label: "Contents"
published: false
---
<!-- TODO:  -->

Spring에서 제공하는 애노테이션
Spring에서 제공하는 EventListener의 확장판
이벤트의 Listener 바인딩을 허용함


아래 이벤트들에대한 이벤트 리스닝이 가능
AFTER_COMMIT (default) – used to fire the event if the transaction has completed successfully
AFTER_ROLLBACK – if the transaction has rolled back
AFTER_COMPLETION – if the transaction has completed (an alias for AFTER_COMMIT and AFTER_ROLLBACK)
BEFORE_COMMIT – used to fire the event right before transaction commit


### 1. The Challenge: Losing Audit Logs on Transaction Rollback
---
* Why standard logging within a `@Transactional` method fails when an exception occurs.
* The goal: To reliably save an audit log of a failed operation, even when the main transaction is rolled back.
안전하게 실패시에대한 감사로그를 적재하기위함 (메인 Transaction 이 롤백되었을 때) 

### 2. Solution Part 1: Capturing the Rollback Event with `@TransactionalEventListener`
---
* Introduction to `@TransactionalEventListener` for synchronizing events with transaction states.
* Understanding the `TransactionPhase` enum, with a focus on:
  * `AFTER_ROLLBACK`: The key to triggering actions specifically after a transaction fails.
  * A brief comparison with `AFTER_COMMIT` and `AFTER_COMPLETION`.

### 3. Solution Part 2: Ensuring Data Persistence with `@Transactional(propagation = Propagation.REQUIRES_NEW)`
---
* What is Transaction Propagation?
* How `Propagation.REQUIRES_NEW` creates a new, independent transaction.
* Why this is critical for saving our audit log separately from the failing transaction.

### 4. Synergy in Action: A Step-by-Step Scenario
---
* **Scenario**: A `TicketService.createTicket()` method fails mid-operation.
* **Step 1**: The initial transaction (Transaction A) starts.
* **Step 2**: An unexpected exception is thrown.
* **Step 3**: Spring marks Transaction A for rollback.
* **Step 4**: The `AFTER_ROLLBACK` event listener is triggered.
* **Step 5**: The `REQUIRES_NEW` propagation rule suspends Transaction A and starts a new, independent transaction (Transaction B).
* **Step 6**: The audit log is successfully saved and committed within Transaction B.
* **Step 7**: Transaction A completes its rollback.

### 5. The Final Result and Conclusion
---
* **Outcome**: The ticket creation data is gone, but the failure audit log is safely stored in the database.
* **Why This Pattern is Essential**: How this combination dramatically improves system reliability, auditability, and traceability.
