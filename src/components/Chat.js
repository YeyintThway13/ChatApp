import React from "react";
import { useAuth } from "../context/AuthContext";
import { ChatEngine } from "react-chat-engine";
import "./chat.css";
import { auth } from "../firebase";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const Chat = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const history = useHistory();

  const logOutHandler = async () => {
    await auth.signOut();

    history.push("/");
  };

  const fetchPhoto = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };


  useEffect(() => {
    if (!user) {
      history.push("/");

      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": process.env.REACT_APP_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        const formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        fetchPhoto(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users", formdata, {
              headers: {
                "private-key": process.env.REACT_APP_KEY,
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);

  if (loading || !user) return "Loading.....";

  return (
    <div className="chatPage">
      <div className="nav">
        <div className="logo">DoraChat</div>
        <div className="logoutBtn" onClick={logOutHandler}>
          Log Out
        </div>
      </div>
      <ChatEngine
        height="calc(100vh-80px)"
        publicKey={process.env.REACT_APP_ID}
        userName={user.email}
        userSecret={user.uid}
      ></ChatEngine>
    </div>
  );
};

export default Chat;
