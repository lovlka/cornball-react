export const NETWORK = 'NETWORK';

export function networkProgress() {
  return {
    type: NETWORK,
    state: {
      networkProgress: true,
      networkFailed: false
    }
  };
}

export function networkFailed(error) {
  return {
    type: NETWORK,
    state: {
      networkProgress: false,
      networkFailed: true
    }
  };
}

export function resetNetwork() {
  return {
    type: NETWORK,
    state: {
      networkProgress: false,
      networkFailed: false
    }
  };
}
