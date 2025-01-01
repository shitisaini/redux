// Simulate a fetch call to get a count
export async function fetchCount(amount = 1) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (amount < 0) {
          reject(new Error('Amount must be positive'));
        } else {
          resolve({ data: amount });
        }
      }, 500)
    );
  }