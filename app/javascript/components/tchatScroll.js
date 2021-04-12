const tchatScroll = () => {
  const messages = document.querySelectorAll(".message-container");
  if(!messages) return;

  const lastMessage = messages[messages.length -1 ];
  location.hash = `#${lastMessage.id}`;
}

export{tchatScroll};
