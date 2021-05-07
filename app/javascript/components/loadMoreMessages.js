const callLoadMoreMessages = () => {
  const loadMoreBtn = document.querySelector("#load_more_messages");
  const url = window.location.protocol + '//' + window.location.hostname + ":3000/load_more_messages?perimeter=" + loadMoreBtn.dataset.perimeter + '&page=' + ( parseInt(loadMoreBtn.dataset.page, 10) + 1 ).toString();
  fetch(url)
  .then(response => response.json())
  .then((data) => {
    insertMoreMessages(data);
    console.log('ok');
  });
}

const insertMoreMessages = (data) => {
  const myMessages = document.querySelector("#my-messages");
  data.forEach((message) => {
  let tempDiv = document.createElement('div');
  tempDiv.innerText = message.value;
  myMessages.insertAdjacentElement('afterbegin', tempDiv);
  })
}

const loadMoreMessages = () => {
  // const loadMoreBtn = document.querySelector("#load_more_messages");
  // if(!loadMoreBtn) return;
  // loadMoreBtn.addEventListener('click', (e) => {
  //   callLoadMoreMessages();
  // });
}

export{ loadMoreMessages };
