export default [
  'ASSIGNEE'
].reduce((perms, key) => {
  perms[key] = key;
  return perms;
}, {});
