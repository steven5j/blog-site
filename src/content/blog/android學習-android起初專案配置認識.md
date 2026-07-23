---
title: "[Android學習] Android起初專案配置認識"
description: "環境與版本 作業系統：Window10 64x 專業版 版本：2004 開發軟件(IDE)：Android S [&hellip;]"
pubDate: 2020-10-09
topic: software
series: android
heroImage: /public/uploads/wp/4710.jpg
wpId: 4710
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/10/09/android%e5%ad%b8%e7%bf%92-android%e8%b5%b7%e5%88%9d%e5%b0%88%e6%a1%88%e9%85%8d%e7%bd%ae%e8%aa%8d%e8%ad%98/"
---

環境與版本

作業系統：Window10 64x 專業版 版本：2004

開發軟件(IDE)：Android Studio 4.0.1

Runtime Version：1.8.0_242

VM：OpenJDK 64-Bit Server

使用語言版本：Java

原始基本架構

Android專案初始架構:

- Manifests

- java

- res

- Gradle Scripts-build.gradle(Module:app)

![](https://lh3.googleusercontent.com/pw/ACtC-3eawY3zMCvuPkCELy9XhNPwAId_a3X9ezVFS3NUGxuAVj9_RrgZ_fXqNm_6lj5fZBq9B6YZ_o8Q5m4Vogo59-uEnjaB7c1sPaui8iUVIcXNciUJ19MZ4syDg1QPjYWcElziBWnQyAE61-D5egmSOzTqQA=w508-h519-no?authuser=0)

Manifests

紀錄應用程式權限、package名稱、activity、service、圖示各式細節定義

```
<?xml version="1.0" encoding="utf-8"?>
<!--在一台手機裡，package為Android作業系統辨識安裝檔案APK的重要依據-->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.app_learn1">
    <!--進入應用程式-->
    <!--android:icon 點擊應用程式前，app外面的圖示-->
    <!--android:label點擊應用程式前，app名稱-->
    <!--android:theme app主題風格-->
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <!--主程式畫面-->
        <!--控制主畫面的程式 .MainActivity-->
        <!--.MainActivity前的"."視為package名稱=com.example.myapplication-->
        <activity android:name=".MainActivity">
            <intent-filter>
                <!--android.intent.action.MAIN 主畫面-->
                <action android:name="android.intent.action.MAIN" />
                <!--android.intent.category.LAUNCHER 開發時APK完成安裝至手機會自動開啟畫面-->
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

Java

控制應用程式流程

```
//package com.example.app_learn1 名稱
package com.example.app_learn1;

//引入程式編寫的相關套件
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

//MainActivity 繼承 AppCompatActivity 類別
public class MainActivity extends AppCompatActivity {

    //@Override在這裡為覆寫類別方法的指令，當我們要客製化程式時又不想破壞類別結構時，可以藉由此方法來達成
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        //super可以使用父類別相關成員函數
        //在此先由@Override覆寫onCreate方法後，又 super使用父類別之成員函數，達成繼承方法又能實作的功效
        super.onCreate(savedInstanceState);
        //設定顯示畫面由R(Resource)找到layout檔
        setContentView(R.layout.activity_main);
    }
}
```

res

提供UI設計各式資源檔

res檔案內:

- drawable:

- 儲存圖片檔案資源

- 儲存圖示檔案資源

- layout

- 儲存設計各式UI介面(不同螢幕大小、不同頁面內容的UI)

- mipmap

- 與drawable相同儲存圖片，與其不同為mipmap圖片存放有各種解析度的相同圖片

- values
這三種分別為顏色、字串和風格，將這三種屬性獨立為個別檔案，在專案程式碼量大時，達成程式重複利用效果，也方便後續程式開發及維護

- colors

- strings

- styles

Gradle Scripts

build.gradle(Module:app)

引入支援開發套件與版本定義

```
apply plugin: 'com.android.application'

android {
    //    編譯SDK版本
    compileSdkVersion 30
    //    工具版本
    buildToolsVersion "30.0.2"

    defaultConfig {
        //        套件名稱
        applicationId "com.example.app_learn1"
        //        最低SDK版本
        minSdkVersion 23
        //        目標版本
        targetSdkVersion 30
        //        版本編號
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
//相依函式庫
dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.1'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'

}
```

參考資料：

[Day03]Android學習-認識IDE(1)：[https://ithelp.ithome.com.tw/articles/10216384](https://ithelp.ithome.com.tw/articles/10216384)

 Android開發者官網：[https://developer.android.com/](https://developer.android.com/)
