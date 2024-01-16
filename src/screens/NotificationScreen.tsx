import {Image, View} from 'react-native';
import React from 'react';
import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import {Button} from 'react-native-paper';
const NotificationScreen = () => {
  const createChannel = async () => {
    return await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
  };
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await createChannel();

    // Display a notification
    await notifee.displayNotification({
      id: '123',
      title: 'Notification Title 1',
      body: 'Main body content of the notification',
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });

    await notifee.displayNotification({
      id: '1234',
      title: 'Notification Title 2',
      body: 'Main body content of the notification',
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  const onUpdateNotification = async () => {
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await createChannel();

    // Display a notification
    await notifee.displayNotification({
      id: '123',
      title: 'Notification Title 1',
      body: 'Updated Main body content of the notification',
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  const handleTriggerNotification = async () => {
    const channelId = await createChannel();
    const date = new Date(Date.now());
    date.setHours(16);
    date.setMinutes(45);

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      alarmManager: {
        allowWhileIdle: true,
      },
    };

    await notifee.createTriggerNotification(
      {
        title: 'Alarm',
        body: "It's 16:45 now",
        android: {
          channelId,
        },
      },
      trigger,
    );
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        gap: 16,
      }}>
      <Button mode="elevated" onPress={() => onDisplayNotification()}>
        Display Notification
      </Button>
      <Button mode="elevated" onPress={() => onUpdateNotification()}>
        Update Notification
      </Button>
      <Button mode="elevated" onPress={() => handleTriggerNotification()}>
        Create Trigger Notification
      </Button>
     
    </View>
  );
};

export default NotificationScreen;

// const styles = StyleSheet.create({});
