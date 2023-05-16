const PushNotification = async (token,title="SHAER", body ) => {
  console.log("token----------->", token);
  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: token,
        title: title,
        priority: "normal",
        body: body,
        // data:[]
        // data: {
        //   experienceId: "@rashi-bhave/Elgaroma",
        //   scopeKey: "@rashi-bhave/Elgaroma",
        //   body: " You've got mail",
        // // message: "Hello world! 🌐",
        // },
      }),
    }).then(() => {
      console.log("NOTIFICATION WORKING");
    });
  } catch (e) {
    console.log("NOTIFICATION ERROR");
  }
};

export default PushNotification;
