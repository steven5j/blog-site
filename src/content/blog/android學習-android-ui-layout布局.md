---
title: "[Android學習] Android UI layout佈局"
description: "環境與版本 作業系統：Window10 64x 專業版 版本：2004 開發軟件(IDE)：Android S [&hellip;]"
pubDate: 2020-10-09
topic: software
series: android
heroImage: /public/uploads/wp/4728.jpg
wpId: 4728
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/10/09/android%e5%ad%b8%e7%bf%92-android-ui-layout%e5%b8%83%e5%b1%80/"
---

環境與版本

作業系統：Window10 64x 專業版 版本：2004

開發軟件(IDE)：Android Studio 4.0.1

Runtime Version：1.8.0_242

VM：OpenJDK 64-Bit Server

使用語言版本：Java

目前的Layout

![](https://lh3.googleusercontent.com/pw/ACtC-3fyu11EZtPofXJioE4x6I0s3LRAHui8NlOD-lX5HEc7o_KHpj1IcqbCOmQbXqQKFyShy3douNxAsN8arEnhKaR6l2vvlD_UrF1NJv8E9c2lM7SWQuXV3LiS2nPY-LEs2V8s1RALZI1Cyw2thSnQiY3vww=w1693-h908-no?authuser=0)

- ConstraintLayout 約束佈局

- FrameLayout 框架佈局

- Linear layout 線性布局

- Table layout 表格佈局

ConstraintLayout 約束佈局(預設)

新版的Android 預設都是用ConstraintLayout

ConstraintLayout 會覺得跟舊版本的 RelativeLayout 有點像，其實它還能做到很多 RelativeLayout 做不到的事情。

以往在建構複雜的畫面時，經常是 LinearLayout 與 RelativeLayout 等等相互組合，拼湊出相當深且複雜的樹狀 xml。而現在透過ConstraintLayout，可以更好的完成同樣效果的狀況，且效能又更好。

![](https://lh3.googleusercontent.com/pw/ACtC-3fFaj92nhLBAKFnAQ_jDWdQoVo2maybATv993cnNRc6VC3XcPNIyph8IAqNQZs1PLI2c8MmfGb_cxtBsPm1QxFT9TSuYxGjae_5wc_UHiSZ5TgQZWl7JdAurPW0e7GvyimqKhhrWJayh7_XQlRcipNXHw=w948-h908-no?authuser=0)

![](https://lh3.googleusercontent.com/pw/ACtC-3dRrQyiWuCv_7ysPq82Ag9ZXDvyXVvk5OsrbU6Peh1pZpcBcgVaQmpNKFNyMUEFU1K14a1MzgKHTJsVDZFXNogrsVudkVeetDsKqmiIqVyRld1XARqWXzjuXYQ3eIHWyJ-YzjZMz_kVe7PTpJp6-S8O5w=w1070-h908-no?authuser=0)

語法參考->[Android 開發者官方站參考資料](https://developer.android.com/reference/androidx/constraintlayout/widget/ConstraintLayout)

FrameLayout 框架佈局

最簡單的layout，能夠將所有元件全部聚集在同一個位置，既然為相同位置，因此元件間是由堆疊的方式形成，堆疊的方式是按照xml檔排列的順序決定的。

![](https://lh3.googleusercontent.com/pw/ACtC-3e1QqvKlX4s3jmwDSJRuXJTyH8ITmJidhHpcxWD02w6CwU3jEWmn-mBiPgGM9SUCjhBQwBrBqP9EIuJ3CEf6Vl0NEm6Ee6c5L72Y0F2j0nn_lRH1taTY00z1JE_iqQqNEWntHWCLYGOgKQKdRYnb8XBfw=w1298-h905-no?authuser=0)

![](https://lh3.googleusercontent.com/pw/ACtC-3fF0kHuZ5Kime4pqhNzfuh4d02r___ok36xoKg7riR3-bKTUGeSzeEoKw0jgPB52WO_zw6FMuA6QbtPNgkqNM7-kxT6eY-s4lV27BUf303kIqzvrMmp2v8Rw7ipQlQWMumarymhuvyzUN2kqviuDH_DXA=w1089-h908-no?authuser=0)

語法參考->[Android 開發者官方站參考資料](https://developer.android.com/reference/android/widget/FrameLayout)

Linear layout 線性布局

LinearLayout–線性佈局，其線性可分為水平（horizontal）及垂直（vertical），預設是水平

1.vertical 元件直向由上至下排列
2.horizonal 元件水平由左至右排列

![](https://lh3.googleusercontent.com/pw/ACtC-3e1U8QhdJ_WzeSS5k_CS8NSyDkKimyTkUmMspHMpo8QEeXg82sSTy2xpPpHl8AjP2-R2cwfrT-wkrPnkei7_Bt9OQzBV6SgzSfNOqaFXXmQsaB0w9bkxFT-ahnC3Vx_K4vZZ8Q8r4HaPz3K0wPp-sW1Aw=w1170-h908-no?authuser=0)

![](https://lh3.googleusercontent.com/pw/ACtC-3eZIvvmumhwMjIBJ5vNBYQq1fdu1OFo1TRaSSjkufIe8wK2SDXRJtAqwgw2BNjbHRUpOEwB1MNYeR7Wv_m2D4vCiRwWa4440mC98fiJ5EH_CO4WutPF9XIqxUaynD9xLHzTMezbSqJZapwR6SDcJLGMCg=w1165-h908-no?authuser=0)

語法參考->[Android 開發者官方站參考資料](https://developer.android.com/reference/android/widget/LinearLayout)

Table layout 表格佈局

表格版面配置，可使元件在形成類似表格的排版方式。整個Layout是一格大表格，設計者可以依照需求喜好將元件放在表格中的各位置，甚至可以設定在該格內的一些屬性，而TableLayout裡面是以TableRow來區別每一列，但是要注意的是，如果在同一個TableLayout他會以最多欄位的那個列來統一讓所有列都有相同的欄數，除非在裡面透過『android:layout_span』方法來讓某一格可以跨越欄數，藉此修改使每一列不會被固定格數。

語法參考->[Android 開發者官方站參考資料](https://developer.android.com/reference/android/widget/TableLayout.LayoutParams)

參考資料：

【 Android 中文開放式課程 】ConstraintLayout 約束佈局 for Android Studio 3：[https://tw-hkt.blogspot.com/2017/11/constraintlayout.html](https://tw-hkt.blogspot.com/2017/11/constraintlayout.html)

使用 ConstraintLayout 建構畫面：[https://julianchu.net/2017/09/16-constraintlayout.html](https://julianchu.net/2017/09/16-constraintlayout.html)
