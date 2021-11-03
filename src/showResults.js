export default (async function showResults(values) {
  fetch('https://frosty-wood-6558.getsandbox.com:443/dishes', {
   method: 'POST',
   headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
   },
   body: JSON.stringify({
      firstParam: values,
      secondParam: null,
   })
})
});
