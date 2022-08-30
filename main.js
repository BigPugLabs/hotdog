const app = require('./index.js')
console.log(`gonna start listening on but first need to chekc out the port`)
const PORT = process.env.PORT || 8080

console.log(`gonna start listening on ${PORT}`)
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})