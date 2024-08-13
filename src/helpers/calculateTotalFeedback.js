export const calculateTotalFeedback = (counters = {}) => Object.values(counters).reduce((acc, { count }) => acc + count, 0);
