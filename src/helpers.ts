const convertTimestamp = (timestamp: { seconds: number; nanoseconds: number }): Date => {
  //   const ts = (timestamp.seconds + timestamp.nanoseconds / 10000000000) * 1000
  const ts = (timestamp.seconds + timestamp.nanoseconds / 1e9) * 1000
  return new Date(ts)
}

export { convertTimestamp }
