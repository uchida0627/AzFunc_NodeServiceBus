const { ServiceBusClient } = require("@azure/service-bus");

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  // ServiceBusClientのインスタンスを作成します。以下のエンドポイントは存在しないものです。
  const client1 = new ServiceBusClient(
    "Endpoint=sb://uchi-winnode-bus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=FrvfZ0CBFZoVsXW6ueKF2xC3N1pGLXl/N+ASbNyBLfU="
  );
  // const client2 = new ServiceBusClient(
  //   "Endpoint=sb://uchi-winnode-bus2.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=vh/UsAYKwNyp7XHhRRDxj/eNYaYSFHJiS+ASbPeU1rI="
  // );

  // ServiceBusSenderのインスタンスを作成します。
  const sender1 = client1.createSender("myinputqueue");
  // const sender2 = client2.createSender("myinputqueue2");

  // メッセージを作成します。
  for (var i = 0; i < 8000; i++) {
    const message = {
      body: "Hello, World! from Http Trigger1" + i + "個目のメッセージです。",
    };

    // 2つのServiceBusに同時にメッセージを送信します。
    await Promise.all([
      sender1.sendMessages(message),
      // sender2.sendMessages(message),
    ]);
  }

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: "Message sent to both ServiceBus instances",
  };
};
