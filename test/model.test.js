const chai = require("chai")
const chaiHttp = require("chai-http")
const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")
const assert = chai.assert

let app //= require("../index.js")
let db //= require("../config/db")
chai.use(chaiHttp)

let mongoServer

const clearDB = () => {
    for (const i in mongoose.connection.collections) {
        mongoose.connection.collections[i].deleteMany(() => { })
    }
}

describe("GET request", () => {

    before(async () => {
        //await mongoose.disconnect()
        mongoServer = await MongoMemoryServer.create()
        const mongoUri = mongoServer.getUri()
        process.env.MONGO_URI = mongoUri
        app = require("../index.js")
        //db = require("../config/db")
        //db.connectDB()
    })

    after(async () => {
        //await clearDB()
        //db.closeDB()
        //await mongoServer.stop()
    })

    it("Model - has a homepage", done => {
        chai
            .request(app)
            .get("/")
            .end((err, res) => {
                assert.equal(res.statusCode, 200)
                done()
            })

    })
    it("Model - has a homepage async", async () => {
        const res = await chai.request(app)
            .get("/")
            //.send();
        assert.equal(res.statusCode, 200)
    })
})

