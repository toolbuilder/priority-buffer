let sum = 50
const minP = 0.10
const maxP = 0.90
let p = minP
for (let i = 0; i < 200; ++i) {
  if (sum >= 0 && sum < 100) ++sum
  if (sum > 95) p = maxP
  if (sum < 5) p = minP
  if (sum > 0 && Math.random() > (1 - p)) --sum
  if (sum > 0 && Math.random() > (1 - p)) --sum
  console.log(sum)
}
console.log(sum)
