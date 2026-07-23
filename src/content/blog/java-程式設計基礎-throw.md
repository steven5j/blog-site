---
title: Java 程式設計(基礎)-拋出例外(Exception) Throw、Throws
description: "例外處理機制 例外處理是對可能出現的異常進行處理，以防止程序遇到異常時被卡死，處於一直等待，或死循環。 例外有 [&hellip;]"
pubDate: 2019-10-08
topic: software
wpId: 3268
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/08/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-throw/"
---

例外處理機制

 例外處理是對可能出現的異常進行處理，以防止程序遇到異常時被卡死，處於一直等待，或死循環。

 例外有兩個過程，一個是拋出 例外 Throw Throws；一個是捕捉 例外  Catch。

拋出例外

拋出例外 有三種形式，一是throw,一個throws，還有一種系統自動拋 例外 。

throw和throws的差別，兩者只差了一個s，又都是處理Exception的關鍵字因此容易混淆。

throw和throws的差別在throw是在程式中用來拋出一個例外，而throws是用來宣告方法會拋出哪種例外給呼叫這個方法的程式Program

```
`public String getUserName(int userId) throws SQLException(){ // 會將SQLException拋給caller（呼叫這個方法的程式）
    
  String userName = userDao.getUserName(userId);
  if(userName == null){
    throw new SQLException(); // 拋出一個SQLException例外
  }

}`
```

throw,throws使用注意點 ：

1.throw關鍵字用於方法裡面，throws用於方法的聲明上。

2.throw關鍵字用於方法內部拋出異常，throws用於方法聲明上拋出異常。

3.throw關鍵字後面只能有一個異常，throws 可以聲明多個異常。

拋出異常的使用注意點：

1.如果你在方法中拋出了一個異常對象，就必須在方法上聲明這個異常的拋出

2.如果一個方法調用拋出異常的方法，調用者就必須處理拋出的這個異常。

3.如果一個方法中拋出了異常，那麼throw 後面的的代碼就不會再執行了。

4.在一種情況下只能拋出一種異常。(也就是說一個catch對應一種異常)

 Throw

```
`
public class ThrowDemo {
	static void aMethod(int a1, int a2) {
		try {
			if (a2 == 0) {
//				throw new ArithmeticException("除數不為0"); 如果沒有放這行 發生例外 第10行自己跑 會跑 / by zero
				throw new ArithmeticException("除數不為0");//放了這行 會顯示""中間的字串
			} 
			int d = a1 / a2;
			System.out.println("a1 / a2 = " + d);
		} catch (ArithmeticException e) {
			System.out.println("發生例外：" + e.getMessage());
		}

	}

	public static void main(String[] args) {
		int n1, n2;
		n1 = 10;
		n2 = 3;
		System.out.println("被除數" + n1 + "除數" + n2);
		aMethod(n1, n2);

		n1 = 3;
		n2 = 0;
		System.out.println("被除數" + n1 + "除數" + n2);
		aMethod(n1, n2);
	}
}`
```

Throws

```
`//throw 最主要就是放在method裡面，當這個method錯誤發生，他會跑完，把它傳到到呼叫這個method的那一層程式碼，與一般當跑到錯誤就停止的不同
public class throwthrowsDemo {

	public static void main(String[] args) {

		try {
			score(80);
		} catch (ArithmeticException e) {
			System.out.println("傳進 ArithmeticException的catch");
			System.out.println(e.getMessage());
		} catch (NumberFormatException e) {
			System.out.println("傳進 NumberFormatException的catch");
			System.out.println(e.getMessage());
		} catch (Exception e) {
			System.out.println("傳進 Exception的catch");
			System.out.println(e.getMessage());
		}

	}

	public static void score(int num) throws NumberFormatException, ArithmeticException, Exception // throws用來告知此方法有可能發生例外
	{
		System.out.println("傳進score的method");
		// if(num > 100)//用來判斷發生Exception
		// {
		// throw new Exception("Over");
		// }
		// else if(num < 100)//用來偵測會否發生ArithmeticException
		// {
		//
		// }
//		int a = 0;
//		int b = 10;
//		int c = 0;
//		c = b / a;

		int d[] = { 0, 10 };

		try {
			score2(d);
		} catch (Exception e) {
			System.out.println("傳進score的method的 Exception的catch");
			System.out.println(e.getMessage());
		}
	}
	private static void score2(int... d) throws NumberFormatException, ArithmeticException, Exception // score2(int...d)
																										// ...是陣列表示方式
	{
		int f = d[1] / d[0];
	}
}
`
```
