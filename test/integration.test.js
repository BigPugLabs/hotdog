// const chai = require("chai")
// const chaiHttp = require("chai-http")
// const assert = chai.assert

// const app = require("../index.js")
// const db = require("../config/db")
// chai.use(chaiHttp)

// describe("GET request", () => {

//     before(db.connectDB)

//     after(() => {
//         db.closeDB()
//         app.close()
//     })

//     it("has a homepage", done => {
//         chai
//             .request(app)
//             .get("/")
//             .end((err, res) => {
//                 assert.equal(res.statusCode, 200)
//                 done()
//             })

//     })
//     it("has a homepage async", async () => {
//         const res = await chai.request(app)
//             .get("/")
//             .send();
//         assert.equal(res.statusCode, 200)
//     })
// })

