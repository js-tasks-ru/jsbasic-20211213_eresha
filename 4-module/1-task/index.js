function makeFriendsList(friends) {
  // ваш код...
  let ul = document.createElement('ul');
  let li = friends.map(friend => {
    return `<li>${friend.firstName} ${friend.lastName}</li>`;
  }).join(`\n`);
  ul.insertAdjacentHTML(`beforeend`, li);
  return ul;
}
