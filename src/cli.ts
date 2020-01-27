import JwtSsm from "./"
;(async (): Promise<void> => {
  // eslint-disable-next-line
  console.log(await JwtSsm[process.argv[2]](process.argv[3], process.argv[4]))
})()
