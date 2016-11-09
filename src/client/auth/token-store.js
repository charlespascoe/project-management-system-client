export class TokenStore {
  saveTokens(tokens) {
    localStorage.setItem('tokens', JSON.stringify(tokens));
  }

  loadTokens() {
    var json = localStorage.getItem('tokens');
    if (json == null) return null;
    return JSON.parse(json);
  }
}

export default new TokenStore();
