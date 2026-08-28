---
title: Java(Thread)-Thread執行續(線呈) 五個基本狀態，新建、就續、執行狀態實例
description: "1.新建狀態(New)： 當用new操作符建立一個執行緒時， 例如：new Thread()，執行緒還沒有開始 [&hellip;]"
pubDate: 2019-10-15
topic: software
wpId: 3361
slug: javathread-thread-3361
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/15/javathread-thread%e5%9f%b7%e8%a1%8c%e7%ba%8c%e7%b7%9a%e5%91%88-%e4%ba%94%e5%80%8b%e5%9f%ba%e6%9c%ac%e7%8b%80%e6%85%8b%ef%bc%8c%e6%96%b0%e5%bb%ba%e3%80%81%e5%b0%b1%e7%ba%8c%e3%80%81%e5%9f%b7/"
---

1.新建狀態(New)：

   當用new操作符建立一個執行緒時， 例如：new Thread()，執行緒還沒有開始執行，此時執行緒處在新建狀態。當一個執行緒處於新生狀態時，程式還沒有開始執行執行緒中的程式碼

2.就緒狀態(Runnable)->可執行狀態

     也被稱為“可執行狀態”。執行緒物件被建立後，其它執行緒呼叫了該物件的start()方法，從而來啟動該執行緒。例如，thread.start()。處於就緒狀態的執行緒，隨時可能被CPU排程執行。 

3.執行狀態(Running)

當就緒狀態的執行緒被呼叫並獲得處理器資源時，執行緒就進入了執行狀態。此時，自動呼叫該執行緒物件的run()方法。

run()方法定義了該執行緒的操作和功能。執行狀態中的執行緒執行自己的run方法中程式碼。直到呼叫其他方法或者發生阻塞

而終止。

4.阻塞狀態(Blocked) ->不可執行狀態

阻塞狀態是執行緒因為某種原因放棄CPU使用權，暫時停止執行。直到執行緒進入就緒狀態，才有機會轉到執行狀態。阻塞的情況分三種：
 (1) 等待阻塞 — 通過呼叫執行緒的wait()方法，讓執行緒等待某工作的完成。
 (2) 同步阻塞 — 執行緒在獲取synchronized同步鎖失敗(因為鎖被其它執行緒所佔用)，它會進入同步阻塞狀態。
 (3) 其他阻塞 — 通過呼叫執行緒的sleep()或join()或發出了I/O請求時，執行緒會進入到阻塞狀態。當sleep()狀態超時、join()等待執行緒終止或者超時、或者I/O處理完畢時，執行緒重新轉入就緒狀態。

很多教成會將線程的狀態和Java中的方法調用聯繫起來 ，進而將阻塞狀態(Blocked)分拆成->
阻塞(BLOCKED)：表執行緒阻塞於鎖。
等待(WAITING)：進入該狀態的執行緒需要等待其他執行緒做出一些特定動作（通知或中斷）。
超時等待(TIME_WAITING)：該狀態不同於WAITING，它可以在指定的時間內自行返回。

5.死亡狀態(Dead) ->結束狀態

執行緒執行完了或者因異常退出了run()方法，該執行緒結束生命週期。

新建狀態、就續狀態(可執行狀態實作)、執行狀態實例

```
`package ThreadDemo;

class MyThread2 extends Thread{
	int i = 0, x;
	String name;
	MyThread2(String name,int a){
		int x = a;
		this.name=name;
		start();//在這邊 開始執行 執行續
	}
	
	@Override
	public void run() {
		try {
			while(true) {
				i++;
				System.out.println(name+"執行第"+i+"次!");
				sleep(x);//x 進入到非可執行狀態
				if(i>=5) break;
			}
		}
			catch(Exception e){
			System.out.println("例外產生...!");
		}
		
	}
}

public class ThreadNewRunnableDemo {
	public static void main(String[] args) {
		Thread t1 = new MyThread2("執行續 t1",15);
		Thread t2 = new MyThread2("執行續 t2",20);
	}
}
`
```
