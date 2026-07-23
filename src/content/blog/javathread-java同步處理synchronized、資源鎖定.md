---
title: Java(Thread)-Java同步處理synchronized、資源鎖定
description: "Synchronized 簡單介紹 Synchronized 使用時，需指定一個物件，系統會 Lock 此物件 [&hellip;]"
pubDate: 2019-10-15
topic: software
wpId: 3374
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/15/javathread-java%e5%90%8c%e6%ad%a5%e8%99%95%e7%90%86synchronized%e3%80%81%e8%b3%87%e6%ba%90%e9%8e%96%e5%ae%9a/"
---

Synchronized 簡單介紹

Synchronized 使用時，需指定一個物件，系統會 Lock 此物件，當程式進入 Synchronized 區塊或 Method 時，該物件會被 Lock，直到離開 Synchronized 區塊時才會被釋放。

在 Lock 期間，鎖定同一物件的其他 Synchronized 區塊，會因為無法取得物件的 Lock 而等待。

待 Synchronized 區塊執行完釋放 Lock 後，其他鎖定同一物件的 Synchronized 區塊中，Java 會讓其中一個區塊取得該鎖定物件的 Lock 而可以執行。

其他鎖定同一物件的 Synchronized 區塊就繼續等。
即 一次只允許一個執行緒存取被鎖定的物件 ，而其他的執行緒必須等待上個執行緒處理完後才可以進入處理。

如果當數個執行緒同時啟動，還共用同個變數，就會常發生無法發覺的錯誤。

實例：

```
`package ThreadDemo;

public class ThreadSynchronizedDemo {

	public static void main(String[] args) throws InterruptedException {

		PrintLoop pl = new PrintLoop();
		Thread t1 = new Thread("Thread-1") {
			@Override
			public void run() {
				String threadName = Thread.currentThread().getName();
				 synchronized(pl){
				System.out.println(threadName + ":同步開始");
				pl.print(threadName, 3);
				System.out.println(threadName + ":同步結束");
				 }
			}
		};
		Thread t2 = new Thread("Thread-2") {
			@Override
			public void run() {
				String threadName = Thread.currentThread().getName();
				 synchronized(pl){
				System.out.println(threadName + ":同步開始");
				pl.print(threadName, 3);
				System.out.println(threadName + ":同步結束");
				 }
			}
		};
		t1.start();
		t2.start();
	}
}

class PrintLoop {

	public void print(String ThreadName, int Times) {
		System.out.println(ThreadName + ":print開始");
		for (int i = 0; i < Times; i++) {
			System.out.println(ThreadName + ":" + i);
		}
		System.out.println(ThreadName + ":print結束");
	}
}`
```

輸出狀況：

↓ 可以看出Thread-1跑完以後才換Thread-2

```
`Thread-1:同步開始
Thread-1:print開始
Thread-1:0
Thread-1:1
Thread-1:2
Thread-1:print結束
Thread-1:同步結束
Thread-2:同步開始
Thread-2:print開始
Thread-2:0
Thread-2:1
Thread-2:2
Thread-2:print結束
Thread-2:同步結束
`
```

同步區塊移除再試一次

把run()中的同步區塊移除，則pl將不被鎖定，可允許多個執行緒同時存取

```
`package ThreadDemo;

public class ThreadSynchronizedDemo {

	public static void main(String[] args) throws InterruptedException {

		PrintLoop pl = new PrintLoop();
		Thread t1 = new Thread("Thread-1") {
			@Override
			public void run() {
				String threadName = Thread.currentThread().getName();
//				 synchronized(pl){
				System.out.println(threadName + ":同步開始");
				pl.print(threadName, 3);
				System.out.println(threadName + ":同步結束");
//				 }
			}
		};
		Thread t2 = new Thread("Thread-2") {
			@Override
			public void run() {
				String threadName = Thread.currentThread().getName();
//				 synchronized(pl){
				System.out.println(threadName + ":同步開始");
				pl.print(threadName, 3);
				System.out.println(threadName + ":同步結束");
//				 }
			}
		};
		t1.start();
		t2.start();
	}
}

class PrintLoop {

	public void print(String ThreadName, int Times) {
		System.out.println(ThreadName + ":print開始");
		for (int i = 0; i < Times; i++) {
			System.out.println(ThreadName + ":" + i);
		}
		System.out.println(ThreadName + ":print結束");
	}
}`
```

輸出狀況：

可以看出執行續順序亂

```
`Thread-2:同步開始
Thread-1:同步開始
Thread-2:print開始
Thread-1:print開始
Thread-2:0
Thread-1:0
Thread-2:1
Thread-1:1
Thread-2:2
Thread-2:print結束
Thread-2:同步結束
Thread-1:2
Thread-1:print結束
Thread-1:同步結束
`
```

比較以上兩種不同的結果可觀察到有同步和沒同步的差異。

在同步區塊中，被鎖定的物件只能被一條執行續存取，待執行的執行緒離開同步區塊後才會釋放該物件的鎖，接著另一條執行緒才能取得鎖並存取該物件。 

Synchronized 的各種用法

1. Synchronized Method

```
`synchronized public void syncMethod() {
…
}`
```

此種 synchronized 用法鎖定的物件為 Method 所屬的物件 Instance，只要物件被 new 出超過一個以上的 Instance，就有可能保護不到 Method 內程式。

但如果此物件只會被 new 出一個 Instance，譬如 new 出來後就放到 ServletContext，要用的時候從 ServletContext 中拿出來執行，就可以避免此情況。

2. Synchronized Static Method

```
`synchronized static public void syncMethod() {
…
}`
```

此種 synchronized 用法鎖定的物件為 Method 所屬的物件的 Class，不管被 new 出幾個的 Instance，都能夠保證同一個時間只會有一個 Thread 在執行此 Method。

3. Synchronized(this)

```
`public void syncMethod() {
synchronized(this) {
…
}
}`
```

此種 synchronized 用法與 synchronized method 用法一樣，都是鎖定 Method 所屬的物件本身。

4. Synchronized(SomeObject)

```
`public void syncMethod() {
synchronized(SomeObject) {
…
}
}`
```

此種 synchronized 用法鎖定的是 SomeObject，如果 SomeObject 是兩個不同 Instance，那 synchronized 區塊內就有可能被同時執行。

如果每一個 Synchronized 的 SomeObject 都是同一個 Instance (或者 SomeObject 本身就是 Static)，就可以保證區塊內同時間只會被一個 Thread 執行。

當使用 Synchronized (SomeObject) 時，SomeObject 本身處於被 Lock 狀態，但此時 SomeObject 內的值是可以被更改的，Lock 只是同步化的狀態，跟物件本身的資料無關，不代表不能更改資料。
