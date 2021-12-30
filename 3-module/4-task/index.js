function showSalary(users, age) {
  let arr = users.filter(user =>
    user.age <= age);
  return arr.map(user => `${user.name}, ${user.balance}`).join('\n');
}
