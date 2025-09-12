// src/services/watchlist.service.ts
const WATCHLIST_KEY = "crypto_watchlist";

export function getWatchlist(): string[] {
  const data = localStorage.getItem(WATCHLIST_KEY);
  return data ? JSON.parse(data) : [];
}

export function addToWatchlist(coinId: string) {
  const list = getWatchlist();
  if (!list.includes(coinId)) {
    list.push(coinId);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
  }
  return list;
}

export function removeFromWatchlist(coinId: string) {
  const list = getWatchlist().filter((id) => id !== coinId);
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
  return list;
}
