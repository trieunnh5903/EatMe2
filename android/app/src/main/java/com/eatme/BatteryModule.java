package com.eatme;

import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BatteryModule extends ReactContextBaseJavaModule {
    public BatteryModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "BatteryModule";
    }

    @ReactMethod
    public void getDeviceBatteryLevel(Promise promise) {
       try {
           IntentFilter filter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
           Intent batteryStatus = getReactApplicationContext().registerReceiver(null, filter);
           int level = batteryStatus != null ? batteryStatus.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) : -1;
           int scale = batteryStatus != null ? batteryStatus.getIntExtra(BatteryManager.EXTRA_SCALE, -1) : -1;

           float batteryPct = level / (float) scale;

           promise.resolve(batteryPct);
       }catch (Exception e) {
           promise.reject("Error", "Cannot access battery level", e);
       }
    }
}
