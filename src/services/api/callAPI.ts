const BASE_URL = `https://nearme-castelfranco.herokuapp.com`;

export function callAPI<T>(resource: string): Promise<T> {
  return fetch(`${BASE_URL}/${resource}`)
    .then(response => {
      return response.json();
    })
    .then(response => {
      if (response.status === "error" || response.status === "fail") {
        const firstErrorMsg =
          response.data && response.data.length && response.data[0].msg;
        const error = firstErrorMsg || response.message;

        console.error(error);
        return Promise.reject(error);
      }
      return response;
    })
    .catch(error =>
      Promise.reject(
        // If the error is a string it comes from the previous then, otherwise it's a crash
        typeof error === "string"
          ? error
          : "Unexpected error. Please try again."
      )
    );
}

/**
 * Returns a fake API response if back-end API is not available yet
 */
export function mockAPI<T>(mock: T): Promise<T> {
  return new Promise(resolve => {
    window.setTimeout(() => resolve(mock), 1000);
  });
}
