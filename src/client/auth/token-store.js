export class TokenStore {
  saveTokens(tokens) {
    if (tokens) {
      localStorage.setItem('tokens', JSON.stringify(tokens));
    } else {
      localStorage.removeItem('tokens');
    }
  }

  loadTokens() {
    var json = localStorage.getItem('tokens');
    if (json == null) return null;
    return JSON.parse(json);
  }
}

export default new TokenStore();
