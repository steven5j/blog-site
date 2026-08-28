---
title: Java 程式設計(初階)-利用extends自行撰寫例外類別
description: "所有能夠處理的例外都是繼承 Exception 類別，因此我們自行設計的例外類別 基本上就是直接繼承這個例外類 [&hellip;]"
pubDate: 2019-10-13
topic: software
wpId: 3345
slug: java-extends-3345
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/13/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%88%9d%e9%9a%8e-%e5%88%a9%e7%94%a8extends%e8%87%aa%e8%a1%8c%e6%92%b0%e5%af%ab%e4%be%8b%e5%a4%96%e9%a1%9e%e5%88%a5/"
---

所有能夠處理的例外都是繼承 Exception 類別，因此我們自行設計的例外類別 基本上就是直接繼承這個例外類別

```
`
public class ExtendsExceptionDemo {

	public static void main(String[] args) {
		try{
			ExtendsExceptionDemo.mytest(null);//我們故意丟一個null進來讓他產生exception
		}
		catch(AnyException e) {//抓到自訂類別名稱AnyException
			System.out.println("例外發生->"+e.getMessage());
		}

	}
	static void mytest(String str) throws AnyException{//發生自訂的例外類別的時候丟回呼叫的method那邊
		if(str == null) {
			throw new AnyException("字串不得為\"null\"");//丟到並產生新自訂類別到記憶體
		}
	}
}
//自訂類別名稱AnyException，整組繼承Exception的類別
class AnyException extends Exception{//用一般類別AnyExcption 去繼承例外類別 Exception
	private String m = null;//初值設置為null
	//建構元 多載
	public AnyException() {//建構元去執行父類(例外類別class)建構元的程序
		super();
	}
	public AnyException(String m) {
		this.m = m;
	}
	//**重點，當建構元承接到bug狀況(Throwable)的時候，要執行這組建構元
	public AnyException(Throwable cace) {
		super(cace);//把bug狀況用父類的例外類別去執行
	}
	
	//複寫父類的程序變成自己的
	@Override
	public String toString() {
		return m;
	}
	@Override
	public String getMessage() {
		return m;
	}
	
}
`
```

參考資料： [https://ithelp.ithome.com.tw/articles/10185705](https://ithelp.ithome.com.tw/articles/10185705)
