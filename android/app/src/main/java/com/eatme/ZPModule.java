package com.eatme;

import android.app.Activity;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import vn.zalopay.sdk.ZaloPayError;
import vn.zalopay.sdk.ZaloPaySDK;
import vn.zalopay.sdk.listeners.PayOrderListener;

public class ZPModule extends ReactContextBaseJavaModule {

    public ZPModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "ZPModule";
    }

    private void sendEvent(ReactContext reactContext, String eventName, WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @ReactMethod
    public void payOrder(String zpTransToken) {
        Activity currentActivity = getCurrentActivity();
        ReactContext mReactContext = getReactApplicationContext();
        ZaloPaySDK.getInstance().payOrder(currentActivity, zpTransToken, "demozpdk://app", new PayOrderListener() {
            @Override
            public void onPaymentSucceeded(String s, String s1, String s2) {
                WritableMap params = Arguments.createMap();
                params.putString("transactionId", s);
                params.putString("transToken", s1);
                params.putString("appTransID", s2);
                params.putString("returnCode", "1");
                sendEvent(mReactContext, "EventPayZalo", params);
            }

            @Override
            public void onPaymentCanceled(String s, String s1) {
                //Xử lý trường hợp người dùng từ chối thanh toán
                WritableMap params = Arguments.createMap();
                params.putString("returnCode",  "0");
                params.putString("zpTranstoken", s);
                params.putString("appTransID", s1);
                sendEvent(mReactContext, "EventPayZalo", params);
            }

            @Override
            public void onPaymentError(ZaloPayError zaloPayError, String s, String s1) {
                //Xử lý trường hợp thanh toán lỗi
                WritableMap params = Arguments.createMap();
                params.putString("returnCode",  "-1");
                params.putString("zpTranstoken", s);
                params.putString("appTransID", s1);
                sendEvent(mReactContext, "EventPayZalo", params);
                if (zaloPayError == ZaloPayError.PAYMENT_APP_NOT_FOUND) {
                    ZaloPaySDK.getInstance().navigateToZaloOnStore(getReactApplicationContext());
                    ZaloPaySDK.getInstance().navigateToZaloPayOnStore(getReactApplicationContext());
                }
            }
        });
    }


}
