export function withAuthHeader(
  token: string,
  headers: Record<string, string> = {}
) {
  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
}
