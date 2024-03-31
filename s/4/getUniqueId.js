const uuid = require("uuid");

function getUniqueId(users) {
  const uniqueId = uuid.v4();

  users.forEach((user) => {
    if (user.id === uniqueId) checkUniqueness(users);
  });

  return uniqueId;
}

module.exports = { getUniqueId };
