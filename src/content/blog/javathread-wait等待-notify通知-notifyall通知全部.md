---
title: Java(Thread)-wait()等待/notify()通知/notifyAll()通知全部
description: "這三個都不是Thread裡的方法，而是Object裡的方法。即每一個對像都有這三個方法。 wait()使得當前 [&hellip;]"
pubDate: 2019-10-23
topic: software
wpId: 3396
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/23/javathread-wait%e7%ad%89%e5%be%85-notify%e9%80%9a%e7%9f%a5-notifyall%e9%80%9a%e7%9f%a5%e5%85%a8%e9%83%a8/"
---

這三個都不是Thread裡的方法，而是Object裡的方法。即每一個對像都有這三個方法。

wait()
使得當前正持有該對象的鎖的線程等待（即暫停），並釋放鎖，以便其它線程能夠獲取該對象的鎖。

notify()
喚醒一個正在等待該對象鎖的線程（即處於wait狀態的線程），具體哪一個不確定。

notifyAll（）
喚醒所有正在等待該對象鎖的線程（即處於wait狀態的線程）。

wait(time)
可以指定等待時間，如果指定時間內沒有notify或者notifyAll喚醒它，則時間到了後自動喚醒，如果時間還沒到但是notify或者notifyAll喚醒它，則會提前喚醒。

wait和sleep的區別
wait會釋放對象鎖，而sleep不會：
wait可以通過notify或者notifyAll喚醒，也可以指定時間，到時間後自動喚醒，而sleep只能指定時間。 

Java 多執行緒中，在目前的執行緒呼叫物件的wait()方法可以讓目前的執行緒暫停執行，等到其他的執行緒呼叫該物件的notify()或notifyAll()方法後才會繼續執行。

wait()方法定義在Object類別，因此所有的物件都可呼叫此方法。

wait()要在同步方法(synchronized method)或同步區塊(synchronized block)中呼叫，即以關鍵字synchronized宣告的方法或區塊。

```
`// synchronized block
synchronized(obj){
  //...
  obj.wait();
  //...
}

// synchronized method
public synchronized void method() { 
  // ...
}  `
```

執行緒進入同步區塊後即擁有物件的監控(monitor)，或稱該執行緒取得物件監控的鎖(lock)。若呼叫wait()時執行緒並沒有該物件的監控則會拋出IllegalMonitorStateException例外

執行緒呼叫wait()後會釋放物件的鎖並進入等待區(wait set)，接著系統排程中的其他執行緒開始競爭物件的鎖。等待區的執行緒必須在其他執行緒呼叫物件的notify()或notifyAll()方法，或經過指定的時間後才會重新進入排程。

等待區的執行緒在休眠狀態，不會進入排程，必須等到以下之一發生才會被喚醒。

- 其他的執行緒呼叫該物件的notify()方法，且在等待區的執行緒剛好是被通知的對象。

- 其他的執行緒呼叫該物件的notifyAll()方法。等待區中的所有執行緒皆會被通知並競爭物件的鎖。

- 其他的執行緒中斷(interrupt)了在等待中的執行緒

- 指定的等待時間已經結束。

等待區的執行緒被喚醒後，若取得物件的鎖便會重新進入排程，也就是回復可執行(runnable)狀態。當執行緒取回物件的鎖時，會從原來呼叫wait()的位置繼續執行。

當等待中的執行緒被中斷(interrupt)時，會發生InterruptedException例外。

當執行緒呼叫物件的`wait()`，時，執行緒只是釋放該物件的鎖並進入等待區，但等待中的執行緒對其他物件仍然可以存取。

 宣告一個`Message`類別，其物件為執行緒要鎖定的對象，呼叫`wait()`及`notify()`方法。 

```
`package ThreadWaitDemo;

//進入點
public class ThreadWaitDemo {
	  public static void main(String[] args) {
	    Message message=new Message("原本的訊息");
	    Waiter waiter_1=new Waiter(message);
	    new Thread(waiter_1,"waiter_1").start();
	    
	    Waiter waiter_2=new Waiter(message);
	    new Thread(waiter_2,"waiter_2").start();
	    
	    Notifier notifier=new Notifier(message);
	    new Thread(notifier,"notifier").start();
	    System.out.println("全部執行緒開始執行");
	  }

}

class Message {
	private String message;
	
	public Message(String str) {
		this.message=str;
	}
	
	public String getMsg(){
		return message;
	}
	public void setMsg(String msg) {
		this.message = msg;
	}
	
}
//Waiter為Runnable的實作，此執行緒在同步區塊中呼叫Message物件的wait()並進入等待區，直到被Notifier通知才會繼續執行。

class Waiter implements Runnable{
	private Message message;
	public  Waiter(Message msg) {
		this.message=msg;
	}
	@Override
	public void run(){
		String ThreadName=Thread.currentThread().getName();
		synchronized(message) {
			try{
			System.out.println(ThreadName+"開始等待");
			message.wait();
			}
			catch(InterruptedException e) {
				//若呼叫wait()時執行緒並沒有該物件的監控(monitor)則會拋出IllegalMonitorStateException例外
				e.printStackTrace();//printStackTrace()方法的意思是：在命令行打印異常信息在程序中出錯的位置及原因。
				// System.out.println(e)，除了標準異常外，只打印at A然後再向外層層輸出。
				//   e.printStackTrace()，除了標準異常外，打印 .......向外層調查。 
			}
			System.out.println(ThreadName+"->收到通知");
			System.out.println(ThreadName+"->處理訊息："+message.getMsg());
		}
		
	}

	
	
}

//Notifier為Runnable的實作，此執行緒在同步區塊中呼叫Message的notify()來通知等待區執行緒。
class Notifier implements Runnable{
	private Message message;
	
	public Notifier(Message msg) {
		this.message=msg;
	}
	@Override
	public void run() {
		String threadName=Thread.currentThread().getName();
		System.out.println(threadName+"開始");
		try {
			System.out.println(threadName+" sleep等待一秒");
			Thread.sleep(1000);
			synchronized(message) {
				message.setMsg("在Notifer設定的新訊息");
//				message.notify();
				message.notifyAll(); //喚醒所有的Thread 可以換成這行去測試
			}
		}
		catch(InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println(threadName+"結束");
	}
}

	`
```

執行輸出結果

```
`waiter_2開始等待
全部執行緒開始執行
notifier開始
waiter_1開始等待
notifier sleep等待一秒
notifier結束
waiter_2->收到通知
waiter_2->處理訊息：在Notifer設定的新訊息`
```

![](https://lh3.googleusercontent.com/uz3kFnx6PT7Qf9CsrFX5mSMFGIJugG-JJ_eha_ftrgrAFKcVBBdrHeikoldLQtUeaVQAvMr8eOAwxUnhyvDAEvP2i76paJz9BWhrffoJyG4j4fxPEmUkUYKndDtvNB0hCESSMC1eEqUF-I32ghcJV19nS42rnMpsPA9vKkloEJ-PWaGOl-u4zVV0ctF8lo_TKQSOPEPkJN4gVxo6P__Bnfl7-H-5LccarLJHHnTorRNNrpVZxp8H7pj28vXTOD4OZgRl5vrDJ4bcYS8W8ne9C3m0UQoZzkdrWaesu7O80dxTfi2-DdNyyuEteTs4sVVmDmNxRD4IjRJaPtUl6EF1zqutVeIyJyvp32xo7ado71IxHZCDgmiQFpeso00wu_fZ4o2THAvmtbsXzr0S79KsmXBHWJ2XPDk7g1YWW6cScxyyMxpww59panakLXkGZMRWQYLo2ahKIt5ow619s2jOWLIZTg9fbZLwGbmxTXSVVMLG5mRzVnmINDGw9cLX6E9ezaBmM5U4fBGokdahwdGCMfCeKHohiEh5CXaYfH__GRYIkw4p3FfLERqQvYRXSEB-paDLACRNIlWl_ynxdg_EFP4qtot3ocfRxddrUbJouGEqQKeSXN9yIZsKoMFygGn7Q3bDMpuvMqlUnw9XAldjbJnL9Gi9GRYCRVwmJc02L4Ul_PuZE0jKGKfWtSGg2UIw_oZUa5c9T8I-QhNR0fNL1-qnlNghzYhQl-pCYtr9yF2woDpS=w936-h291-no)

因為在用notify()呼叫的時候， 只會通知任一等待區中的執行緒 ，所以多次執行的

![](https://lh3.googleusercontent.com/eMytp-V-jlYLWjxcJYaLX73fPVILgWZ6cBOADS2NFiISab36uRcb4rGOQorkA6-FuBxNgPGh_D-5w_txysaJo3sUqkE1JJcpi3GG9UYS8myzFcUl4y7yWCYF3TPxXE7dH0VqMP0lqQYMCthWwZzPMwnLIJE_rKr-lzdLlrOkU63wlM64-QuHEctMjZ0lEfRHreuCRieYyKPH2Yyavu0zGC5ULCw665knMhqslZg4tE55VNJctc9If8aDxR2pNlq7ifjjYO7ax73gu2FrV2RKz4_5-g7ApmgLSja8wNbac4VKlNSN8q59fRxmvzZtP2X2wPrvisAaFMW-CS07nYrnFoE63Ioh7BQYCMpm8FVBRwEiSlLM8TzORcT7qpHV5GTN7JlB-gJj4RzU_CD9CfpMmHn9u1MvlUWjElFEw_8bJrS2GZ85GFHJ7xSWJGILMeFD2Gr29U6ZYX0XPWvtVk2qzaaGPDE0Iwmcy8caRs94Nqkr6rhXJKMWF6z-UFwx9VwSg9BN8a3XYlqTxNE35B4nuqp6_3q0Qd_dVV_9QGOax9favWtTuf2Ysc953W3MWUlY-pjA0Z_Gd4z3TxNFl5oSXZqFuXMErI0I7q-RTf2zCez5LcVLSiUr-orHq62-stSzIMo145BGnGb5mH4YHFfLu8p5CeMibgzisQyIrcI5m8KQhjz9iP3Bs87kFj6CX5btK0TjCGZj4kIUq60PR5XEitcDEJ6revmsbwF0KaXTeLPtufLY=w936-h291-no)

呼叫notify()時程式並沒有結束，waiter仍在等待狀態，因為notify()只會通知任一等待區中的執行緒，所以只有一個waiter(1或2)收到通知並繼續執行，而另一個waiter則沒有執行續去喚醒它。

 如果改用notifyAll()則全部的執行續皆會被喚醒然後執行到結束。 

![](https://lh3.googleusercontent.com/DsjFLiMNQoYNJV7Ug9QEPOIHJvm2YttUqxQFABxMaNkdGXOLe1f1uPfE28N4RPy64WI-4cvR4EeHLMxbDDW82sSOzm7UTf7Ep6aJdn5aag7PofdbmkNPDOGS42x8B18-VPPa12P__Hz6jd-IRsVsibSqeBOp2W2lkyjaLmt9_OsSrv7KRSdRcfoNlSSgkGYx7MUibyiskf_SSyX_TbVi9r4vwSJXIsdMAfeARHpw9iwEwaySHW2CD14-1lgI-l9zOpllpqdHSUC7kvZfaQ4JrHZ3gNp8bMJIhUzcYc0fKBYPsQq8bKubCD7ZQCxEe_egRwbGMP4-GuckYjxQxbAQXWICnrKeQtgXD1zNIiNMxAxC_sP-DE-5nx7Mi-cZGW-LTsFp69p6EgbSQ1xlKvkstT9sicwRYly7kX4W75ZMFIydtL9ne1KeLQywEcI3cl853tWj83IrgKocCZWuRfJYxSI3Dvm2K5QIH3-oxoe4Y0K0X438a4uyPGCfivHxkDaBsDShZ0q12hDn8_0-wPCJuYLLIF617yW6INXCy1USjbbzvpRos249ALDB4yM7ObdCkOy0kJmoRZmdngqI8eTz6RwjgCs2NuI4GAzM6ZOEBX8_ys6zmvAjQGcUiDFZ4iSymFjAiclD4fmpkmDhluwK4Rtd3EqBkpSHDlDN3frh5p436toa_rrSWfiK92B5nqKbmtQNV7jJvOxc_lyVJnKJxL6TLgk9hQtU8YPHNwV9rY05Vomz=w941-h645-no)
