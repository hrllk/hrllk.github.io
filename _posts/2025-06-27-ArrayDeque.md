---
title: ArrayDeque?
categories:
   - data-structure
toc: true
toc_label: "What is ArrayDeque?"
---

### Overview 

---

> In this tutorial, we’ll show how to use Java’s ArrayDeque class – which is an implementation of the Deque interface.
An ArrayDeque (also known as an “Array Double Ended Queue”, pronounced as “ArrayDeck”) is a special kind of a growable array that allows us to add or remove an element from both sides.
An ArrayDeque implementation can be used as a Stack (Last-In-First-Out) or a Queue(First-In-First-Out).

ArrayDeque == 자료구조<br>
양쪽 끝에서 요소를 추가하거나, 제거할 수 있는 확장형 배열을 가진 자료구조<br>
LIFO(Stack), FIFO(Queue) 모든 용도로 사용 가능<br>


### API
---
각 오퍼레이션별로 두가지 옵션을 지님<br>
예제로 첫째 인덱스(?) 에 요소를 추가할 때 offerFrist 메서드와 addFirst 메서드를 사용할 수 있는데<br>



| Operation	            | Method	        | Method throwing Exception |
| --------------- | --------------- | --------------- |
| Insertion from Head	| offerFirst(e)	    | addFirst(e) |
| Removal from Head	    | pollFirst()	        | removeFirst() |
| Retrieval from Head	| peekFirst()	    | getFirst() |
| Insertion from Tail	| offerLast(e)	    | addLast(e) |
| Removal from Tail	    | pollLast()	        | removeLast() |
| Retrieval from Tail	| peekLast()	    | getLast() |


#### addFirst
---
addFirst 메소드의 경우 인자가 null인 경우, NPE 발생되며

``` java 
    // The main insertion and extraction methods are addFirst,
    // addLast, pollFirst, pollLast. The other methods are defined in
    // terms of these.

    /**
     * Inserts the specified element at the front of this deque.
     *
     * @param e the element to add
     * @throws NullPointerException if the specified element is null
     */
    public void addFirst(E e) {
        if (e == null)
            throw new NullPointerException();
        final Object[] es = elements;
        es[head = dec(head, es.length)] = e;
        if (head == tail)
            grow(1);
    }

```


#### offerFirst
---
`offerFirst()` 메서드의 경우 위 `addFrist()` 메서드를 수행하고 완료되었다면 true를 응답

``` java
    /**
     * Inserts the specified element at the front of this deque.
     *
     * @param e the element to add
     * @return {@code true} (as specified by {@link Deque#offerFirst})
     * @throws NullPointerException if the specified element is null
     */
    public boolean offerFirst(E e) {
        addFirst(e);
        return true;
    }


```

### Usages
---

#### Using As a Stack
---
``` java 
public void whenPush_addsAtFirst() {
    Deque<String> stack = new ArrayDeque<>();
    stack.push("first");
    stack.push("second");
 
    assertEquals("second", stack.getFirst());
}

```


#### Using As a Queue
---
``` java
public void whenPop_removesLast() {
    Deque<String> stack = new ArrayDeque<>();
    stack.push("first");
    stack.push("second");
 
    assertEquals("second", stack.pop());
}
```



### How to Implemented?
> Under the hood, the ArrayDeque is backed by an array that doubles its size when it gets filled.
Initially, the array is initialized with a size of 16. It’s implemented as a double-ended queue where it maintains two pointers, namely a head and a tail.
Let’s see this logic in action – at a high level...

내부적으로 배열로 구현되어있고, <br>
초기 배열의 크기는 16이며, 배열이 가득찰 때 크기가 두배로 늘어남<br>
이중 연결 큐로 구성되며 head와 tail이라는 두개의 포인터를 유지<br>

#### Such as a Stack

> As we can see, when ArrayDeque works as a stack, adding an element using the push() method inserts the element at the top of the stack and makes head point to it.
If we pop an element, it sets the element at the current head position as null so the element could be garbage collected and then moves back the head pointer by one.


ArrayDeque가 스택처럼 동작할 때, `push()` 메서드를 사용하여 요소를 추가하면 해당 요소는 스택의 최상단에 삽입되고 `head` 포인터가 이를 가리키게 됨
요소를 `pop()` 할 경우, 현재 `head` 위치의 요소는 `null`로 설정되어 가비지 컬렉션의 대상이 되며, 이후 `head` 포인터는 한 칸 뒤로 이동

#### Such as a Queue

> When we add an element using the offer() method, it moves the tail pointer by one.
When the user polls an element, it sets the element at the head position to null so the element can be garbage collected and then moves the head pointer.

ArrayDeque가 큐처럼 동작할 때, `offer()` 메서드를 사용하여 요소를 추가하면 `tail` 포인터가 한 칸 이동하며, 
사용자가 `poll()` 메서드를 통해 요소를 가져올 경우, `head` 위치의 요소는 `null`로 설정되어 가비지 컬렉션의 대상이 되며, 이후 `head` 포인터가 이동됨





### Conclusion
---
Stack처럼도, Queue로도 사용이 가능한 자료구조


### References
[!https://www.baeldung.com/java-array-deque](https://www.baeldung.com/java-array-deque)
