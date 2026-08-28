---
title: Java 程式設計(基礎)-bug分類、用try、catch、finally 處理例外(Exception)、Call stack(呼叫堆疊)
description: "try、catch、finally詳細內容 https://github.com/tomlinNTUB/Jav [&hellip;]"
pubDate: 2019-10-05
topic: software
wpId: 3236
slug: java-try-catch-finally-exception-3236
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/05/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-%e7%94%a8try%e3%80%81catch%e3%80%81finally-%e8%99%95%e7%90%86%e4%be%8b%e5%a4%96exception/"
---

try、catch、finally詳細內容  [https://github.com/tomlinNTUB/Java/wiki/%E7%AC%AC09%E8%AA%B2-%E7%94%A8try…catch%E8%99%95%E7%90%86%E4%BE%8B%E5%A4%96](https://github.com/tomlinNTUB/Java/wiki/%E7%AC%AC09%E8%AA%B2-%E7%94%A8try...catch%E8%99%95%E7%90%86%E4%BE%8B%E5%A4%96) 

引用筆記：[https://medium.com/@clu1022/java%E7%AD%86%E8%A8%98-exception-%E8%88%87-error-dbdf9a9b0909](https://medium.com/@clu1022/java%E7%AD%86%E8%A8%98-exception-%E8%88%87-error-dbdf9a9b0909)

關於 Exception 與 Error 的基本概念

Exception 與 Error 都是繼承自 Throwable, 在 Java 的世界裡, 只有 Throwable 類型的 instance 才可以被 throw 或著 catch, 其為 exception handling 的基本組成類型. 至於 Exception 與 Error 的差異, 這部分就體現出了 Java 設計者對不同異常情境的分類:

- Exception: 通常指程式運行時所出現的可預料之意外狀況, 基本上都要進行 catch 的動作, 然後進行相應處理, 如 IOException.

- Error: 指在正常情況下, 不太可能出現的問題, 絕大部分的 Error 都會導致程式 (e.g. JVM 本身) 處於一種不正常且不可恢復的狀態. 所以對於這種情況, 你也不太需要去 catch 了, 因為也沒什麼意義. 常見的如 OutOfMemoryError / StackOverflowError 這些, 都是繼承自 Error.

再來, Exception 又可以分成兩類:

- Checked Exception: 又稱受檢例外, 通常在原始碼中必須顯式地 catch 並且處理, 這部分算是 compile time 會檢查的部分.

- Unchecked Exception: 又稱非受檢例外, 就是所謂的 RuntimeException, 常見的像是 NullPointerException, ArrayIndexOutOfBoundsException. 這種類型的例外通常是可以透過撰寫相應程式以避免的邏輯錯誤, 可以根據當下的情境來判斷是不是要 catch, 且在 compile time 並不會強制要求要 catch.

```
`<p>public class trycatchfinallyDemo {

	public static void main(String[] args) {
//		使用方法
//		try{
//		 //這區塊為可能發生例外的敘述
//		}
//		catch(例外型態 變數名稱)
//		{
//		  //這區塊為例外發生的處理
//		}
//		finally {
//		    //這區塊為最後的處理
//		}
		
		int a=1;
		int b=10;
		
		try {
			int c=b/0; //數學裡面 數字除以0是無限大，是錯的，但是是執行時期才會顯示錯誤 ,一搬來說程式執行到這裡就會停下來，下面的就不會顯示了
		}	
//		catch 先把小的例外狀況，寫進catch裡面，然後再寫大的，就能比較容易明確知道是甚麼問題點
		catch(NumberFormatException e) {
			System.out.println("傳進 NumberFormatException的catch");
			System.out.println("只能為數值不得為字串");
			e.printStackTrace();
		}
		catch(Exception e)
		{
			System.out.println("傳進 Exception的catch");
			System.out.println(e);//列印出錯誤訊息
			e.printStackTrace();
		}
		finally {
			//這區塊為最後的處理 ，可有可無。
			System.out.println("測試二結束");
		}
		int height=0;
		String aa="bbb";
		 //基本型
		  int x = 5, y = 0;
		  //有發生Exception
		  try {
		   int result = x / y;
		   System.out.println("結果=" + result);
		  }
		  catch (Exception e) {
		   System.out.println("分母不可為0");
		  }
		  finally {
		   //這區塊為最後的處理 ，可有可無。
		   System.out.println("測試一結束");
		  }
		  //沒有發生Exception
		  try {
		   
		   int result = x + y;
		   System.out.println("1+0結果=" + result);
		  }
		  catch (Exception e) {
		   System.out.println("不可為0");
		  }
		  finally {
		   //這區塊為最後的處理 ，可有可無。
		   System.out.println("測試二結束");
		  }
		
	}

	}</p>`
```

call stack和當if else使用

除了一般的使用以外，還可以用來另類當if else使用

![](https://lh3.googleusercontent.com/KFayo-AO38UYX63elwC7LLObB6fc6ndVxRxQKIxEI2KZq9NHAsVceg7cPLFGqH7HqADtY7Yh5lNJHDcPJCuXlSzbq5ni89l7OEzqqoM5V2NVb2xfZYZvAHPMBWvW5i8_NxwXYUOoRwhjrY5zLIbe32LljTNp_vpvyCcc8Zq8Y35n577WDuccpYJutg3tACkmcgxyUpkzLmGDxat19giuBaEefB3ka--J_LMlClwvMm49fJXMN6gbDW3dyuQIpcuFOhs7IpS-F0ia-EbHHfVnz1OHMcdjLgY_EoG7f9Iv0QiycAR0JELtm1Xk_EoHnRSigpSCM4Vq6Zx4fjvXkBANZ0lYmexjTVGKYjykiYjyjknF2maHnxtufYum4e545RrD-LVIeqJrDTVXNr34zFmePtae59y-xj8uEolR4Zt-aHgbQNGovnxdMIc-OiWyzWd8BB3HrljwcqIwA63Y-zImkGFi16DgBSIv9fRqwlQ8tU-_qXMbtvAExX76DHf8XTJLpH_w3WH0oAMls2zo9qB-3UwmzsDK5OYCE3dKC_k8df-LkXjIJWpp0dqZajcdjkvudEzF_AApxXKKZxghG9p59-qEbRUxcGPM-GbhSTFLY-0AADqcuE1rL9EzSuHCmPkJz3FfuMIK7fDG7qI9eGzz_3ukUsarMcdQBK1DgjL6biZIVJqZQjS19DwizT2sw5jYuMVLwctIRrAKsCwGkMH93tcmA8TjRXOEFUhwdqJ6tT99qPk=w514-h642-no)

```
`//try catch finally用來分類錯誤，還有可以用來當if else使用

import java.util.Scanner;

public class CheckFieldDemo {

	public static void main(String[] args) {
		
		Scanner scanner=new Scanner(System.in);
		
		String id = scanner.next();
				checkfielmethod(id);//用另一個方法去執行內容，把ID傳進去這個method
	}
	
	private static void checkfielmethod(String id) {
		try{	
			String gender=id.substring(1,2);
			
		if(gender.equals("1")){
			System.out.println("男");
		}else if(gender.equals("2")){
			System.out.println("女");
		}else{
			throw new RuntimeException ("輸入錯誤!!");
		}
//call stack 呼叫堆疊，依照堆疊類別，由小而大排序Catch 到他所屬的錯誤類別的時候就會被Catch住
		}catch(StringIndexOutOfBoundsException e){
			System.out.println("輸入資料長度不足");
		}catch(NumberFormatException e){
			System.out.println("身份證第二碼應是數字");
		}
		catch(Exception e){
			System.out.println(e.getMessage());
		}
	}

}
`
```
