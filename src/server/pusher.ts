import Pusher from "pusher";

export const pusherServerClient = new Pusher({
  appId: "1543431",
  key: "14565b9ab094507cb343",
  secret: "50f97c30af9dce918c24",
  cluster: "eu",
  useTLS: true,
});
