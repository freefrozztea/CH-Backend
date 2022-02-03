function sleep(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  })
}

function double(number){
  return sleep(500).then(() => 2*number);
}

async function octuple(number) {
  const doubled = await double(number);
  const quadrupled = await double(doubled);
  const octupled = await double(quadrupled);
  return octupled;
}

octuple(6)
  .then(number => console.log(number))